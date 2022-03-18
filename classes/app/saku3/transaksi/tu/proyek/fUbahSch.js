window.app_saku3_transaksi_tu_proyek_fUbahSch = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_tu_proyek_fUbahSch.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_tu_proyek_fUbahSch";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Amandemen Proyek Pdpt/Beban", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator");
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,450], childPage:["List Proyek","Data Proyek","Filter Cari"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:5,tag:9,
		            colTitle:["No Proyek","Customer","No Dokumen","Deskripsi","Nilai"],
					colWidth:[[4,3,2,1,0],[100,300,200,200,100]],
					colFormat:[[4],[cfNilai]],readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});				
		
		this.cb_kode = new saiLabelEdit(this.pc2.childPage[1],{bound:[20,10,200,20],caption:"ID Proyek", readOnly:true, change:[this,"doChange"]});	
		
		this.pc1 = new pageControl(this.pc2.childPage[1],{bound:[1,20,996,392], childPage:["Data Rekap","Dist Pdpt/Beban"]});		
		
		this.e_nilai = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,13,200,20],caption:"Nilai Proyek", tag:1, tipeText:ttNilai, text:"0", readOnly:true});
		this.e_nilaippn = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,14,200,20],caption:"Nilai PPN", tag:1, tipeText:ttNilai, text:"0", readOnly:true});				
		this.e_nilaior = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,17,200,20],caption:"Nilai OR", tag:1, tipeText:ttNilai, text:"0", readOnly:true});						
		this.l_tgl1 = new portalui_label(this.pc1.childPage[0],{bound:[20,11,100,18],caption:"Tgl Selesai", underline:true});
		this.dp_d1 = new portalui_datePicker(this.pc1.childPage[0],{bound:[120,11,98,18]}); 

		this.sg = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:3,tag:9,
		            colTitle:["Periode","Pdpt","BBN Lama"],
					colWidth:[[2,1,0],[100,100,  100]],					
					colFormat:[[1,2],[cfNilai,cfNilai]],	
					nilaiChange:[this,"doNilaiChange"],change:[this,"doChangeCells"],autoAppend:true,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg});		
		
		this.c_tahun = new saiCB(this.pc2.childPage[2],{bound:[20,20,200,20],caption:"Tahun",readOnly:true,tag:2});
		this.cb_pp = new portalui_saiCBBL(this.pc2.childPage[2],{bound:[20,13,220,20],caption:"Bagian / Unit",tag:2,multiSelection:false}); 					
		this.bGen = new button(this.pc2.childPage[2],{bound:[120,16,98,18],caption:"Cari",click:[this,"doCari"]});

		this.rearrangeChild(10, 23);
		this.pc2.childPage[1].rearrangeChild(10, 23);
		this.pc2.childPage[2].rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);	
		
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan = 1;

			this.cb_pp.setSQL("select a.kode_pp,a.nama from pp a "+
							  "where a.flag_aktif='1' and a.kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);

			this.c_tahun.items.clear();
			var data = this.dbLib.getDataProvider("select distinct substring(convert(varchar,tgl_mulai,112),1,4) as tahun from tu_proyek where kode_lokasi='"+this.app._lokasi+"' "+												  
												  "order by substring(convert(varchar,tgl_mulai,112),1,4) desc",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.c_tahun.addItem(i,line.tahun);
				}
			}


		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_tu_proyek_fUbahSch.extend(window.childForm);
window.app_saku3_transaksi_tu_proyek_fUbahSch.implement({		
	doChangeCells: function(sender, col, row){		
		if (col == 2) {
			var sls = nilaiToFloat(this.sg.cells(1,row)) + nilaiToFloat(this.sg.cells(2,row));
			this.sg.cells(3,row,floatToNilai(sls));

			this.sg.validasi();
		}	
		if (col == 5) {
			var sls = nilaiToFloat(this.sg.cells(4,row)) + nilaiToFloat(this.sg.cells(5,row));
			this.sg.cells(6,row,floatToNilai(sls));

			this.sg.validasi();
		}			
	},
	doNilaiChange: function(){
		try{			
			this.pdpt = this.beban = 0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(1,i) != ""){					
					this.pdpt += nilaiToFloat(this.sg.cells(1,i));						
				}
				if (this.sg.rowValid(i) && this.sg.cells(2,i) != ""){					
					this.beban += nilaiToFloat(this.sg.cells(2,i));						
				}
			}								
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},
	
	mainButtonClick: function(sender){
		if (sender == this.app._mainForm.bClear)
			system.confirm(this, "clear", "screen akan dibersihkan?","form inputan ini akan dibersihkan");	
		if (sender == this.app._mainForm.bSimpan)
			system.confirm(this, "simpan", "Apa data sudah benar?","data diform ini apa sudah benar.");	
		if (sender == this.app._mainForm.bEdit)
			system.confirm(this, "ubah", "Apa perubahan data sudah benar?","perubahan data diform ini akan disimpan.");	
		if (sender == this.app._mainForm.bHapus)
			system.confirm(this, "hapus", "Yakin data akan dihapus?","data yang sudah disimpan tidak bisa di<i>retrieve</i> lagi.");	
	},
	simpan: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					
					sql.add("update tu_proyek set tgl_selesai='"+this.dp_d1.getDateString()+"' where kode_proyek = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");																							
					sql.add("delete from tu_proyek_d where kode_proyek = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");																							
					
					for (var i=0;i < this.sg.getRowCount();i++){
						if (this.sg.rowValid(i)) {									
							sql.add("insert into tu_proyek_d(kode_proyek,kode_lokasi,nu,periode,nilai_pend,nilai_beban) values "+
									"('"+this.cb_kode.getText()+"','"+this.app._lokasi+"',"+i+",'"+this.sg.cells(0,i)+"',"+nilaiToFloat(this.sg.cells(1,i))+","+nilaiToFloat(this.sg.cells(2,i))+")");							
						}														
					}
					setTipeButton(tbAllFalse);
					this.dbLib.execArraySQL(sql);
				}
				catch(e){
					system.alert(this, e,"");
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},		
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event){
			case "clear" :
				if (modalResult == mrOk)
					this.standarLib.clearByTag(this, new Array("0","1"),this.cb_kode);
					setTipeButton(tbAllFalse);
					this.stsSimpan = 1;				
					this.sg.clear(1);
					this.sg3.clear(1);								
					this.pc1.setActivePage(this.pc1.childPage[0]);						
				break;
			case "ubah" :	
				this.sg.validasi();	
				if (this.pdpt != nilaiToFloat(this.e_nilai.getText())){
					system.alert(this,"Transaksi tidak valid.","Nilai Perubahan Pdpt tidak sama dengan Nilai Proyek.");
					return false;
				}

				if (this.beban != nilaiToFloat(this.e_nilaior.getText())){
					system.alert(this,"Transaksi tidak valid.","Nilai Perubahan Beban tidak sama dengan Nilai OR.");
					return false;
				}				
				else this.simpan();

				break;				
			case "simpancek" : this.simpan();			
				break;
					
		}
	},	
	doChange: function(sender){
		try{			
			if (sender == this.cb_kode && this.cb_kode.getText() != ""){
				var strSQL = "select a.* from tu_proyek a "+							 
							 "where a.kode_proyek ='"+this.cb_kode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){							
						
						this.e_nilai.setText(floatToNilai(line.nilai));
						this.e_nilaippn.setText(floatToNilai(line.nilai_ppn));
						this.e_nilaior.setText(floatToNilai(line.nilai_or));
						this.dp_d1.setText(line.tgl_selesai);
						
						var data = this.dbLib.getDataProvider("select * from tu_proyek_d where kode_proyek = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' order by nu",true);
						if (typeof data == "object" && data.rs.rows[0] != undefined){
							var line;
							this.sg.clear();							
							for (var i in data.rs.rows){
								line = data.rs.rows[i];												
								this.sg.appendData([line.periode,floatToNilai(line.nilai_pend),floatToNilai(line.nilai_beban)]);																
							}
						} 
						this.sg.validasi();

						setTipeButton(tbUbah);
						
					}					
				}
			}
					
		}catch(e){
			systemAPI.alert(e);
		}
	},		
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{
							this.app._mainForm.pesan(2,"transaksi telah sukses tereksekusi (Kode : "+ this.cb_kode.getText()+")");							
							this.app._mainForm.bClear.click();

							this.fileUtil.deleteFiles(this.deletedFiles);
							this.uploadedFiles = "";
							this.deletedFiles = "";

						}else system.info(this,result,"");
	    			break;		
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	},	
	doCari:function(sender){		
		var filter = " ";
		if (this.cb_pp.getText() != "")	filter = " and a.kode_pp = '"+this.cb_pp.getText()+"' ";														
		if (this.c_tahun.getText() != "")	filter = filter + " and (substring(convert(varchar,a.tgl_mulai,112),1,4) = '"+this.c_tahun.getText()+"' or substring(convert(varchar,a.tgl_selesai,112),1,4) = '"+this.c_tahun.getText()+"') ";														

		var strSQL = "select a.kode_proyek,b.nama,a.no_pks,a.nama as keterangan,a.nilai "+
		             "from tu_proyek a inner join cust b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi "+					 					 
					 "where a.kode_lokasi='"+this.app._lokasi+"' and a.progress not in ('0','R') "+filter ;	
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU3 = data;
			this.sgn3.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn3.rearrange();
			this.doTampilData3(1);
		} else this.sg3.clear(1);	
		
		this.pc2.setActivePage(this.pc2.childPage[0]);																		
	},
	doLoad3:function(sender){																				
		var strSQL = "select a.kode_proyek,b.nama,a.no_pks,a.nama as keterangan,a.nilai "+
		             "from tu_proyek a inner join cust b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi "+					 					 
					 "where a.kode_lokasi='"+this.app._lokasi+"' and a.progress not in ('0','R') ";	
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU3 = data;
			this.sgn3.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn3.rearrange();
			this.doTampilData3(1);
		} else this.sg3.clear(1);					
	},
	doTampilData3: function(page) {
		this.sg3.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU3.rs.rows.length? this.dataJU3.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU3.rs.rows[i];													
			this.sg3.appendData([line.kode_proyek,line.nama,line.no_pks,line.keterangan,floatToNilai(line.nilai)]); 
		}
		this.sg3.setNoUrut(start);
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
	},
	doDoubleClick3: function(sender, col , row) {
		try{
			if (this.sg3.cells(0,row) != "") {
				this.pc2.setActivePage(this.pc2.childPage[1]);																		
				this.pc1.setActivePage(this.pc1.childPage[0]);																						
				this.cb_kode.setText(this.sg3.cells(0,row));												
			}									
		} catch(e) {alert(e);}
	}
});
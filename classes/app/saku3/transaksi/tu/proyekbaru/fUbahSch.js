window.app_saku3_transaksi_tu_proyekbaru_fUbahSch = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_tu_proyekbaru_fUbahSch.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_tu_proyekbaru_fUbahSch";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Perubahan Schedule Proyek", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator");
		
		this.c_tahun = new saiCB(this,{bound:[20,20,200,20],caption:"Tahun",readOnly:true,tag:2, change:[this,"doChange"]});
		this.cb_pp = new portalui_saiCBBL(this,{bound:[20,13,220,20],caption:"Bagian / Unit",tag:2,multiSelection:false, change:[this,"doChange"]}); 							
		this.cb_kode = new portalui_saiCBBL(this,{bound:[20,10,220,20],caption:"ID Proyek", multiSelection:false, change:[this,"doChange"]});	
		
		this.pc1 = new pageControl(this,{bound:[10,11,996,400], childPage:["Data Proyek","Schedule Pdpt - Beban"]});				
		this.l_tgl1 = new portalui_label(this.pc1.childPage[0],{bound:[20,10,100,18],caption:"Tgl Mulai", underline:true});
		this.dp_d1 = new portalui_datePicker(this.pc1.childPage[0],{bound:[120,10,98,18],selectDate:[this,"doSelectDate2"]}); 
		this.l_tgl2 = new portalui_label(this.pc1.childPage[0],{bound:[20,11,100,18],caption:"Tgl Selesai", underline:true});
		this.dp_d2 = new portalui_datePicker(this.pc1.childPage[0],{bound:[120,11,98,18],selectDate:[this,"doSelectDate2"]}); 
		this.e_nilai = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,13,200,20],caption:"Nilai Proyek", tag:1, tipeText:ttNilai, text:"0", readOnly:true});
		this.e_nilaippn = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,14,200,20],caption:"Nilai PPN", tag:1, tipeText:ttNilai, text:"0", readOnly:true});						
		this.e_nilaior = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,17,200,20],caption:"Nilai OR", tag:1, tipeText:ttNilai, text:"0", readOnly:true});				
		this.e_pph4 = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,16,200,20],caption:"Nilai PPh", tag:1, tipeText:ttNilai, text:"0", readOnly:true});						
		this.e_jumlah = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,14,200,20],caption:"Jml Jadwal", tag:1, tipeText:ttNilai, text:"0"});	
		this.bJadwal = new button(this.pc1.childPage[0],{bound:[235,14,80,18],caption:"Buat Jadwal",click:[this,"doJadwal"]});					
		
		this.sg = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:3,tag:9,
						colTitle:["Periode","Pendapatan","Beban"],
						colWidth:[[2,1,0],[100,100,  100]],					
						colFormat:[[1,2],[cfNilai,cfNilai]],	
						nilaiChange:[this,"doNilaiChange"],change:[this,"doChangeCells"],autoAppend:true,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg});		
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);	
		
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();

			this.cb_pp.setSQL("select a.kode_pp,a.nama from pp a "+
							  			  "where a.flag_aktif='1' and a.kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);

			this.c_tahun.items.clear();
			var data = this.dbLib.getDataProvider("select distinct substring(convert(varchar,tgl_mulai,112),1,4) as tahun from prb_proyek where versi='PRO20' and kode_lokasi='"+this.app._lokasi+"' "+												  
												  "order by substring(convert(varchar,tgl_mulai,112),1,4) desc",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.c_tahun.addItem(i,line.tahun);
				}
			}

			this.cb_pp.setText(this.app._kodePP);

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_tu_proyekbaru_fUbahSch.extend(window.childForm);
window.app_saku3_transaksi_tu_proyekbaru_fUbahSch.implement({	
	doSelectDate2: function(sender, y,m,d){		
		var strSQL = "select datediff(month,'"+this.dp_d1.getDateString()+"','"+this.dp_d2.getDateString()+"') + 1  as jml ";																																	 
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object"){
			var line = data.rs.rows[0];							
			if (line != undefined){														
				this.e_jumlah.setText(floatToNilai(line.jml));								
			}
		}																												 					
	},
	doJadwal: function(sender){
		try{			
			if (this.periode != "" && this.e_jumlah.getText() != "") {
				this.sg.clear(1);
				
				var tot = totb = 0;
				var jum = nilaiToFloat(this.e_jumlah.getText());
				var nilai = Math.round(nilaiToFloat(this.e_nilai.getText()) / nilaiToFloat(this.e_jumlah.getText()));
				var nilaior = Math.round( (nilaiToFloat(this.e_nilaior.getText()) - nilaiToFloat(this.e_pph4.getText())) / nilaiToFloat(this.e_jumlah.getText())) ; 
				
				var period = this.dp_d1.getText().substr(6,4)+this.dp_d1.getText().substr(3,2);				
				for (var i=0;i < jum;i++){
					this.sg.appendData([period,floatToNilai(nilai),floatToNilai(nilaior)]);
					period = getNextPeriode(period);	
					tot += nilai;	
					totb += nilaior;	
				}		
					
				nilai = nilaiToFloat(this.e_nilai.getText()) - tot;
				nilai = nilai + nilaiToFloat(this.sg.cells(1,i-1));
				this.sg.cells(1,i-1,nilai);				
				
				nilaior = nilaiToFloat(this.e_nilaior.getText()) - nilaiToFloat(this.e_pph4.getText()) - totb; 
				nilaior = nilaior + nilaiToFloat(this.sg.cells(2,i-1));
				this.sg.cells(2,i-1,nilaior);				
																			
				this.pc1.setActivePage(this.pc1.childPage[1]);			
			} 
			else {
				system.alert(this,"Periode dan jumlah harus valid.","Filter dari tanggal mulai.");
				this.sg1.clear(1);
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},		
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
					
					sql.add("update prb_proyek set tgl_mulai='"+this.dp_d1.getDateString()+"',tgl_selesai='"+this.dp_d2.getDateString()+"' where kode_proyek = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");																							

					sql.add("delete from prb_proyek_d where kode_proyek = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");																												
					for (var i=0;i < this.sg.getRowCount();i++){
						if (this.sg.rowValid(i)) {									
							sql.add("insert into prb_proyek_d(kode_proyek,kode_lokasi,nu,periode,nilai_pend,nilai_beban) values "+
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
					this.sg.clear(1);												
					this.pc1.setActivePage(this.pc1.childPage[0]);						
				break;
			case "ubah" :	
				this.sg.validasi();		
				var d = new Date();
				var d1 = d.strToDate(this.dp_d1.getText());
				var d2 = d.strToDate(this.dp_d2.getText());
				
				if (d1 > d2) {
					system.alert(this,"Tgl Proyek tidak valid.","Tanggal Mulai harus lebih awal dari Tanggal Selesai");
					return false;
				}

				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);				
				for (var i=0;i < this.sg.getRowCount();i++){
					if (this.sg.rowValid(i)) {									
						if (this.sg.cells(0,i) < this.app._periode) {	
							system.alert(this,"Periode Schedule tidak valid.","Periode Schedule "+this.sg.cells(0,i)+" tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
							return false;
						}
					}
				}

				//total editan schedule pdpt/beban secara total mesti sama dgn nilai sebelumnya
				if (this.pdpt != nilaiToFloat(this.e_nilai.getText())){
					system.alert(this,"Transaksi tidak valid.","Nilai Perubahan Pdpt tidak sama dengan Nilai Proyek.");
					return false;
				}
				if (this.beban != (nilaiToFloat(this.e_nilaior.getText()) - nilaiToFloat(this.e_pph4.getText()))){
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
			if ((sender == this.cb_pp || sender == this.c_tahun) && this.cb_pp.getText()!="" && this.c_tahun.getText()!="") {
				var filter = " ";
				if (this.cb_pp.getText() != "")	filter = " and kode_pp = '"+this.cb_pp.getText()+"' ";														
				if (this.c_tahun.getText() != "")	filter = filter + " and (substring(convert(varchar,tgl_mulai,112),1,4) = '"+this.c_tahun.getText()+"' or substring(convert(varchar,tgl_selesai,112),1,4) = '"+this.c_tahun.getText()+"') ";														

				this.cb_kode.setSQL("select kode_proyek,nama from prb_proyek where versi='PRO20' and modul='PROYEK' and kode_lokasi='"+this.app._lokasi+"' and progress in ('1','2') and flag_aktif='1' "+filter,["kode_proyek","nama"],false,["Kode","Nama"],"and","Data Proyek",true);
			}	

			if (sender == this.cb_kode && this.cb_kode.getText() != ""){
				var strSQL = "select * from prb_proyek where versi='PRO20' and kode_proyek ='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){							
						this.dp_d1.setText(line.tgl_mulai);
						this.dp_d2.setText(line.tgl_selesai);
						this.e_nilai.setText(floatToNilai(line.nilai));
						this.e_nilaippn.setText(floatToNilai(line.nilai_ppn));
						this.e_nilaior.setText(floatToNilai(line.nilai_or));
						this.e_pph4.setText(floatToNilai(line.pph42));
						
						var data = this.dbLib.getDataProvider("select * from prb_proyek_d where kode_proyek = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' order by nu",true);
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

						}else system.info(this,result,"");
	    			break;		
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	}		
});
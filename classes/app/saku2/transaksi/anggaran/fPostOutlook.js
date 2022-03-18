window.app_saku2_transaksi_anggaran_fPostOutlook = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_anggaran_fPostOutlook.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_anggaran_fPostOutlook";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Load & Posting Data Estimasi: Input", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;portalui_uploader");
		this.e_tahun = new portalui_saiLabelEdit(this,{bound:[20,10,150,20],caption:"Tahun Anggaran",tag:2,maxLength:4,tipeText:ttAngka,change:[this,"doChange"]});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,10,100,18],visible:false}); 				
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"No Bukti", readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,11,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});				
		this.e_periode = new saiCB(this,{bound:[20,12,202,20],caption:"Periode Outlook",readOnly:true}); 
		this.i_Load = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Load Data Estimasi",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doLoad"]});				
		
		this.bUpload = new portalui_uploader(this,{bound:[840,12,80,18],param3:"object",param4:"gridupload",afterUpload:[this,"doAfterUpload"],autoSubmit:true});
		
		this.pc1 = new pageControl(this,{bound:[20,20,900,428], childPage:["Ambil Data OutLook","Load Jurnal OutLook"]});		
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[0,5,this.pc1.width-5,this.pc1.height-35],colCount:6,tag:9,
				colTitle:["Kode Akun","DC","Nama","Nilai Estimasi","Kode CF","Kode Bidang"],
				colWidth:[[5,4,3,2,1,0],[100,100,100 ,250,80,100]],
				colFormat:[[3],[cfNilai]],
				readOnly:true, defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:bsAll, grid:this.sg});
		
		this.sg1 = new portalui_saiGrid(this.pc1.childPage[1],{bound:[0,5,this.pc1.childPage[1].width-5,this.pc1.childPage[1].height-35],colCount:6,tag:0,				
				colTitle:["Kode Akun","DC","Nama","Nilai Estimasi","Kode CF","Kode Bidang"],
				colWidth:[[5,4,3,2,1,0],[100,100,100 ,250,80,100]],
				colFormat:[[3],[cfNilai]],
				readOnly:true, defaultRow:1
		});
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[0,this.pc1.childPage[1].height-25,this.pc1.childPage[1].width-1,25],buttonStyle:2, grid:this.sg1, pager:[this,"selectPage"]});
		
		this.rearrangeChild(10, 23);
		
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.sgn.uploader.setParam3("object");
			this.sg1.setAllowBlank(true);
			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();					
			
			var tahun = parseFloat(this.dp_d1.year) + 1;
			this.e_tahun.setText(tahun);					
			
			this.e_periode.items.clear();
			var data = this.dbLib.getDataProvider(
						"select distinct periode from agg_outlook",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.e_periode.addItem(i,line.periode);
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_anggaran_fPostOutlook.extend(window.childForm);
window.app_saku2_transaksi_anggaran_fPostOutlook.implement({
	doAfterUpload: function(sender, result, data){		
	    try{   			
			this.dataUpload = data;
			if (result) {								
				this.sg1.clear();				
				this.selectPage(undefined, 1);
				this.sgn.setTotalPage(Math.ceil(this.dataUpload.rows.length / 1000));
				this.sgn.rearrange();
				this.sgn.activePage = 0;	
			}else throw(data);					
   		}catch(e){
   		   this.sg1.hideLoading();
   		   systemAPI.alert(e,"Proses Berhenti.");
        }
	},
	selectPage: function(sender,page){
		var start = (page - 1) * 1000;
		var finish = start + 1000;
		finish = (finish > this.dataUpload.rows.length ? this.dataUpload.rows.length : finish);
		this.sg1.clear();
		for (var i=start; i < finish;i++){
			line = this.dataUpload.rows[i];			
			this.sg1.appendData([line.kode_akun,line.dc,line.nama,floatToNilai(line.nilai),line.kode_cf,line.kode_bidang]);
		}
		this.sg1.setNoUrut(start);
		this.pc1.setActivePage(this.pc1.childPage[1]);
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
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'agg_post_m','no_post',this.app._lokasi+"-POOL"+this.e_tahun.getText()+".",'000'));
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();	
					var tahunSeb = parseFloat(this.e_tahun.getText()) - 1;
					var tgl = tahunSeb+'-12-01';	
						
					sql.add("delete from agg_post_m where modul = 'OL' and tahun = '"+tahunSeb+"'");
					sql.add("delete from agg_gldt where modul = 'OL' and periode = '"+tahunSeb+"12'");
					
					sql.add("insert into agg_post_m(no_post, kode_lokasi, modul, tgl_input, nik_user, tahun) values "+
							"('"+this.e_nb.getText()+"','00','OL',getdate(),'"+this.app._userLog+"','"+tahunSeb+"')");

					var idx=0;
					for (var i=0;i< this.sg1.getRowCount();i++){
						if (this.sg1.rowValid(i)){
							idx++;
							if (this.sg1.cells(3,i) != "0") {
								var nilai = nilaiToFloat(this.sg1.cells(3,i));
								sql.add("insert into agg_gldt(no_bukti,no_urut,kode_lokasi,modul,jenis,no_dokumen,tanggal,kode_akun,dc,nilai,keterangan,kode_pp,periode,kode_drk,kode_curr,kurs,nilai_curr,tgl_input,nik_user,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik,kode_cf) values "+
										"('"+this.e_nb.getText()+"',"+idx+",'00','OL','-','-','"+tgl+"','"+this.sg1.cells(0,i)+"','"+this.sg1.cells(1,i)+"',"+nilai+",'"+this.sg1.cells(2,i)+"','"+this.sg1.cells(5,i)+"','"+tahunSeb+'12'+"','-','IDR',1,"+nilai+",getdate(),'"+this.app._userLog+"','-','-','-','-','-','-','"+this.sg1.cells(4,i)+"')");

							}
						}
					}						
					sql.add("insert into agg_gldt(no_bukti,no_urut,kode_lokasi,modul,jenis,no_dokumen,tanggal,kode_akun,dc,nilai,keterangan,kode_pp,periode,kode_drk,kode_curr,kurs,nilai_curr,tgl_input,nik_user,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik) "+
							"select '"+this.e_nb.getText()+"',0,'00','OL','KOMA','-','"+tgl+"','5402000002',case when sum(case dc when 'D' then nilai else -nilai end)<0 then 'D' else 'C' end,abs(sum(case dc when 'D' then nilai else -nilai end)),'-','0','"+tahunSeb+'12'+"','-','IDR',1,abs(sum(case dc when 'D' then nilai else -nilai end)),getdate(),'"+this.app._userLog+"','-','-','-','-','-','-' "+
							"from agg_gldt where periode like '"+tahunSeb+"%'  and modul ='OL'");
					
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
					this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
					this.sg.clear(1); this.sg1.clear(1);  
					setTipeButton(tbSimpan);
				break;
			case "simpan" :	
					this.simpan();
				break;							
		}	
	},		
	doLoad:function(sender){		
		if (this.e_tahun.getText() != "") {						
			this.sg.clear();
			sql="call sp_agg_rkap_total_inv2 ('FS1','0','"+this.e_tahun.getText()+"','00','01','99','1','3','"+this.app._nikUser+"','"+this.e_periode.getText()+"')";
			this.dbLib.execQuerySync(sql);	
			var data = this.dbLib.getDataProvider("select kode_neraca,case when substring(kode_neraca,1,1) = '3' then 'C' else 'D' end as dc,nama,round(n2-n1,0)  as nilai from agg_neraca_tmp where (round(n2-n1,0)>0) and tipe ='posting' and nik_user='"+this.app._nikUser+"' order by rowindex",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];				
					this.sg.appendData([line.kode_neraca,line.dc.toUpperCase(),line.nama,floatToNilai(line.nilai),'-','0']);
				}
			} 
			sql="call sp_agg_rkap_total_inv2 ('FS1','0','"+this.e_tahun.getText()+"','00','01','99','4','4','"+this.app._nikUser+"','"+this.e_periode.getText()+"')";
			this.dbLib.execQuerySync(sql);	
			var data = this.dbLib.getDataProvider("select kode_neraca,case when substring(kode_neraca,1,1) = '3' then 'C' else 'D' end as dc,nama,round(abs(n2)-abs(n1),0)  as nilai from agg_neraca_tmp where (round(abs(n2)-abs(n1),0)>0) and tipe ='posting' and nik_user='"+this.app._nikUser+"' order by rowindex",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];				
					this.sg.appendData([line.kode_neraca,line.dc.toUpperCase(),line.nama,floatToNilai(line.nilai),'-','4']);
				}
			}
			this.pc1.setActivePage(this.pc1.childPage[0]);
		}
	},
	doClick:function(sender){
		if (sender == this.i_gen) {
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'agg_post_m','no_post',this.app._lokasi+"-POOL"+this.e_tahun.getText()+".",'000'));
		}
	},		
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){							
							system.info(this,"Transaksi telah sukses tereksekusi (No Bukti : "+ this.e_nb.getText()+")","");							
							this.clearLayar();						
						}else system.info(this,result,"");
	    			break;
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	},
	clearLayar : function(){
		try {
			this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
			this.sg.clear(1); this.sg1.clear(1);  
			setTipeButton(tbSimpan);
		} catch(e) {
			alert(e);
		}
	}
});
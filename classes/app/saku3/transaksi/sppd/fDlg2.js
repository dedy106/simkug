window.app_saku3_transaksi_sppd_fDlg2 = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_sppd_fDlg2.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_sppd_fDlg2";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Pendelegasian", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);		

		this.cb_nik3 = new saiCBBL(this,{bound:[20,16,200,20],caption:"NIK", multiSelection:false, maxLength:10, tag:1,change:[this,"doChange"]});	
		this.cb_nik = new saiCBBL(this,{bound:[20,18,200,20],caption:"NIK Pengganti", multiSelection:false, maxLength:10, tag:1});		
		
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tgl Mulai", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,98,18]});		
		this.l_tgl2 = new portalui_label(this,{bound:[20,12,100,18],caption:"Tgl Selesai", underline:true});
		this.dp_d2 = new portalui_datePicker(this,{bound:[120,12,98,18]});	
		
		this.p1 = new panel(this,{bound:[20,23,600,300],caption:"Historis Pendelegasian"});
		this.sg = new saiGrid(this.p1,{bound:[0,20,this.p1.width-5,this.p1.height-50],colCount:5,tag:9,
				colTitle:["Tanggal Mulai","Tanggal Selesai","NIK Pengganti","NIK","No Bukti"],
				colWidth:[[4,3,2,1,0],[0,0,120,100,100]],								
				readOnly:true,
				colHide:[[3,4],[true]],
				defaultRow:1,autoAppend:false,
				dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});	
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[0,this.p1.height-25,this.p1.width-1,25],buttonStyle:3,grid:this.sg});	
					
		
		this.rearrangeChild(10, 23);
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		
		this.dataAkun = this.app._masakun;
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			
			this.cb_nik.setSQL("select nik, nama from karyawan where flag_aktif='1'  and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"where","Data Karyawan",true);
			if ( this.app._userStatus == "A" ) 
				this.cb_nik3.setSQL("select nik, nama from karyawan where flag_aktif='1'  and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"where","Data Karyawan",true);
			else 
				this.cb_nik3.setSQL("select a.nik, a.nama from karyawan a where a.nik='"+this.app._userLog+"' and a.kode_lokasi='"+this.app._lokasi+"'",["a.nik","a.nama"],false,["Kode","Nama"],"and","Data Karyawan",true);						
			
			this.cb_nik3.setText(this.app._userLog);

			var strSQL = "select substring(convert(varchar,getdate(),112),3,4) as periode ";						   
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){						
					this.periode = line.periode;
				}				
			}

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_sppd_fDlg2.extend(window.childForm);
window.app_saku3_transaksi_sppd_fDlg2.implement({
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
					
					var nb = this.standarLib.noBuktiOtomatis(this.dbLib,"sp_dlg","no_bukti",this.app._lokasi+"DLG-"+this.periode+".","0000");
					
					sql.add("update sp_dlg set flag_aktif='0' where nik_log = '"+this.cb_nik3.getText()+"'");					
					sql.add("insert into sp_dlg (no_bukti,nik_log,tgl_awal,tgl_akhir,flag_aktif,kode_lokasi,nik_app2) values "+
							"('"+nb+"','"+this.cb_nik3.getText()+"','"+this.dp_d1.getDateString()+"','"+this.dp_d2.getDateString()+"','1','"+this.app._lokasi+"','"+this.cb_nik.getText()+"')");

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
	hapus: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from sp_dlg where no_bukti='"+this.nbLm+"' and kode_lokasi='"+this.app._lokasi+"'");								
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
					this.standarLib.clearByTag(this, new Array("0","1"),this.cb_nik3);
					this.sg.clear(1); 
					setTipeButton(tbSimpan);
					
				break;
			case "simpan" :	
				if(this.dp_d2.getDateString() < this.dp_d1.getDateString() ){
					system.alert(this,"tanggal selesai tidak boleh kurang dari tanggal mulai","Silahkan Ubah Format Tanggal");
					return false;
				}
									
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;			
			case "hapus" :	
				this.hapus();
				break;				
		}
	},
	doChange: function(sender){
	 	try{
	 		if(sender == this.cb_nik3 && this.cb_nik3.getText() != "" ){	
				this.doLoad();
	 		}	
	 	}catch(e){
	 		systemAPI.alert(e);
	 	}
	},		
	doLoad : function(sender){
		var strSQL = "select convert(varchar,tgl_awal,103) as tgl_awal, convert(varchar,tgl_akhir,103) as tgl_akhir, nik_app2, nik_log, no_bukti from sp_dlg "+
					 "where nik_log='"+this.cb_nik3.getText()+"' order by no_bukti desc ";		
		var data = this.dbLib.getDataProvider(strSQL,true);		
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sg.clear();
			this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn.rearrange();
			this.doTampilData(1);
		} else this.sg.clear(1);		
	},	
	doTampilData: function(page) {
		this.sg.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];													
			this.sg.appendData([line.tgl_awal,line.tgl_akhir,line.nik_app2,line.nik_log,line.no_bukti]); 
		}
		this.sg.setNoUrut(start);
	},		
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg.cells(0,row) != "") {	
				setTipeButton(tbHapus);		
							
				this.cb_nik.setText(this.sg.cells(2,row));	
				this.dp_d1.setText(this.sg.cells(0,row));	
				this.dp_d2.setText(this.sg.cells(1,row));	

				this.nbLm=this.sg.cells(4,row);
			}
		}catch(e){
			alert(e);
		}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{
							this.app._mainForm.pesan(2,"transaksi telah sukses tereksekusi (NIK : "+ this.cb_nik3.getText()+")");							
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



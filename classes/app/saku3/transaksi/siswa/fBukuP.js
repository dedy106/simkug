window.app_saku3_transaksi_siswa_fBukuP = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_siswa_fBukuP.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_siswa_fBukuP";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Buku Penghubung", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);	

		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,20],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,98,20]})
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.cb_matpel = new portalui_saiCBBL(this,{bound:[20,13,220,20],caption:"Mata Pelajaran",multiSelection:false,tag:1});			
		this.c_jenis = new saiCB(this,{bound:[20,20,200,20],caption:"Jenis BC",items:["UMUM","ANGKATAN","KELAS","NIS"], readOnly:true,tag:2,change:[this,"doChange"]});
		this.cb_akt = new portalui_saiCBBL(this,{bound:[240,20,230,20],caption:"Angkatan",multiSelection:false,tag:2});			
		this.cb_kelas = new portalui_saiCBBL(this,{bound:[240,20,230,20],caption:"Kelas",multiSelection:false,tag:2});	
		this.cb_nis = new portalui_saiCBBL(this,{bound:[240,20,230,20],caption:"NIS",multiSelection:false,tag:1,change:[this,"doChange"]});	
		this.e_sub = new saiLabelEdit(this,{bound:[20,11,430,20],caption:"Subject", maxLength:50, tag:1});									
		this.e_memo = new saiMemo(this,{bound:[20,5,430,150],caption:"Pesan",tag:1,readOnly:true});

		this.rearrangeChild(10, 23);		
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.doClick();
			this.cb_akt.setVisible(false);
			this.cb_kelas.setVisible(false);
			this.cb_nis.setVisible(false);

			this.cb_matpel.setSQL("select kode_matpel, nama from sis_matpel where kode_lokasi = '"+this.app._lokasi+"' and kode_pp = '"+this.app._kodePP+"' union select '-','-' ",["kode_matpel","nama"],false,["Kode Matpel","Nama"],"and","Data Mata Pelajaran",true);			
			this.cb_matpel.setText("-");
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_siswa_fBukuP.extend(window.childForm);
window.app_saku3_transaksi_siswa_fBukuP.implement({
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
					sql.add("insert into sis_bp(no_bukti,jenis,kode_akt,kode_kelas,nis,keterangan,tanggal,nik_user,kode_pp,kode_lokasi,tgl_input,kode_matpel,subjek) values "+
						    "	('"+this.e_nb.getText()+"','"+this.c_jenis.getText()+"','"+this.cb_akt.getText()+"','"+this.cb_kelas.getText()+"','"+this.cb_nis.getText()+"','"+this.e_memo.getText()+"','"+this.dp_d1.getDateString()+"','"+this.app._userLog+"','"+this.app._kodePP+"','"+this.app._lokasi+"',getdate(),'"+this.cb_matpel.getText()+"','"+this.e_sub.getText()+"')");
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
					sql.add("delete from sis_bp where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.app._kodePP+"'");			
					setTipeButton(tbSimpan);
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
				if (modalResult == mrOk) this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
				this.cb_akt.setVisible(false);
				this.cb_kelas.setVisible(false);
				this.cb_nis.setVisible(false);
				setTipeButton(tbAllFalse);
				this.doClick();
				this.c_jenis.setText("UMUM");
				break;
			case "simpan" :	
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;			
			case "hapus" :	
				this.hapus();
				break;				
		}
	},
	doClick:function(sender){
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"sis_bp","no_bukti",this.app._lokasi+"-BPSIS.","0000"));
			this.stsSimpan = 1;
			setTipeButton(tbSimpan);
	},
	
	doChange: function(sender){
		try{
			if(sender == this.c_jenis && this.c_jenis.getText() != ""){
				if(this.c_jenis.getText()=="UMUM"){
					this.cb_akt.setVisible(false);
					this.cb_akt.setTag("9");
					this.cb_akt.setText("");

					this.cb_kelas.setVisible(false);
					this.cb_kelas.setTag("9");
					this.cb_kelas.setText("");

					this.cb_nis.setVisible(false);
					this.cb_nis.setTag("9");
					this.cb_nis.setText("");
				}
				if(this.c_jenis.getText()=="ANGKATAN"){
					this.cb_akt.setVisible(true);
					this.cb_akt.setTag("9");
					this.cb_akt.setText("");

					this.cb_kelas.setVisible(false);
					this.cb_kelas.setTag("9");
					this.cb_kelas.setText("");

					this.cb_nis.setVisible(false);
					this.cb_nis.setTag("9");
					this.cb_nis.setText("");

					this.cb_akt.setSQL("select kode_akt, nama from sis_angkat where kode_pp = '"+this.app._kodePP+"' and kode_lokasi = '"+this.app._lokasi+"' union select '-','-' ",["kode_akt","nama"],false,["Kode Angkatan","nama"],"and","Data Angkatan",true);			
					this.cb_akt.setText("-");
				}

				if(this.c_jenis.getText()=="KELAS"){
					this.cb_akt.setVisible(false);
					this.cb_akt.setTag("9");
					this.cb_akt.setText("");

					this.cb_kelas.setVisible(true);
					this.cb_kelas.setTag("9");
					this.cb_kelas.setText("");

					this.cb_nis.setVisible(false);
					this.cb_nis.setTag("9");
					this.cb_nis.setText("");

					this.cb_kelas.setSQL("select kode_kelas, nama from sis_kelas where kode_pp = '"+this.app._kodePP+"' and kode_lokasi = '"+this.app._lokasi+"' union select '-','-' ",["kode_kelas","nama"],false,["Kode Kelas","Nama"],"and","Data Kelas",true);			
					this.cb_kelas.setText("-");
				}

				if(this.c_jenis.getText()=="NIS"){
					this.cb_akt.setVisible(false);
					this.cb_akt.setTag("9");
					this.cb_akt.setText("");

					this.cb_kelas.setVisible(false);
					this.cb_kelas.setTag("9");
					this.cb_kelas.setText("");

					this.cb_nis.setVisible(true);
					this.cb_nis.setTag("9");
					this.cb_nis.setText("");

					this.cb_nis.setSQL("select nis, nama from sis_siswa where kode_pp = '"+this.app._kodePP+"' and kode_lokasi = '"+this.app._lokasi+"' and kode_pp = '"+this.app._kodePP+"' union select '-','-' ",["nis","nama"],false,["NIS","Nama"],"and","Data Siswa",true);					
					this.cb_nis.setText("-");
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	/*
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg1.cells(0,row) != "") {			
				setTipeButton(tbUbahHapus);
				this.pc1.setActivePage(this.pc1.childPage[1]);														
				this.cb_kode.setText(this.sg1.cells(0,row));					
							
			}
		} catch(e) {alert(e);}
	},*/
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (Kode : "+ this.e_nb.getText()+")");							
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;	      		
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	}/*
	doLoad:function(sender){								
		var strSQL = "select kode_tingkat, nama from sis_tingkat where kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.app._kodePP+"'";		
		var data = this.dbLib.getDataProvider(strSQL,true);		
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn1.rearrange();
			this.doTampilData(1);
		} else this.sg1.clear(1);			
	},
	
	doTampilData: function(page) {
		this.sg1.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];													
			this.sg1.appendData([line.kode_tingkat,line.nama]); 
		}
		this.sg1.setNoUrut(start);
		this.pc1.setActivePage(this.pc1.childPage[0]);	
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	}*/
});

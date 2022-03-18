window.app_saku3_transaksi_tarbak_simak_fEkskur = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_tarbak_simak_fEkskur.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_tarbak_simak_fEkskur";
		this.itemsValue = new arrayList();
		this.maximize();	
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Ekskul Siswa", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);	

		this.cb_nis = new portalui_saiCBBL(this,{bound:[20,11,220,20],caption:"Siswa",multiSelection:false,tag:2});				
		this.pc1 = new pageControl(this,{bound:[20,12,1000,430], childPage:["Daftar Ekstrakurikuler","Data Ekstrakurikuler"]});				
		this.sg1 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:2,tag:9,
		            colTitle:["No Bukti","Kegiatan"],
					colWidth:[[1,0],[350,100]],
					readOnly:true,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});		
		this.bLoad1 = new portalui_imageButton(this.sgn1,{bound:[this.sgn1.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data Closing",click:[this,"doLoad"]});
		
		this.e_nb = new portalui_saiLabelEdit(this.pc1.childPage[0],{bound:[20,11,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc1.childPage[0],{bound:[225,11,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.l_tgl1 = new portalui_label(this.pc1.childPage[0],{bound:[20,14,100,20],caption:"Tgl Mulai", underline:true});
		this.dp_d1 = new portalui_datePicker(this.pc1.childPage[0],{bound:[120,14,98,20]})		
		this.l_tgl2 = new portalui_label(this.pc1.childPage[0],{bound:[20,15,100,20],caption:"Tgl Selesai", underline:true});
		this.dp_d2 = new portalui_datePicker(this.pc1.childPage[0],{bound:[120,15,98,20]})		

		this.cb_jenis = new portalui_saiCBBL(this.pc1.childPage[0],{bound:[20,20,220,20],caption:"Jenis Ekskul",multiSelection:false,tag:2});			
		this.e_predikat = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,12,550,20],caption:"Predikat", maxLength:100, tag:1});		
		this.e_ket = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,13,550,20],caption:"Deskripsi", maxLength:200, tag:1});		
		
		this.rearrangeChild(10, 23);		
		this.pc1.childPage[0].rearrangeChild(10, 23);	

		setTipeButton(tbAllFalse);
			
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan = 1;
			this.doClick();			
			this.cb_nis.setSQL("select nis, nama from sis_siswa where kode_lokasi = '"+this.app._lokasi+"' and kode_pp = '"+this.app._kodePP+"'",["nis","nama"],false,["NIS","Nama"],"and","Data Siswa",true);			
			this.cb_jenis.setSQL("select kode_jenis, nama from sis_ekskul_jenis where kode_lokasi = '"+this.app._lokasi+"' and kode_pp = '"+this.app._kodePP+"'",["kode_jenis","nama"],false,["Kode","Nama"],"and","Data Ekskul",true);			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_tarbak_simak_fEkskur.extend(window.childForm);
window.app_saku3_transaksi_tarbak_simak_fEkskur.implement({
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
					
					if (this.stsSimpan == 0) {
						sql.add("delete from sis_ekskul where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.app._kodePP+"'");									
					}
					sql.add("insert into sis_ekskul (no_bukti,nik_user,tgl_input,kode_lokasi,kode_pp,nis,tgl_mulai,tgl_selesai,keterangan,kode_jenis,predikat) values "+
							"('"+this.e_nb.getText()+"','"+this.app._userLog+"',getdate(),'"+this.app._lokasi+"','"+this.app._kodePP+"','"+this.cb_nis.getText()+"','"+this.dp_d1.getDateString()+"','"+this.dp_d2.getDateString()+"','"+this.e_ket.getText()+"','"+this.cb_jenis.getText()+"','"+this.e_predikat.getText()+"')");
					
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
					sql.add("delete from sis_ekskul where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.app._kodePP+"'");									
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
				setTipeButton(tbAllFalse);
				this.doClick();				
				break;
			case "simpan" :	
			case "ubah" :
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
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"sis_ekskul","no_bukti",this.app._lokasi+"-EKS.","0000"));
			this.stsSimpan = 1;
			setTipeButton(tbSimpan);
	},	
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
	},
	doLoad:function(sender){				 				
		if (this.cb_nis.getText() != "") {
			var strSQL = "select no_bukti,keterangan "+
						"from sis_ekskul "+
						"where kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.app._kodePP+"' and nis='"+this.cb_nis.getText()+"' ";		
			var data = this.dbLib.getDataProvider(strSQL,true);		
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn1.rearrange();
				this.doTampilData(1);
			} else this.sg1.clear(1);		
		}
		else system.alert(this,"NIS harus dipilih.","");	
	},		
	doTampilData: function(page) {
		this.sg1.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];													
			this.sg1.appendData([line.no_bukti,line.keterangan]); 
		}
		this.sg1.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg1.cells(0,row) != "") {			
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;
				this.pc1.setActivePage(this.pc1.childPage[0]);														
				this.e_nb.setText(this.sg1.cells(0,row));

				var strSQL = "select * from sis_ekskul where no_bukti ='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ";						   				
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.dp_d1.setText(line.tgl_mulai);
						this.dp_d2.setText(line.tgl_selesai);
						this.e_ket.setText(line.keterangan);
						this.cb_jenis.setText(line.kode_jenis);
						this.cb_nis.setText(line.nis);
						this.e_predikat.setText(line.predikat);						
					}
				}
			}
		} catch(e) {alert(e);}
	}
});

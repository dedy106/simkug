window.app_saku3_transaksi_siswa_fMatpelProd = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_siswa_fMatpelProd.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_siswa_fMatpelProd";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Pelajaran", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);		
		
		this.cb_pp = new saiCBBL(this,{bound:[20,10,220,20],caption:"Sekolah", readOnly:true, maxLength:10, tag:2});		
		this.pc1 = new pageControl(this,{bound:[20,12,1000,430], childPage:["Daftar Penilaian","Data Penilaian"]});				
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:2,tag:9,
		            colTitle:["Kode","Deskripsi"],
					colWidth:[[1,0],[350,100]],
					readOnly:true,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
				
		this.cb_kode = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,10,200,20],caption:"Kode",maxLength:10,change:[this,"doChange"]});		
		this.e_nama = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,11,550,20],caption:"Deskripsi", maxLength:200, tag:1});
		this.cb_jur = new saiCBBL(this.pc1.childPage[1],{bound:[20,12,220,20],caption:"Jurusan", multiSelection:false, maxLength:10, tag:2});							
		this.cb_jenis = new saiCBBL(this.pc1.childPage[1],{bound:[20,11,220,20],caption:"Jenis", multiSelection:false, maxLength:10, tag:2});							
		this.c_status = new saiCB(this.pc1.childPage[1],{bound:[20,23,200,20],caption:"Status Aktif",items:["1.AKTIF","0.NON"], readOnly:true,tag:2});		
		

		this.rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);			
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();	
			
			this.cb_pp.setSQL("select kode_pp, nama from pp where kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.app._kodePP+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);
			this.cb_pp.setText(this.app._kodePP);						

			this.cb_jenis.setSQL("select kode_jenis, nama from sis_matpel_jenis where kode_jenis = 'PRO' and kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.app._kodePP+"' and flag_aktif='1'",["kode_jenis","nama"],false,["Kode","Nama"],"and","Data Jenis",true);
			this.cb_jenis.setText("PRO");
			
			this.cb_jur.setSQL("select kode_jur, nama from sis_jur where kode_pp='"+this.app._kodePP+"' and kode_lokasi='"+this.app._lokasi+"'",["kode_jur","nama"],false,["Kode","Nama"],"and","Data Jurusan",true);			

			this.doLoad();		

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_siswa_fMatpelProd.extend(window.childForm);
window.app_saku3_transaksi_siswa_fMatpelProd.implement({
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
					if (this.c_status.getText() == "1.AKTIF") vSts = "1"; else vSts = "0";				

					sql.add("insert into sis_matpel(kode_matpel,kode_lokasi,nama,flag_aktif,kode_pp,keterangan,sifat, kode_jenis, kode_jur) values "+
							"	('"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.e_nama.getText()+"','"+vSts+"','"+this.app._kodePP+"','-','-', '"+this.cb_jenis.getText()+"','"+this.cb_jur.getText()+"')");
									
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
	ubah: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();					
					if (this.c_status.getText() == "1.AKTIF") vSts = "1"; else vSts = "0";					
					sql.add("update sis_matpel set nama='"+this.e_nama.getText()+"',flag_aktif='"+vSts+"',kode_jenis='"+this.cb_jenis.getText()+"', kode_jur='"+this.cb_jur.getText()+"' "+
					        "where kode_matpel = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.app._kodePP+"' ");
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
					sql.add("delete from sis_matpel where kode_matpel = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.app._kodePP+"' ");			
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
				if (modalResult == mrOk) this.standarLib.clearByTag(this, new Array("0","1"),this.cb_kode);
				setTipeButton(tbAllFalse);
				this.doLoad();
				this.pc1.setActivePage(this.pc1.childPage[0]);	
				break;
			case "simpan" :	
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;
			case "ubah" :	
				this.ubah();
				break;				
			case "hapus" :	
				this.hapus();
				break;				
		}
	},
	doChange: function(sender){
		try{
			if (this.cb_kode.getText() != ""){
				var strSQL = "select * from sis_matpel where kode_matpel ='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.app._kodePP+"' ";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){							
						this.e_nama.setText(line.nama);																
						if (line.flag_aktif == "1") var status = "1.AKTIF"; else var status = "0.NON"; 
						this.c_status.setText(status);							
						this.cb_jenis.setText(line.kode_jenis);
						this.cb_jur.setText(line.kode_jur);
						setTipeButton(tbUbahHapus);
					}
					else{
						this.standarLib.clearByTag(this, new Array("1"),undefined);
						setTipeButton(tbSimpan);
					}
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},		
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg1.cells(0,row) != "") {			
				setTipeButton(tbUbahHapus);
				this.pc1.setActivePage(this.pc1.childPage[1]);														
				this.cb_kode.setText(this.sg1.cells(0,row));					
							
			}
		} catch(e) {alert(e);}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (Kode : "+ this.cb_kode.getText()+")");							
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
		var strSQL = "select kode_matpel, nama from sis_matpel where kode_jenis = 'PRO' and kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.app._kodePP+"' order by kode_jur ";		
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
			this.sg1.appendData([line.kode_matpel,line.nama]); 
		}
		this.sg1.setNoUrut(start);
		this.pc1.setActivePage(this.pc1.childPage[0]);	
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	}
});

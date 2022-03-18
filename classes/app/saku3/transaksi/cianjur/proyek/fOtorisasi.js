window.app_saku3_transaksi_cianjur_proyek_fOtorisasi = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_cianjur_proyek_fOtorisasi.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_cianjur_proyek_fOtorisasi";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Otorisasi", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.pc1 = new pageControl(this,{bound:[20,23,1000,450], childPage:["List Otorisasi","Entry Data"]});				
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:5,tag:9,
		            colTitle:["NIK","Nama","Modul","Batas Bawah","Batas Akhir"],
					colWidth:[[4,3,2,1,0],[100,100,80,200,80]],
					colFormat:[[3,4],[cfNilai,cfNilai]],
					readOnly:true,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});

		this.cb_kode = new saiCBBL(this.pc1.childPage[1],{bound:[20,10,220,20],caption:"NIK",maxLength:10,btnClick:[this,"doBtnClick"],rightLabelVisible:false,change:[this,"doChange"]});	
		this.c_modul = new saiCB(this.pc1.childPage[1],{bound:[20,11,200,20],caption:"Modul",items:["APPROVE"], readOnly:true,tag:2});		
		this.e_batas_b = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,200,20],caption:"Batas Bawah",maxLength:50,tag:1,tipeText:ttNilai, text:"0"});	
        this.e_batas_a = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,200,20],caption:"Batas Atas",maxLength:50,tag:1,tipeText:ttNilai, text:"0"});				
				
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
			this.doLoad();
			this.cb_kode.setSQL("select nik,nama from karyawan where kode_lokasi='"+this.app._lokasi+"' ",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);		
			this.doLoad();	
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_cianjur_proyek_fOtorisasi.extend(window.childForm);
window.app_saku3_transaksi_cianjur_proyek_fOtorisasi.implement({
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

					sql.add("insert into app_otorisasi(nik,kode_lokasi,modul,nilai_min,nilai_max) values "+
								"	('"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.c_modul.getText()+"',"+nilaiToFloat(this.e_batas_b.getText())+","+nilaiToFloat(this.e_batas_a.getText())+")");					
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
						sql.add("update app_otorisasi set modul='"+this.c_modul.getText()+"',nilai_min="+nilaiToFloat(this.e_batas_b.getText())+",nilai_max="+nilaiToFloat(this.e_batas_a.getText())+" "+
								"where nik = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						
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
					sql.add("delete from app_otorisasi where nik = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
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
					this.doLoad();
					this.pc1.setActivePage(this.pc1.childPage[0]);
				break;
			case "simpan" :	
				if(nilaiToFloat(this.e_batas_a.getText()) < nilaiToFloat(this.e_batas_b.getText())){
					system.alert(this,"Transaksi tidak valid.","Batas atas tidak boleh lebih kecil dari batas bawah");
					return false;
				}
				else this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;
			case "ubah" :
				if(nilaiToFloat(this.e_batas_a.getText()) < nilaiToFloat(this.e_batas_b.getText())){
					system.alert(this,"Transaksi tidak valid.","Batas atas tidak boleh lebih kecil dari batas bawah");
					return false;
				}	
				else this.ubah();
				break;				
			case "hapus" :	
				this.hapus();
				break;				
		}
	},
	doChange: function(sender){
		try{
			if (sender == this.cb_kode && this.cb_kode.getText() != ""){

				if (sender == this.cb_kode && this.cb_kode.getText() != ""){
					var strSQL = "select nik,kode_lokasi,modul,nilai_min,nilai_max from app_otorisasi "+
							 	 "where nik ='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						   
					var data = this.dbLib.getDataProvider(strSQL,true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){						
							this.c_modul.setText(line.modul);
							this.e_batas_b.setText(floatToNilai(line.nilai_min));
							this.e_batas_a.setText(floatToNilai(line.nilai_max));										
							setTipeButton(tbUbahHapus);
						}
						else{
							this.standarLib.clearByTag(this, new Array("1"),undefined);
							setTipeButton(tbSimpan);
						}
					}
				}							
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},	
	doBtnClick: function(sender, event){
		try{
			if (sender == this.cb_kode) {   
			    this.standarLib.showListData(this, "Daftar Karyawan",sender,undefined, 
											  "select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",
											  "select count(nik) from karyawan where kode_lokasi='"+this.app._lokasi+"'",
											  ["nik","nama"],"and",["NIK","Nama"],false);				
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
							this.app._mainForm.pesan(2,"Transaksi telah sukses tereksekusi (Kode : "+ this.cb_kode.getText()+")");							
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
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg1.cells(0,row) != "") {			
				setTipeButton(tbUbahHapus);
				this.pc1.setActivePage(this.pc1.childPage[1]);														
				this.cb_kode.setText(this.sg1.cells(0,row));	
			}
		} catch(e) {alert(e);}
	},
	doLoad:function(sender){						
		var strSQL = "select a.nik,a.modul,a.nilai_min,a.nilai_max,b.nama "+
		             "from app_otorisasi a inner join karyawan b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi "+
					 "where a.kode_lokasi='"+this.app._lokasi+"' order by nik";		
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
			this.sg1.appendData([line.nik,line.nama,line.modul,floatToNilai(line.nilai_min),floatToNilai(line.nilai_max)]); 
		}
		this.sg1.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	}

	
});
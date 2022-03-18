window.app_saku3_transaksi_siaga_fOtorisasi = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_siaga_fOtorisasi.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_siaga_fOtorisasi";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Otorisasi", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.pc1 = new pageControl(this,{bound:[20,23,1000,450], childPage:["List Otorisasi","Entry Data"]});				
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:5,tag:9,
		            colTitle:["Kode PP","Jenis Approval","Batas Bawah","Batas Atas","NIK Approve"],
					colWidth:[[4,3,2,1,0],[200,100,100,200,200]],
					colFormat:[[2,3],[cfNilai,cfNilai]],
					readOnly:true,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});

        this.cb_pp = new saiCBBL(this.pc1.childPage[1],{bound:[20,12,220,20],caption:"Kode PP",maxLength:15,tag:2,multiSelection:false,change:[this,"doChange"]});
        this.c_app = new saiCB(this.pc1.childPage[1],{bound:[20,11,200,20],caption:"Jenis Approval",items:["APP1","APP2","APP3","APP4"], readOnly:true,tag:2,change:[this,"doChange"]});
        this.cb_nik = new saiCBBL(this.pc1.childPage[1],{bound:[20,12,220,20],caption:"NIK",maxLength:15,tag:2,multiSelection:false,});
		this.e_batas_b = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,200,20],caption:"Batas Bawah",maxLength:50,tag:1,tipeText:ttNilai, text:"0"});	
        this.e_batas_a = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,14,200,20],caption:"Batas Atas",maxLength:50,tag:1,tipeText:ttNilai, text:"0"});				
				
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
            
            this.cb_pp.setSQL("select kode_pp, nama from pp where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode PP","Nama"],"and","Data PP",true);
            this.cb_nik.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);
            
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_siaga_fOtorisasi.extend(window.childForm);
window.app_saku3_transaksi_siaga_fOtorisasi.implement({
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
					sql.add("insert into app_otorisasi(kode_pp,kode_lokasi,kode_app,nik_app,nilai_min,nilai_max) values "+
							"('"+this.cb_pp.getText()+"','"+this.app._lokasi+"','"+this.c_app.getText()+"','"+this.cb_nik.getText()+"',"+nilaiToFloat(this.e_batas_b.getText())+","+nilaiToFloat(this.e_batas_a.getText())+")");					
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
					sql.add("update app_otorisasi set nik_app='"+this.cb_nik.getText()+"',nilai_min="+nilaiToFloat(this.e_batas_b.getText())+",nilai_max="+nilaiToFloat(this.e_batas_a.getText())+" "+
							"where kode_app='"+this.c_app.getText()+"' and kode_pp = '"+this.cb_pp.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
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
					sql.add("delete from app_otorisasi where kode_app = '"+this.c_app.getText()+"' and kode_pp = '"+this.cb_pp.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
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
					this.standarLib.clearByTag(this, new Array("0","1"),this.e_kode);					
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
			if ((sender == this.cb_pp || sender == this.c_app) && this.cb_pp.getText() != "" && this.c_app.getText() != ""){
				var strSQL = "select nik_app,nilai_min,nilai_max from app_otorisasi "+
							 "where kode_app='"+this.c_app.getText()+"' and kode_pp ='"+this.cb_pp.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";							
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.cb_nik.setText(line.nik_app);
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
							this.app._mainForm.pesan(2,"Transaksi telah sukses tereksekusi");							
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
				this.cb_pp.setText(this.sg1.cells(0,row));	
				this.c_app.setText(this.sg1.cells(1,row));	
			}
		} catch(e) {alert(e);}
	},
	doLoad:function(sender){						
		var strSQL = "select a.kode_pp,a.kode_app,a.nik_app,a.nilai_min,a.nilai_max "+
		             "from app_otorisasi a "+
					 "where a.kode_lokasi='"+this.app._lokasi+"' order by a.kode_pp,a.kode_app";		
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
			this.sg1.appendData([line.kode_pp,line.kode_app,floatToNilai(line.nilai_min),floatToNilai(line.nilai_max),line.nik_app]); 
		}
		this.sg1.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	}	
});
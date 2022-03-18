window.app_saku3_transaksi_kantintu_fTenan = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_kantintu_fTenan.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_kantintu_fTenan";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Tenan", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);		
		this.pc1 = new pageControl(this,{bound:[20,12,1000,450], childPage:["List Tenan","Data Tenan"]});				
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:4,tag:9,
		            colTitle:["Kode Tenan","Nama Tenan","Kantin","Pemilik"],
					colWidth:[[3,2,1,0],[200,300,200,100]],
					readOnly:true,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
		
		this.cb_kode = new portalui_saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,200,20],caption:"Kode Tenan",maxLength:30,change:[this,"doChange"]});
		this.c_kantin = new saiCBBL(this.pc1.childPage[1],{bound:[20,13,220,20],caption:"Lokasi Kantin", maxLength:50, multiSelection:false, tag:2});				
		this.e_nama = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,15,400,20],caption:"Nama Tenan ", maxLength:100});				
		this.e_pemilik = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,16,400,20],caption:"Pemilik", tag:1, maxLength:50});		
		this.e_bank = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,17,400,20],caption:"Bank", tag:1, maxLength:50});
		this.e_cabang = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,18,400,20],caption:"Cabang", tag:1, maxLength:100});		
		this.e_norek = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,19,400,20],caption:"No Rekening", tag:1, maxLength:50});		
		this.e_namarek = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,20,400,20],caption:"Nama Rekening", tag:1, maxLength:100});		
		this.e_persen= new saiLabelEdit(this.pc1.childPage[1],{bound:[20,21,200,20],caption:"% Sharing", tag:1, maxLength:10,tipeText:ttNilai,text:"0"});		
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);			
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		this.c_kantin.setSQL("select kode_kantin, nama from ktu_kantin where kode_lokasi = '"+this.app._lokasi+"'",["kode_kantin","nama"],false,["Kode","Nama"],"and","Data Kantin",true);										
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();			
			this.doLoad();			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_kantintu_fTenan.extend(window.childForm);
window.app_saku3_transaksi_kantintu_fTenan.implement({
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
					sql.add("insert into ktu_tenan(kode_tenan, kode_lokasi, kode_kantin, nama, pemilik, persentase, bank, cabang, norek, namarek) values "+
							"('"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.c_kantin.getText()+"','"+this.e_nama.getText()+"','"+this.e_pemilik.getText()+"','"+this.e_persen.getText()+"','"+this.e_bank.getText()+"','"+this.e_cabang.getText()+"','"+this.e_norek.getText()+"','"+this.e_namarek.getText()+"')");										
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
					sql.add("delete from ktu_tenan where kode_tenan = '"+this.cb_kode.getText()+"' ");			
					sql.add("insert into ktu_tenan(kode_tenan, kode_lokasi, kode_kantin, nama, pemilik, persentase, bank, cabang, norek, namarek) values "+
							"('"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.c_kantin.getText()+"','"+this.e_nama.getText()+"','"+this.e_pemilik.getText()+"','"+this.e_persen.getText()+"','"+this.e_bank.getText()+"','"+this.e_cabang.getText()+"','"+this.e_norek.getText()+"','"+this.e_namarek.getText()+"')");										
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
					sql.add("delete from ktu_tenan where kode_tenan = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
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
				if ((nilaiToFloat(this.e_persen.getText()) > 100) || (nilaiToFloat(this.e_persen.getText()) < 0) ) {
					system.alert(this,"Data tidak valid.","Persentase Sharing tidak valid. Range 0-100");
					return false;	
				}
				else this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;
			case "ubah" :	
				if ((nilaiToFloat(this.e_persen.getText()) > 100) || (nilaiToFloat(this.e_persen.getText()) < 0) ) {
					system.alert(this,"Data tidak valid.","Persentase Sharing tidak valid. Range 0-100");
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
				var data = this.dbLib.getDataProvider("select kode_tenan, kode_kantin, nama, pemilik, persentase, bank, cabang, norek, namarek from ktu_tenan where kode_lokasi='"+this.app._lokasi+"' and kode_tenan='"+this.cb_kode.getText()+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){				
						this.c_kantin.setText(line.kode_kantin);
						this.e_nama.setText(line.nama);
						this.e_pemilik.setText(line.pemilik);
						this.e_bank.setText(line.bank);
						this.e_cabang.setText(line.cabang);
						this.e_norek.setText(line.norek);
						this.e_namarek.setText(line.namarek);						
						this.e_persen.setText(floatToNilai(line.persentase));
						
									
						setTipeButton(tbUbahHapus);
					}
					else setTipeButton(tbSimpan);
				}
				else setTipeButton(tbSimpan);
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
		var strSQL = "select a.kode_tenan,a.nama, a.kode_kantin+' | '+b.nama as kantin, a.pemilik, a.persentase, a.bank, a.cabang, a.norek, a.namarek "+
		             "from ktu_tenan a inner join ktu_kantin b on a.kode_kantin=b.kode_kantin and a.kode_lokasi=b.kode_lokasi  "+
					 "where a.kode_lokasi='"+this.app._lokasi+"'";		
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
			this.sg1.appendData([line.kode_tenan,line.nama,line.kantin,line.pemilik]); 
		}
		this.sg1.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	}
});

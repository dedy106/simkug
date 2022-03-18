window.app_saku3_transaksi_tm_fBankRek = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_tm_fBankRek.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_tm_fBankRek";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Rekening Bank", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);		
				
		this.cb_lokasi = new saiCBBL(this,{bound:[20,10,220,20],caption:"Lokasi", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});				
		this.pc1 = new pageControl(this,{bound:[20,12,1000,400], childPage:["Daftar Rekening","Data Rekening","Filter Cari"]});
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:8,tag:9,
		            colTitle:["Lokasi","Kode","Nama","No Rekening","Bank","Cabang","Akun","Jenis"],
					colWidth:[[7,6,5,4,3,2,1,0],[80,150,200,150,150,200,80,60]],
					readOnly:true,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
		
		this.cb_kode = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,10,200,20],caption:"Kode",maxLength:10,change:[this,"doChange"]});		
		this.e_nama = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,11,500,20],caption:"Nama", maxLength:50, tag:1});	
		this.e_norek = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,500,20],caption:"No Rekening", maxLength:150, tag:1});					
		this.cb_bank = new saiCBBL(this.pc1.childPage[1],{bound:[20,10,220,20],caption:"Bank", multiSelection:false, maxLength:10, tag:2});		
		this.e_cabang = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,500,20],caption:"Cabang", maxLength:50, tag:1});									
		this.cb_akun = new saiCBBL(this.pc1.childPage[1],{bound:[20,10,220,20],caption:"Akun", multiSelection:false, maxLength:10, tag:2});		
		//this.cb_lokasi = new saiCBBL(this.pc1.childPage[1],{bound:[20,15,220,20],caption:"Lokasi", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});		
		this.cb_pp = new saiCBBL(this.pc1.childPage[1],{bound:[20,16,220,20],caption:"PP", multiSelection:false, maxLength:10, tag:2});	
		this.c_jenis = new saiCB(this.pc1.childPage[1],{bound:[20,11,200,20],caption:"Jenis",items:["OPERASIONAL"], readOnly:true,tag:2});		
		
		this.e_kode2 = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,10,200,20],caption:"Kode",maxLength:10,tag:9});		
		this.e_nama2 = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,12,300,20],caption:"Nama",maxLength:50,tag:9});		
		this.bLoad = new button(this.pc1.childPage[2],{bound:[120,11,80,18],caption:"Cari Data",click:[this,"doCari"]});			
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);		
		this.pc1.childPage[2].rearrangeChild(10, 23);		
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			
			this.cb_bank.setSQL("select kode_bank, nama from bank",["kode_bank","nama"],false,["Kode","Nama"],"and","Data Bank",true);			
			this.cb_akun.setSQL("select a.kode_akun,a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag in ('001','009') where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Bank",true);			
			this.cb_lokasi.setSQL("select kode_lokasi, nama from lokasi where flag_konsol='0'",["kode_lokasi","nama"],false,["Kode","Nama"],"and","Data Lokasi",true);			
			
			this.doLoad();
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_tm_fBankRek.extend(window.childForm);
window.app_saku3_transaksi_tm_fBankRek.implement({
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
					sql.add("insert into bank_rek(kode_rek,kode_lokasi,kode_akun,nama,no_rek,cabang,kode_bank,jenis,kode_pp) values "+
						    "('"+this.cb_kode.getText()+"','"+this.cb_lokasi.getText()+"','"+this.cb_akun.getText()+"','"+this.e_nama.getText()+"','"+this.e_norek.getText()+"','"+this.e_cabang.getText()+"','"+this.cb_bank.getText()+"','"+this.c_jenis.getText()+"','"+this.cb_pp.getText()+"')");
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
					sql.add("delete from bank_rek where kode_rek = '"+this.cb_kode.getText()+"'");			
					sql.add("insert into bank_rek(kode_rek,kode_lokasi,kode_akun,nama,no_rek,cabang,kode_bank,jenis,kode_pp) values "+
						    "('"+this.cb_kode.getText()+"','"+this.cb_lokasi.getText()+"','"+this.cb_akun.getText()+"','"+this.e_nama.getText()+"','"+this.e_norek.getText()+"','"+this.e_cabang.getText()+"','"+this.cb_bank.getText()+"','"+this.c_jenis.getText()+"','"+this.cb_pp.getText()+"')");
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
					sql.add("delete from bank_rek where kode_rek = '"+this.cb_kode.getText()+"'");			
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
				if (modalResult == mrOk) {
					this.standarLib.clearByTag(this, new Array("0","1","9"),this.cb_kode);
					setTipeButton(tbAllFalse);
					this.doLoad();
				}
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
			if (sender == this.cb_kode && this.cb_kode.getText() != ""){
				var strSQL = "select kode_rek,kode_lokasi,kode_akun,nama,no_rek,cabang,kode_bank,jenis,kode_pp "+
				             "from bank_rek where kode_rek ='"+this.cb_kode.getText()+"' ";						   				
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.e_nama.setText(line.nama);
						this.cb_lokasi.setText(line.kode_lokasi);
						this.e_norek.setText(line.no_rek);												
						this.cb_bank.setText(line.kode_bank);						
						this.e_cabang.setText(line.cabang);						
						this.cb_akun.setText(line.kode_akun);	
						this.cb_pp.setText(line.kode_pp);					
						this.c_jenis.setText(line.jenis);						
						setTipeButton(tbUbahHapus);
					}
					else{
						this.standarLib.clearByTag(this, new Array("1"),undefined);
						setTipeButton(tbSimpan);
					}
				}
			}	
			
			if (sender == this.cb_lokasi && this.cb_lokasi.getText() != "") {
				this.cb_pp.setSQL("select kode_pp, nama from pp where kode_lokasi='"+this.cb_lokasi.getText()+"' and flag_aktif='1'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);				
				this.doLoad();
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
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (Kode : "+ this.cb_kode.getText()+")");							
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;
	      		break;
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	},
	doCari:function(sender){								
		try {
			if (this.e_kode2.getText() != "") var filter = " a.kode_rek like '%"+this.e_kode2.getText()+"%' ";
			else var filter = " a.nama like '%"+this.e_nama2.getText()+"%' ";			
			var strSQL = "select a.kode_lokasi,a.kode_rek,a.nama,a.no_rek,b.kode_bank+' - '+b.nama as bank,a.cabang,c.kode_akun+' - '+c.nama as akun,a.jenis "+
						 "from bank_rek a inner join bank b on a.kode_bank=b.kode_bank "+
						 "                inner join masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi "+
						 "where "+filter+" order by a.kode_lokasi,a.kode_rek";								
			var data = this.dbLib.getDataProvider(strSQL,true);		
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn1.rearrange();
				this.doTampilData(1);
			} else this.sg1.clear(1);			
			this.pc1.setActivePage(this.pc1.childPage[0]);
		} 
		catch(e) {
			alert(e);
		}
	},
	doLoad:function(sender){								
		try {
			var strSQL = "select a.kode_lokasi,a.kode_rek,a.nama,a.no_rek,b.kode_bank+' - '+b.nama as bank,a.cabang,c.kode_akun+' - '+c.nama as akun,a.jenis "+
						 "from bank_rek a inner join bank b on a.kode_bank=b.kode_bank "+
						 "                inner join masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi "+
						 "where a.kode_lokasi='"+this.cb_lokasi.getText()+"' "+
						 "order by a.kode_lokasi,a.kode_rek";								
			var data = this.dbLib.getDataProvider(strSQL,true);		
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn1.rearrange();
				this.doTampilData(1);
			} else this.sg1.clear(1);			
			this.pc1.setActivePage(this.pc1.childPage[0]);
		} 
		catch(e) {
			alert(e);
		}
	},			
	doTampilData: function(page) {		
		this.sg1.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];																			
			this.sg1.appendData([line.kode_lokasi,line.kode_rek,line.nama,line.no_rek,line.bank,line.cabang,line.akun,line.jenis]); 
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
				this.pc1.setActivePage(this.pc1.childPage[1]);														
				this.cb_kode.setText(this.sg1.cells(1,row));	
				this.e_nama.setText(this.sg1.cells(2,row));					
			}
		} catch(e) {alert(e);}
	}
});
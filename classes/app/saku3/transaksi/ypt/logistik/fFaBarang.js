window.app_saku3_transaksi_ypt_logistik_fFaBarang = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_ypt_logistik_fFaBarang.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_ypt_logistik_fFaBarang";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Barang", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);		
				
		this.pc1 = new pageControl(this,{bound:[20,12,1000,450], childPage:["Daftar Barang","Data Barang","Filter Cari"]});
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:4,tag:9,
		            colTitle:["Kode","Nama","Klp Akun","Jenis"],
					colWidth:[[3,2,1,0],[100,350,350,80]],					
					readOnly:true,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
		
		this.cb_kode = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,10,200,20],caption:"Kode",maxLength:10,change:[this,"doChange"]});		
		this.e_nama = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,11,500,20],caption:"Nama", maxLength:50, tag:1});	
		this.cb_akun = new saiCBBL(this.pc1.childPage[1],{bound:[20,14,220,20],caption:"Akun Aktap", multiSelection:false, maxLength:10, tag:2});		
		this.c_jenis = new saiCB(this.pc1.childPage[1],{bound:[20,15,200,20],caption:"Jenis",items:["AKTAP","INV","NON"], readOnly:true,tag:2});		
		
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
			
			this.cb_akun.setSQL("select a.kode_klpakun,a.nama from fa_klpakun a where kode_lokasi='"+this.app._lokasi+"' ",["kode_klpakun","nama"],false,["Kode","Nama"],"where","Data Klp Akun",true);			
			
			this.doLoad();
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_ypt_logistik_fFaBarang.extend(window.childForm);
window.app_saku3_transaksi_ypt_logistik_fFaBarang.implement({
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
					sql.add("insert into fa_klp(kode_klpfa,nama,kode_klpakun,jenis,kode_lokasi) values "+
							"('"+this.cb_kode.getText()+"','"+this.e_nama.getText()+"','"+this.cb_akun.getText()+"','"+this.c_jenis.getText().substr(0,1)+"','"+this.app._lokasi+"')");
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
					sql.add("delete from fa_klp where kode_klpfa = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
					sql.add("insert into fa_klp(kode_klpfa,nama,kode_klpakun,jenis,kode_lokasi) values "+
							"('"+this.cb_kode.getText()+"','"+this.e_nama.getText()+"','"+this.cb_akun.getText()+"','"+this.c_jenis.getText().substr(0,1)+"','"+this.app._lokasi+"')");
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
					sql.add("delete from fa_klp where kode_klpfa = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");		
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
			if (sender == this.e_umur && this.e_umur.getText() != ""){
				var persen = 100 / nilaiToFloat(this.e_umur.getText());
				this.e_persen.setText(floatToNilai(persen));
			}
			if (sender == this.cb_kode && this.cb_kode.getText() != ""){
				var strSQL = "select kode_klpfa,nama,kode_klpakun,jenis "+
				             "from fa_klp where kode_klpfa ='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						   				
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.e_nama.setText(line.nama);
						this.cb_akun.setText(line.kode_klpakun);
						if (line.jenis == "A") this.c_jenis.setText("AKTAP");
						if (line.jenis == "I") this.c_jenis.setText("INV");
						if (line.jenis == "N") this.c_jenis.setText("NON");
						setTipeButton(tbUbah);
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
			if (this.e_kode2.getText() != "") var filter = " a.kode_klpfa like '%"+this.e_kode2.getText()+"%' ";
			else var filter = " a.nama like '%"+this.e_nama2.getText()+"%' ";			
			var strSQL = "select a.kode_klpfa,a.nama,a.kode_klpakun+' - '+ b.nama as akun,case a.jenis when 'A' then 'AKTAP' when 'I' then 'INV' else 'NON' end as jenis "+
						 "from fa_klp a inner join fa_klpakun b on a.kode_klpakun=b.kode_klpakun "+						 
						 "where "+filter;
		
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
			var strSQL = "select a.kode_klpfa,a.nama,a.kode_klpakun+' - '+ b.nama as akun,case a.jenis when 'A' then 'AKTAP' when 'I' then 'INV' else 'NON' end as jenis "+
						 "from fa_klp a inner join fa_klpakun b on a.kode_klpakun=b.kode_klpakun and a.kode_lokasi=b.kode_lokasi "+	
						 "where a.kode_lokasi='"+this.app._lokasi+"' "+
						 "order by a.kode_klpfa";	
						//  alert(strSQL);							
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
			this.sg1.appendData([line.kode_klpfa,line.nama,line.akun,line.jenis.toUpperCase()]); 
		}
		this.sg1.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg1.cells(0,row) != "") {			
				setTipeButton(tbUbah);
				this.pc1.setActivePage(this.pc1.childPage[1]);														
				this.cb_kode.setText(this.sg1.cells(0,row));	
				this.e_nama.setText(this.sg1.cells(1,row));					
			}
		} catch(e) {alert(e);}
	}
});
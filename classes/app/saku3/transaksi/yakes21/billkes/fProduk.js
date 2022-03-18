window.app_saku3_transaksi_yakes21_billkes_fProduk = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_yakes21_billkes_fProduk.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_yakes21_billkes_fProduk";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Parameter Layanan Pengobatan", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);		
				
		this.pc1 = new pageControl(this,{bound:[10,12,1000,450], childPage:["Daftar Parameter","Data Parameter","Filter Cari"]});
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:6,tag:9,
		            colTitle:["Kode","Nama","Akun BP","Akun CC","Akun Group","Pilih"],
					colWidth:[[5,4,3,2,1,0],[70,200,200,200,200,60]],
					readOnly:true,
					colFormat:[[5],[cfButton]],
					click:[this,"doSgBtnClick"], colAlign:[[5],[alCenter]],
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
		
		this.cb_kode = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,10,200,20],caption:"Kode",maxLength:10,change:[this,"doChange"]});		
		this.e_nama = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,11,500,20],caption:"Nama", maxLength:50, tag:1});	
		this.c_jenis = new saiCB(this.pc1.childPage[1],{bound:[20,16,200,20],caption:"Jenis",items:["RJTP","RJTL","RI","RESTITUSI"], readOnly:true,tag:0});

		this.cb_bp = new saiCBBL(this.pc1.childPage[1],{bound:[20,10,220,20],caption:"Akun BP", multiSelection:false, maxLength:10, tag:2});		
		this.cb_cc = new saiCBBL(this.pc1.childPage[1],{bound:[20,11,220,20],caption:"Akun CC", multiSelection:false, maxLength:10, tag:2});		
		this.cb_ap = new saiCBBL(this.pc1.childPage[1],{bound:[20,12,220,20],caption:"Akun Group", multiSelection:false, maxLength:10, tag:2});		
		
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
			
			this.cb_bp.setSQL("select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun =b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag='048' where a.kode_lokasi='"+this.app._lokasi+"' and a.block='0'",["a.kode_akun","a.nama"],false,["Kode","Nama"],"and","Data Akun",true);			
			this.cb_cc.setSQL("select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun =b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag='048' where a.kode_lokasi='"+this.app._lokasi+"' and a.block='0'",["a.kode_akun","a.nama"],false,["Kode","Nama"],"and","Data Akun",true);			
			this.cb_ap.setSQL("select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun =b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag='048' where a.kode_lokasi='"+this.app._lokasi+"' and a.block='0'",["a.kode_akun","a.nama"],false,["Kode","Nama"],"and","Data Akun",true);			
					
			this.doLoad();
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_yakes21_billkes_fProduk.extend(window.childForm);
window.app_saku3_transaksi_yakes21_billkes_fProduk.implement({
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
					sql.add("insert into yk_produk(kode_produk,nama,akun_bp,akun_ap,akun_cc) values "+
						    "('"+this.cb_kode.getText()+"','"+this.e_nama.getText()+"','"+this.cb_bp.getText()+"','"+this.cb_ap.getText()+"','"+this.cb_cc.getText()+"')");
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
					sql.add("delete from yk_produk where kode_produk='"+this.cb_kode.getText()+"'");
					sql.add("insert into yk_produk(kode_produk,nama,akun_bp,akun_ap,akun_cc) values "+
						    "('"+this.cb_kode.getText()+"','"+this.e_nama.getText()+"','"+this.cb_bp.getText()+"','"+this.cb_ap.getText()+"','"+this.cb_cc.getText()+"')");
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
					sql.add("delete from yk_produk where kode_produk='"+this.cb_kode.getText()+"'");
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
				var strSQL = "select kode_produk,nama,akun_bp,akun_ap,akun_cc "+
				             "from yk_produk "+
						     "where kode_produk ='"+this.cb_kode.getText()+"' ";						   				
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.e_nama.setText(line.nama);						
						this.cb_bp.setText(line.akun_bp);
						this.cb_cc.setText(line.akun_cc);
						this.cb_ap.setText(line.akun_ap);						
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
	doCari:function(sender){								
		try {
			if (this.e_kode2.getText() != "") var filter = " where kode_produk like '%"+this.e_kode2.getText()+"%' ";
			else var filter = " where nama like '%"+this.e_nama2.getText()+"%' ";			
			var strSQL = "select a.kode_produk,a.nama,a.akun_bp+' - '+b.nama as akun_bp,a.akun_ap+' - '+d.nama as akun_ap,a.akun_cc+' - '+c.nama as akun_cc "+			             
						 "from yk_produk a "+
						 "     inner join  masakun b on a.akun_bp = b.kode_akun and b.kode_lokasi ='"+this.app._lokasi+"' "+
						 "     inner join  masakun c on a.akun_cc = c.kode_akun and c.kode_lokasi ='"+this.app._lokasi+"' "+
						 "     inner join  masakun d on a.akun_ap = d.kode_akun and d.kode_lokasi ='"+this.app._lokasi+"' "+
						 filter+
						 "order by a.kode_produk";							
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
			var strSQL = "select a.kode_produk,a.nama,a.akun_bp+' - '+b.nama as akun_bp,a.akun_ap+' - '+d.nama as akun_ap,a.akun_cc+' - '+c.nama as akun_cc "+
			             "from yk_produk a "+
						 "     inner join  masakun b on a.akun_bp = b.kode_akun and b.kode_lokasi ='"+this.app._lokasi+"' "+
						 "     inner join  masakun c on a.akun_cc = c.kode_akun and c.kode_lokasi ='"+this.app._lokasi+"' "+
						 "     inner join  masakun d on a.akun_ap = d.kode_akun and d.kode_lokasi ='"+this.app._lokasi+"' "+
						 "order by a.kode_produk";							
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
			this.sg1.appendData([line.kode_produk,line.nama,line.akun_bp,line.akun_cc,line.akun_ap,"Pilih"]); 
		}
		this.sg1.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	doSgBtnClick: function(sender, col, row){
		try{
			if (col === 5) {
				this.doDoubleClick(this.sg1,0,row);
			}
		}catch(e){
			alert(e);
		}
	},
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg1.cells(0,row) != "") {			
				setTipeButton(tbUbahHapus);
				this.pc1.setActivePage(this.pc1.childPage[1]);														
				this.cb_kode.setText(this.sg1.cells(0,row));	
				this.e_nama.setText(this.sg1.cells(1,row));									
			}
		} catch(e) {alert(e);}
	}
});
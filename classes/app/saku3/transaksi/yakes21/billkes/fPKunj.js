window.app_saku3_transaksi_yakes21_billkes_fPKunj = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_yakes21_billkes_fPKunj.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_yakes21_billkes_fPKunj";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Parameter Layanan Kunjungan", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);		
				
		this.pc1 = new pageControl(this,{bound:[10,12,1000,450], childPage:["Daftar Parameter","Data Parameter"]});
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:7,tag:9,		            
					colTitle:["Kode","Nama","Piutang Kunj","Pdpt Kunj","Piu CS","Hut CS","Pilih"],
					colWidth:[[6,5,4,3,2,1,0],[70,150,150,150,150,200,80]],
					readOnly:true,
					colFormat:[[6],[cfButton]],
					click:[this,"doSgBtnClick"], colAlign:[[6],[alCenter]],
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
		
		this.cb_kode = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,10,200,20],caption:"Kode",maxLength:10,change:[this,"doChange"]});		
		this.e_nama = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,11,500,20],caption:"Nama", maxLength:50, tag:1});	
		this.cb_pu = new saiCBBL(this.pc1.childPage[1],{bound:[20,10,220,20],caption:"Piut Kunj", multiSelection:false, maxLength:10, tag:2});		
		this.cb_pap = new saiCBBL(this.pc1.childPage[1],{bound:[20,13,220,20],caption:"PKunj Group", multiSelection:false, maxLength:10, tag:2});		
		this.cb_ku = new saiCBBL(this.pc1.childPage[1],{bound:[20,11,220,20],caption:"Pdpt Kunj", multiSelection:false, maxLength:10, tag:2});		
		this.cb_pc = new saiCBBL(this.pc1.childPage[1],{bound:[20,10,220,20],caption:"Piutang CS", multiSelection:false, maxLength:10, tag:2});		
		this.cb_hc = new saiCBBL(this.pc1.childPage[1],{bound:[20,11,220,20],caption:"Hutang CS", multiSelection:false, maxLength:10, tag:2});		
		
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
		
			this.cb_pu.setSQL("select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun =b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag='048' where a.kode_lokasi='"+this.app._lokasi+"' and a.block='0'",["a.kode_akun","a.nama"],false,["Kode","Nama"],"and","Data Akun",true);			
			this.cb_pap.setSQL("select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun =b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag='048' where a.kode_lokasi='"+this.app._lokasi+"' and a.block='0'",["a.kode_akun","a.nama"],false,["Kode","Nama"],"and","Data Akun",true);			
			this.cb_ku.setSQL("select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun =b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag='048' where a.kode_lokasi='"+this.app._lokasi+"' and a.block='0'",["a.kode_akun","a.nama"],false,["Kode","Nama"],"and","Data Akun",true);			
			this.cb_pc.setSQL("select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun =b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag='048' where a.kode_lokasi='"+this.app._lokasi+"' and a.block='0'",["a.kode_akun","a.nama"],false,["Kode","Nama"],"and","Data Akun",true);			
			this.cb_hc.setSQL("select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun =b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag='048' where a.kode_lokasi='"+this.app._lokasi+"' and a.block='0'",["a.kode_akun","a.nama"],false,["Kode","Nama"],"and","Data Akun",true);			
				
			this.doLoad();
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_yakes21_billkes_fPKunj.extend(window.childForm);
window.app_saku3_transaksi_yakes21_billkes_fPKunj.implement({
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
					sql.add("insert into yk_kunj(kode_produk,nama,akun_pku,akun_ku,akun_piucs,akun_hutcs,akun_pap,akun_ob) values "+
						    "('"+this.cb_kode.getText()+"','"+this.e_nama.getText()+"','"+this.cb_pu.getText()+"','"+this.cb_ku.getText()+"','"+this.cb_pc.getText()+"','"+this.cb_hc.getText()+"','"+this.cb_pap.getText()+"','"+this.cb_ku.getText()+"')");
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
					sql.add("delete from yk_kunj where kode_produk='"+this.cb_kode.getText()+"'");
					sql.add("insert into yk_kunj(kode_produk,nama,akun_pku,akun_ku,akun_piucs,akun_hutcs,akun_pap,akun_ob) values "+
						    "('"+this.cb_kode.getText()+"','"+this.e_nama.getText()+"','"+this.cb_pu.getText()+"','"+this.cb_ku.getText()+"','"+this.cb_pc.getText()+"','"+this.cb_hc.getText()+"','"+this.cb_pap.getText()+"','"+this.cb_ku.getText()+"')");
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
					sql.add("delete from yk_kunj where kode_produk='"+this.cb_kode.getText()+"'");
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
				var strSQL = "select * from yk_kunj where kode_produk ='"+this.cb_kode.getText()+"' ";						   								
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){												
						this.e_nama.setText(line.nama);
						this.cb_pu.setText(line.akun_pku);
						this.cb_pap.setText(line.akun_pap);
						this.cb_ku.setText(line.akun_ku);
						this.cb_pc.setText(line.akun_piucs);
						this.cb_hc.setText(line.akun_hutcs);												
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
	doLoad:function(sender){								
		try {						
			var strSQL = "select a.kode_produk,a.nama,a.akun_pku+' - '+b.nama as akun_pku,a.akun_ku+' - '+c.nama as akun_ku,a.akun_piucs+' - '+d.nama as akun_piucs,"+
			             "a.akun_hutcs+' - '+f.nama as akun_hutcs "+
						 "from yk_kunj a "+
						 "     inner join  masakun b on a.akun_pku = b.kode_akun and b.kode_lokasi ='"+this.app._lokasi+"' "+
						 "     inner join  masakun c on a.akun_ku = c.kode_akun and c.kode_lokasi ='"+this.app._lokasi+"' "+
						 "     inner join  masakun d on a.akun_piucs = d.kode_akun and d.kode_lokasi ='"+this.app._lokasi+"' "+						 
						 "     inner join  masakun f on a.akun_hutcs = f.kode_akun and f.kode_lokasi ='"+this.app._lokasi+"' "+
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
			this.sg1.appendData([line.kode_produk,line.nama,line.akun_pku,line.akun_ku,line.akun_piucs,line.akun_hutcs,"Pilih"]); 
		}
		this.sg1.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	doSgBtnClick: function(sender, col, row){
		try{
			if (col === 6) {
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
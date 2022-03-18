window.app_saku3_transaksi_gl_fRelakunSpm = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_gl_fRelakunSpm.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_gl_fRelakunSpm";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Relasi Akun: Input/Edit", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);		
		this.pc1 = new pageControl(this,{bound:[20,12,1000,450], childPage:["Daftar Neraca","Data Relasi Akun"]});				
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:4,tag:9,
		            colTitle:["Kode","Nama","Kode FS","Tipe"],
					colWidth:[[3,2,1,0],[80,80,300,100]],
					readOnly:true,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
		this.cb_kode = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,10,200,20],caption:"Kode",maxLength:10,change:[this,"doChange"]});		
		this.e_nama = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,11,600,20],caption:"Nama", maxLength:150,readOnly:true,tag:1});	
		this.cb_fs = new portalui_saiCBBL(this.pc1.childPage[1],{bound:[20,18,202,20],caption:"Kode FS",tag:2,readOnly:true,multiSelection:false});
		
		this.sg2 = new saiGrid(this.pc1.childPage[1],{bound:[20,20,450,280],colCount:2,tag:9,
		            colTitle:["Kode Akun","Nama Akun Pendapatan"],
					colWidth:[[1,0],[300,80]],
					columnReadOnly:[true,[0,1]],
					buttonStyle:[[0],[bsEllips]],
					defaultRow:1,
					ellipsClick:[this,"doEllipsClick"],autoAppend:true});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[20,410,450,25],buttonStyle:2,grid:this.sg2});
		
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);		
		this.sg3 = new saiGrid(this.pc1.childPage[1],{bound:[520,80,450,280],colCount:2,tag:9,
		            colTitle:["Kode Akun","Nama Akun Beban"],
					colWidth:[[1,0],[300,80]],
					columnReadOnly:[true,[0,1]],
					buttonStyle:[[0],[bsEllips]],
					defaultRow:1,
					ellipsClick:[this,"doEllipsClick3"],autoAppend:true});
		this.sgn3 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[520,365,450,25],buttonStyle:2,grid:this.sg3});

		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			
			this.cb_fs.setSQL("select kode_fs, nama from fs where kode_lokasi='"+this.app._lokasi+"' ",["kode_fs","nama"],false,["Kode","Nama"],"and","Data FS",true);
			this.doLoad();
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_gl_fRelakunSpm.extend(window.childForm);
window.app_saku3_transaksi_gl_fRelakunSpm.implement({
	doAfterPaste: function(sender,totalRow){
		try {
			this.sgn.setTotalPage(sender.getTotalPage());
			this.sgn.rearrange();
			
		} catch(e) {alert(e);}
	},
	doPage: function(sender,page){
		this.sg.doSelectPage(page);
	},
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
					//sql.add("insert into agg_pp(kode_pp,nama,kode_lokasi,flag_aktif,tahun,kode_bidang) values ('"+this.cb_kode.getText()+"','"+this.e_nama.getText()+"','"+this.app._lokasi+"','"+this.c_status.getText().substr(0,1)+"','"+this.c_tahun.getText()+"','"+this.cb_bidang.getText()+"')");
					//setTipeButton(tbAllFalse);
					//this.dbLib.execArraySQL(sql);
				}
				catch(e){
					system.alert(this, e,"");
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	simpan2: function(){			
		try{						
			uses("server_util_arrayList");
			var sql = new server_util_arrayList();
			if (this.sg.getRowValidCount() > 0){
				sql.add("delete from agg_akun_pp where kode_lokasi='"+this.app._lokasi+"'");
				for (var i=0;i < this.sg.getRowCount();i++){
					if (this.sg.rowValid(i)){
						sql.add("insert into agg_akun_pp(kode_pp,kode_lokasi,tahun,kode_akun) values ('"+
								this.sg.cells(2,i)+"','"+this.app._lokasi+"','"+this.sg.cells(4,i)+"','"+this.sg.cells(0,i)+"')");
					}
				}
			}						
			setTipeButton(tbAllFalse);
			this.dbLib.execArraySQL(sql);
			
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
					if (this.sg2.getRowValidCount() > 0){
						sql.add("delete from relakun_spm where kode_lokasi='"+this.app._lokasi+"' and kode_neraca='"+this.cb_kode.getText()+"' and jenis='Pendapatan'");
						for (var i=0;i < this.sg2.getRowCount();i++){
							if (this.sg2.rowValid(i)){
								sql.add("insert into relakun_spm(kode_neraca,kode_lokasi,kode_akun,jenis,kode_fs) values ('"+
										this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.sg2.cells(0,i)+"','Pendapatan','"+this.cb_fs.getText()+"')");
							}
						}
					}
					if (this.sg3.getRowValidCount() > 0){
						sql.add("delete from relakun_spm where kode_lokasi='"+this.app._lokasi+"' and kode_neraca='"+this.cb_kode.getText()+"' and jenis='Beban'");
						for (var i=0;i < this.sg2.getRowCount();i++){
							if (this.sg3.rowValid(i)){
								sql.add("insert into relakun_spm(kode_neraca,kode_lokasi,kode_akun,jenis,kode_fs) values ('"+
										this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.sg3.cells(0,i)+"','Beban','"+this.cb_fs.getText()+"')");
							}
						}
					}
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
					sql.add("delete from agg_pp where kode_pp = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
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
	doUpload: function(){
		system.confirm(this, "upload", "Apa data sudah benar?","data diform ini apa sudah benar.");
		
	},
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event){
			case "clear" :
				if (modalResult == mrOk) {
					this.standarLib.clearByTag(this, new Array("0","1"),this.cb_kode);
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
			case "upload" :	
				this.simpan2();
				break;	
		}
	},
	doChange: function(sender){
		try{
			
			if (this.cb_kode.getText() != ""){
				var strSQL = "select a.kode_akun,b.nama "+
				            "from relakun_spm a "+
							"inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
							"where a.kode_neraca='"+this.cb_kode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.jenis='Pendapatan'";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg2.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg2.appendData([line.kode_akun,line.nama]);
					}
				} else this.sg2.clear(1);
				
				var strSQL = "select a.kode_akun,b.nama "+
				            "from relakun_spm a "+
							"inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
							"where a.kode_neraca='"+this.cb_kode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.jenis='Beban'";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg3.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg3.appendData([line.kode_akun,line.nama]);
					}
				} else this.sg3.clear(1);
				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},	
	doBtnClick: function(sender, event){
		try{
			if (sender == this.cb_kode) {   
			    this.standarLib.showListData(this, "Daftar Flag Akun",sender,undefined, 
											  "select kode_pp, nama  from agg_pp where kode_lokasi='"+this.app._lokasi+"'",
											  "select count(kode_pp) from agg_pp where kode_lokasi='"+this.app._lokasi+"'",
											  ["kode_pp","nama"],"where",["Kode","Nama"],false);				
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
							this.app._mainForm.pesan(2,"transaksi telah sukses tereksekusi (Kode : "+ this.cb_kode.getText()+")");							
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
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg1.cells(0,row) != "" || this.sg1.cells(3,row) == "Posting") {	
				
				setTipeButton(tbUbahHapus);
				this.pc1.setActivePage(this.pc1.childPage[1]);														
				this.cb_kode.setText(this.sg1.cells(0,row));	
				this.e_nama.setText(this.sg1.cells(1,row));	
				this.cb_fs.setText(this.sg1.cells(2,row));
				
			}
		} catch(e) {alert(e);}
	},
	doLoad:function(sender){						
		var strSQL = "select kode_neraca,nama,kode_fs,tipe "+
		             "from neraca where kode_lokasi='"+this.app._lokasi+"' and kode_fs='FS2' order by rowindex ";		
		var data = this.dbLib.getDataProvider(strSQL,true);		
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn1.rearrange();
			this.doTampilData(1);
		} else this.sg1.clear(1);			
		this.pc1.setActivePage(this.pc1.childPage[0]);
	},		
	doTampilData: function(page) {		
		this.sg1.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];													
			this.sg1.appendData([line.kode_neraca,line.nama,line.kode_fs,line.tipe]); 
		}
		this.sg1.setNoUrut(start);
	},
	doEllipsClick: function(sender, col, row) {
		try
		{
			switch(col){
				case 0 :
						this.standarLib.showListDataForSG(this, "Daftar Akun",this.sg2, this.sg2.row, this.sg2.col, 
														"select a.kode_akun, a.nama  from masakun a left join relakun_spm b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi where b.kode_akun is null and a.kode_lokasi='"+this.app._lokasi+"' and a.jenis='Pendapatan' ",
														"select count(*)  from masakun a left join relakun_spm b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi where b.kode_akun is null and a.kode_lokasi='"+this.app._lokasi+"' and a.jenis='Pendapatan' ",
														 new Array("a.kode_akun","a.nama"),"and",new Array("Kode","Nama"),false);					
						break;					
			}						
		}catch(e)
		{
			systemAPI.alert("[app_saku_gl_transaksi_fJu2] : doFindBtnClick : " + e);
		}
	},	
	doEllipsClick3: function(sender, col, row) {
		try
		{
			switch(col){
				case 0 :
						this.standarLib.showListDataForSG(this, "Daftar Akun",this.sg3, this.sg3.row, this.sg3.col, 
														"select a.kode_akun, a.nama  from masakun a left join relakun_spm b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi where b.kode_akun is null and a.kode_lokasi='"+this.app._lokasi+"' and a.jenis='Beban' ",
														"select count(*)  from masakun a left join relakun_spm b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi where b.kode_akun is null and a.kode_lokasi='"+this.app._lokasi+"' and a.jenis='Beban' ",
														 new Array("a.kode_akun","a.nama"),"and",new Array("Kode","Nama"),false);					
						break;					
			}						
		}catch(e)
		{
			systemAPI.alert("[app_saku_gl_transaksi_fJu2] : doFindBtnClick : " + e);
		}
	},	
	
	doPager: function(sender, page) {
		this.doTampilData(page);
	}
});
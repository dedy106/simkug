window.app_saku3_transaksi_ppbs_fPaDRKpp = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_ppbs_fPaDRKpp.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_ppbs_fPaDRKpp";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data PP DRK: Input/Edit", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);		
		this.pc1 = new pageControl(this,{bound:[20,12,1000,450], childPage:["Daftar PP","Data PP-DRK","Filter Cari","Upload Data"]});				
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:3,tag:9,
		            colTitle:["Kode","Nama","Tahun"],
					colWidth:[[2,1,0],[80,300,100]],
					readOnly:true,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
		this.c_tahun = new saiCB(this.pc1.childPage[1],{bound:[20,9,180,20],caption:"Tahun",readOnly:true,tag:2,readOnly:true});
		this.cb_kode = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,10,200,20],caption:"Kode PP",maxLength:10,change:[this,"doChange"]});		
		this.e_nama = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,11,600,20],caption:"Nama PP", maxLength:150,readOnly:true,tag:1});	
		this.sg2 = new saiGrid(this.pc1.childPage[1],{bound:[20,20,550,280],colCount:2,tag:0,
		            colTitle:["Kode DRK","Nama DRK"],
					colWidth:[[1,0],[400,80]],
					columnReadOnly:[true,[0,1]],
					buttonStyle:[[0],[bsEllips]],
					defaultRow:1,
					ellipsClick:[this,"doEllipsClick"],autoAppend:true});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[20,410,499,25],buttonStyle:2,grid:this.sg2});
		
		this.c_tahun2 = new saiCB(this.pc1.childPage[2],{bound:[20,13,180,20],caption:"Tahun",readOnly:true,tag:2});
		this.e_kode2 = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,14,200,20],caption:"Kode PP",maxLength:10,tag:9});		
		this.e_nama2 = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,15,300,20],caption:"Nama PP",maxLength:50,tag:9});		
		this.bLoad = new button(this.pc1.childPage[2],{bound:[120,16,80,18],caption:"Cari Data",click:[this,"doCari"]});
		this.bUpload = new button(this.pc1.childPage[3],{bound:[30,16,80,18],caption:"Simpan Upload",click:[this,"doUpload"]});
		this.sg = new saiGrid(this.pc1.childPage[3],{bound:[1,5,this.pc1.width-5,this.pc1.height-65],colCount:5,tag:9,
		            colTitle:["Kode DRK","Nama DRK","Kode PP","Nama PP","Tahun"],
					colWidth:[[4,3,2,1,0],[60,200,80,200,80]],
					readOnly:true,
					pasteEnable:true,autoPaging:true,rowPerPage:200,afterPaste:[this,"doAfterPaste"],
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[3],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);		
		this.pc1.childPage[2].rearrangeChild(10, 23);
		this.pc1.childPage[3].rearrangeChild(10, 23);
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.c_tahun.items.clear();
			var data = this.dbLib.getDataProvider("select year(getdate()) as tahun union select year(getdate())+1 as tahun order by tahun desc",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.c_tahun.addItem(i,line.tahun);
				}
			}
			this.c_tahun2.items.clear();
			var data = this.dbLib.getDataProvider("select distinct tahun from agg_pp order by tahun desc",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.c_tahun2.addItem(i,line.tahun);
				}
			}			
			this.doLoad();
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_ppbs_fPaDRKpp.extend(window.childForm);
window.app_saku3_transaksi_ppbs_fPaDRKpp.implement({
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
				sql.add("delete from agg_drk_pp where kode_lokasi='"+this.app._lokasi+"' and tahun='"+this.c_tahun.getText()+"'");
				for (var i=0;i < this.sg.getRowCount();i++){
					if (this.sg.rowValid(i)){
						sql.add("insert into agg_drk_pp(kode_pp,kode_lokasi,tahun,kode_drk) values ('"+
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
						sql.add("delete from agg_drk_pp where kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.cb_kode.getText()+"' and tahun='"+this.c_tahun.getText()+"'");
						for (var i=0;i < this.sg2.getRowCount();i++){
							if (this.sg2.rowValid(i)){
								sql.add("insert into agg_drk_pp(kode_pp,kode_lokasi,tahun,kode_drk) values ('"+
										this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.c_tahun.getText()+"','"+this.sg2.cells(0,i)+"')");
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
					sql.add("delete from agg_drk_pp where kode_pp = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
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
				var strSQL = "select a.kode_drk,b.nama "+
				            "from  agg_drk_pp a inner join agg_drk b on a.kode_drk=b.kode_drk and a.kode_lokasi=b.kode_lokasi and a.tahun=b.tahun "+
							"where a.kode_pp='"+this.cb_kode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.tahun='"+this.c_tahun.getText()+"' order by a.kode_drk ";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg2.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg2.appendData([line.kode_drk,line.nama]);
					}
				} else this.sg2.clear(1);
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},	
	doBtnClick: function(sender, event){
		try{
			if (sender == this.cb_kode) {   
			    this.standarLib.showListData(this, "Daftar Flag Akun",sender,undefined, 
											  "select kode_pp, nama  from agg_pp where kode_lokasi='"+this.app._lokasi+"' and tahun='"+this.c_tahun.getText()+"' ",
											  "select count(kode_pp) from agg_pp where kode_lokasi='"+this.app._lokasi+"' and tahun='"+this.c_tahun.getText()+"' ",
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
			if (this.sg1.cells(0,row) != "") {	
				
				setTipeButton(tbUbahHapus);
				this.pc1.setActivePage(this.pc1.childPage[1]);														
				this.cb_kode.setText(this.sg1.cells(0,row));	
				this.e_nama.setText(this.sg1.cells(1,row));	
				this.c_tahun.setText(this.sg1.cells(2,row));				
			}
		} catch(e) {alert(e);}
	},
	doLoad:function(sender){						
		var strSQL = "select kode_pp,nama,tahun "+
		             "from agg_pp where kode_lokasi='"+this.app._lokasi+"' and tahun='"+this.c_tahun.getText()+"' order by kode_pp ";		
		var data = this.dbLib.getDataProvider(strSQL,true);		
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn1.rearrange();
			this.doTampilData(1);
		} else this.sg1.clear(1);			
		this.pc1.setActivePage(this.pc1.childPage[0]);
	},		
		doCari:function(sender){								
		try {
			var filter = "";
			if (this.e_kode2.getText() != "") var filter = filter+" and kode_pp = '"+this.e_kode2.getText()+"' ";
			if (this.e_nama2.getText() != "") var filter = filter+" and nama like '%"+this.e_nama2.getText()+"%' ";
			
			var strSQL = "select kode_pp,nama,tahun "+
		             "from agg_pp where kode_lokasi='"+this.app._lokasi+"' and tahun='"+this.c_tahun.getText()+"' "+filter+" order by kode_pp ";		
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
			this.sg1.appendData([line.kode_pp,line.nama,line.tahun]); 
		}
		this.sg1.setNoUrut(start);
	},
	doEllipsClick: function(sender, col, row) {
		try
		{
			switch(col){
				case 0 :
						this.standarLib.showListDataForSG(this, "Daftar DRK",this.sg2, this.sg2.row, this.sg2.col, 
														"select kode_drk, nama  from agg_drk where tahun='"+this.c_tahun.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",
														"select count(kode_drk) from agg_drk where tahun='"+this.c_tahun.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",
														 new Array("kode_drk","nama"),"and",new Array("Kode","Nama"),false);					
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
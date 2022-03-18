window.app_saku3_transaksi_ppbs_fPaAngkat = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_ppbs_fPaAngkat.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_ppbs_fPaAngkat";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Angkatan : Input/Edit", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);		
		
		this.c_tahun = new saiCB(this,{bound:[20,9,180,20],caption:"Tahun",readOnly:true,tag:2,change:[this,"doChange"]});
		this.pc1 = new pageControl(this,{bound:[20,12,1000,390], childPage:["Daftar Angkatan","Data Angkatan","Upload Data"]});				
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:3,tag:9,
		            colTitle:["Kode Angkt.","Nama","Kode PP"],
					colWidth:[[2,1,0],[100,400,80]],
					readOnly:true,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
		this.bLoad1 = new portalui_imageButton(this.sgn1,{bound:[this.sgn1.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad"]});				
		
		this.cb_kode = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,10,200,20],caption:"Kode",maxLength:10,change:[this,"doChange"]});		
		this.e_nama = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,11,600,20],caption:"Nama", maxLength:150, tag:1});	
		this.cb_pp = new portalui_saiCBBL(this.pc1.childPage[1],{bound:[20,18,200,20],caption:"Prodi",tag:2,multiSelection:false,change:[this,"doChange"]});
		this.c_status = new saiCB(this.pc1.childPage[1],{bound:[20,12,200,20],caption:"Status",items:["1. AKTIF","0. NONAKTIF"], readOnly:true,tag:2});
		
		this.sg = new saiGrid(this.pc1.childPage[2],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:3,tag:9,
		            colTitle:["Kode Angk.","Nama","Kode PP"],
					colWidth:[[1,0],[300,100]],
					readOnly:true,
					pasteEnable:true,autoPaging:true,rowPerPage:200,afterPaste:[this,"doAfterPaste"],
					autoAppend:false,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});
		
		this.bUpload = new button(this.sgn,{bound:[900,2,80,18],caption:"Simpan Upload",click:[this,"doUpload"]});
		
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
			this.c_tahun.items.clear();
			var sql="select distinct substring(kode_angkat,6,4) as tahun from agg_angkat "+
					"union select year(getdate())+1 as tahun order by tahun desc";
			var data = this.dbLib.getDataProvider(sql,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.c_tahun.addItem(i,line.tahun);
				}
			}
			
			this.c_tahun.setText("");
			this.cb_pp.setSQL("select kode_pp, nama from agg_pp where kode_lokasi='"+this.app._lokasi+"' ",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_ppbs_fPaAngkat.extend(window.childForm);
window.app_saku3_transaksi_ppbs_fPaAngkat.implement({
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
					sql.add("insert into agg_angkat(kode_angkat,nama,kode_lokasi,flag_aktif,kode_pp) values "+
							"('"+this.cb_kode.getText()+"','"+this.e_nama.getText()+"','"+this.app._lokasi+"','"+this.c_status.getText().substr(0,1)+"','"+this.cb_pp.getText()+"')");
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
					sql.add("delete from agg_angkat where kode_angkat = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("insert into agg_angkat(kode_angkat,nama,kode_lokasi,flag_aktif,kode_pp) values "+
							"('"+this.cb_kode.getText()+"','"+this.e_nama.getText()+"','"+this.app._lokasi+"','"+this.c_status.getText().substr(0,1)+"','"+this.cb_pp.getText()+"')");
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
					sql.add("delete from agg_angkat where kode_angkat = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
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
	simpan2: function(){			
		try{						
			uses("server_util_arrayList");
			var sql = new server_util_arrayList();
			if (this.sg.getRowValidCount() > 0){
				sql.add("delete from agg_angkat where kode_lokasi='"+this.app._lokasi+"' and kode_angkat like '%"+this.c_tahun.getText()+"%'  ");
				for (var i=0;i < this.sg.getRowCount();i++){
					if (this.sg.rowValid(i)){
						sql.add("insert into agg_angkat(kode_angkat,nama,kode_lokasi,flag_aktif,kode_pp) values "+
							"('"+this.sg.cells(0,i)+"','"+this.sg.cells(1,i)+"','"+this.app._lokasi+"','1','"+this.sg.cells(2,i)+"')");						
					}
				}
			}						
			setTipeButton(tbAllFalse);
			this.dbLib.execArraySQL(sql);
			
		}catch(e){
			systemAPI.alert(e);
		}
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
			if (sender == this.cb_kode && this.cb_kode.getText() != ""){
				var strSQL = "select * from agg_angkat where kode_angkat ='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.e_nama.setText(line.nama);												
						if (line.flag_aktif == "1") this.c_status.setText("1. AKTIF");
						else this.c_status.setText("0. NONAKTIF");
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
	doBtnClick: function(sender, event){
		try{
			if (sender == this.cb_kode) {   
			    this.standarLib.showListData(this, "Daftar Angkatan",sender,undefined, 
											  "select kode_angkat, nama  from agg_angkat where kode_lokasi='"+this.app._lokasi+"'",
											  "select count(*) from agg_angkat where kode_lokasi='"+this.app._lokasi+"'",
											  ["kode_angkat","nama"],"where",["Kode","Nama"],false);				
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
				this.cb_pp.setText(this.sg1.cells(2,row));					
			}
		} catch(e) {alert(e);}
	},
	doLoad:function(sender){						
		var strSQL = "select a.kode_angkat,a.nama,a.kode_pp "+
					 "from agg_angkat a "+
					 "where a.kode_lokasi='"+this.app._lokasi+"' and a.kode_angkat like '%"+this.c_tahun.getText()+"%' order by a.kode_angkat ";		
		
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
			if (this.e_kode2.getText() != "") var filter = filter+" and kode_bidang = '"+this.e_kode2.getText()+"' ";
			if (this.e_nama2.getText() != "") var filter = filter+" and nama like '%"+this.e_nama2.getText()+"%' ";
			
			var strSQL = "select kode_bidang,nama,tahun,kode_rektor "+
		             "from agg_bidang where kode_lokasi='"+this.app._lokasi+"' and tahun='"+this.c_tahun.getText()+"' "+filter+" order by kode_bidang ";		
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
			this.sg1.appendData([line.kode_angkat,line.nama,line.kode_pp]); 
		}
		this.sg1.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	}
});
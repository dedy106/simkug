window.app_saku3_transaksi_siaga_hris_fJab = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_siaga_hris_fJab.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_siaga_hris_fJab";
		this.itemsValue = new arrayList();
		this.maximize();	
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Jabatan", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);		
		this.pc1 = new pageControl(this,{bound:[10,12,1000,450], childPage:["Daftar Jabatan","Data Jabatan"]});				
		this.bTambah = new button(this.pc1.childPage[0],{bound:[900,10,80,18],caption:"+ Tambah",click:[this,"doTambah"]});
		this.e_kode2 = new saiLabelEdit(this.pc1.childPage[0], { bound: [20, 10, 250, 20], caption: "Search", maxLength: 100, tag: 9, change: [this, "doCari"] });
		this.c_show = new saiCB(this.pc1.childPage[0], { bound: [280, 10, 50, 20], caption: "", labelWidth:0, items: ["10", "15", "25", "50", "100"], readOnly: true, tag: 9, change: [this, "doLoad"] });

		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-65],colCount:3,tag:9,
		            colTitle:["Kode","Nama","Pilih"],
					colWidth:[[2,1,0],[70,300,100]],
					readOnly:true, colFormat: [[2], [cfButton]], colAlign: [[2], [alCenter]],
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
		
		this.cb_kode = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,200,20],caption:"Kode", maxLength:10, tag:0,change:[this,"doChange"]});
		this.e_nama = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,11,450,20],caption:"Nama", maxLength:50, tag:1});				
		this.cb_klp = new saiCBBL(this.pc1.childPage[1],{bound:[20,13,220,20],caption:"Kelompok",multiSelection:false,maxLength:10});
		this.cb_komp = new saiCBBL(this.pc1.childPage[1],{bound:[20,14,220,20],caption:"Kode Kompetensi",multiSelection:false,maxLength:10});
		//18-03-19  this.cb_grade = new saiCBBL(this.pc1.childPage[1],{bound:[20,16,220,20],caption:"Grade",multiSelection:false,maxLength:10});
		this.c_jenis = new saiCB(this.pc1.childPage[1],{bound:[20,15,200,20],caption:"Jenis Jab",readOnly:true,items:["MGR","NON"],tag:2}); 		
		this.c_aktif = new saiCB(this.pc1.childPage[1],{bound:[20,13,200,20],caption:"Status Aktif",items:["1.AKTIF","0.NONAKTIF"], readOnly:true});

		this.rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);			
		setTipeButton(tbAllFalse);
			
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();

			this.cb_klp.setSQL("select kode_klpjab, nama from gr_klpjab where kode_lokasi='"+this.app._lokasi+"'",["kode_klpjab","nama"],false,["Kode","Nama"],"and","Data Kelompok Jabatan",true);						
			this.cb_komp.setSQL("select kode_komp, nama from gr_komp where kode_lokasi='"+this.app._lokasi+"'",["kode_komp","nama"],false,["Kode","Nama"],"and","Data Kompetensi",true);						
			//this.cb_grade.setSQL("select kode_grade, nama from gr_grade where kode_lokasi='"+this.app._lokasi+"'",["kode_grade","nama"],false,["Kode","Nama"],"and","Data Grade",true);						

			this.c_show.setText("25");
			this.doLoad();			

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_siaga_hris_fJab.extend(window.childForm);
window.app_saku3_transaksi_siaga_hris_fJab.implement({
	doTambah: function() {				
		this.pc1.setActivePage(this.pc1.childPage[1]);	   		
		this.cb_kode.setFocus();     																	
	},
	doCari: function (sender) {
		try {

			var show = parseInt(this.c_show.getText());
			var column_array = ['a.kode_jab', 'a.nama'];

			var search = this.e_kode2.getText();
			var filter_string = " (";

			for (var i = 0; i < column_array.length; i++) {

				if (i == (column_array.length - 1)) {
					filter_string += column_array[i] + " like '%" + search + "%' )";
				} else {
					filter_string += column_array[i] + " like '%" + search + "%' or ";
				}
			}

			var strSQL = "select a.kode_jab, a.nama " +
				"from gr_jab a " +
				"where " + filter_string + "and a.kode_lokasi= '" + this.app._lokasi + "' ";

			var data = this.dbLib.getDataProvider(strSQL, true);
			if (typeof data == "object" && data.rs.rows[0] != undefined) {
				this.dataJU = data;
				this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length / show));
				this.sgn1.rearrange();
				this.doTampilData(1);
			} else this.sg1.clear(1);

			// var data = this.dbLib.getDataProvider(strSQL,true);		
			// if (typeof data == "object" && data.rs.rows[0] != undefined){
			// 	this.dataJU = data;
			// 	this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
			// 	this.sgn1.rearrange();
			// 	this.doTampilData(1);
			// } else this.sg1.clear(1);	
			
			this.pc1.setActivePage(this.pc1.childPage[0]);
		}
		catch (e) {
			alert(e);
		}
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
					
					sql.add("insert into gr_jab(kode_jab,nama,kode_lokasi,jenis,kode_klpjab,flag_aktif,kode_komp,kode_grade) values "+
						    "	('"+this.cb_kode.getText()+"','"+this.e_nama.getText()+"','"+this.app._lokasi+"','"+this.c_jenis.getText()+"','"+this.cb_klp.getText()+"','"+this.c_aktif.getText().substr(0,1)+"','"+this.cb_komp.getText()+"','-')");

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
					sql.add("delete from gr_jab where kode_jab = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ");			
					sql.add("insert into gr_jab(kode_jab,nama,kode_lokasi,jenis,kode_klpjab,flag_aktif,kode_komp,kode_grade) values "+
							"	('"+this.cb_kode.getText()+"','"+this.e_nama.getText()+"','"+this.app._lokasi+"','"+this.c_jenis.getText()+"','"+this.cb_klp.getText()+"','"+this.c_aktif.getText().substr(0,1)+"','"+this.cb_komp.getText()+"','-')");
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
					sql.add("delete from gr_jab where kode_jab = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ");			
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
			if (this.cb_kode.getText() != ""){
				var strSQL = "select * from gr_jab where kode_jab ='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.e_nama.setText(line.nama);
						this.c_jenis.setText(line.jenis);
						this.cb_klp.setText(line.kode_klpjab);
						this.cb_komp.setText(line.kode_komp);	
						//this.cb_grade.setText(line.kode_grade);					
						if (line.flag_aktif == "1") this.c_aktif.setText("1.AKTIF");							
						else this.c_aktif.setText("0.NONAKTIF");							

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
		var show = parseInt(this.c_show.getText());					
		var strSQL = "select kode_jab,nama from gr_jab where kode_lokasi ='"+this.app._lokasi+"' order by kode_jab";		
		var data = this.dbLib.getDataProvider(strSQL,true);		
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/show));
			this.sgn1.rearrange();
			this.doTampilData(1);
		} else this.sg1.clear(1);			
	},

	doTampilData: function(page) {
		var show = parseInt(this.c_show.getText());	
		this.sg1.clear();
		var line;
		this.page = page;
		var start = (page - 1) * show ;
		var finish = (start + show  > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+show );
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];													
			this.sg1.appendData([line.kode_jab,line.nama,"Pilih"]); 
		}
		this.sg1.setNoUrut(start);
	},	
	doPager: function(sender, page) {
		this.doTampilData(page);
	}
});

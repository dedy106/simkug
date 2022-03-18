window.app_saku3_transaksi_tu_ntf21_fJenisProyek = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_tu_ntf21_fJenisProyek.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_tu_ntf21_fJenisProyek";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Jenis Proyek", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);		
		
		this.c_tahun2 = new saiCB(this,{bound:[40,10,200,20],caption:"Tahun",tag:2, mustCheck:false, change:[this,"doChange"]});		
		this.pc1 = new pageControl(this,{bound:[20,12,1000,430], childPage:["Daftar Jenis","Data Jenis"]});
		this.bTambah = new button(this.pc1.childPage[0],{bound:[900,10,80,18],caption:"+ Tambah",click:[this,"doTambah"]});
		this.e_kode2 = new saiLabelEdit(this.pc1.childPage[0], { bound: [20, 10, 250, 20], caption: "Search", maxLength: 100, tag: 9, change: [this, "doCari"] });
		this.c_show = new saiCB(this.pc1.childPage[0], { bound: [280, 10, 50, 20], caption: "", labelWidth:0, items: ["10", "15", "25", "50", "100"], readOnly: true, tag: 9, change: [this, "doLoad"] });
		
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-65],colCount:3,tag:9,
		            colTitle:["Kode","Nama","Pilih"],
					colWidth:[[2,1,0],[70,500,100]],
					colFormat:[[2],[cfButton]], readOnly:true,									
					colAlign:[[2],[alCenter]],													 
					click: [this, "doSort"],	dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
				
		this.cb_kode = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,10,200,20],caption:"Kode",maxLength:10,change:[this,"doChange"]});		
		this.e_nama = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,11,500,20],caption:"Nama", maxLength:50, tag:1,change:[this,"doChange"]});			
		this.cb_pyt = new saiCBBL(this.pc1.childPage[1],{bound:[20,12,220,20],caption:"Akun PYT", multiSelection:false, maxLength:10, tag:1});						
		this.cb_pdpt = new saiCBBL(this.pc1.childPage[1],{bound:[20,14,220,20],caption:"Akun Pendapatan", multiSelection:false, maxLength:10, tag:1});						
		this.cb_bdd = new saiCBBL(this.pc1.childPage[1],{bound:[20,12,220,20],caption:"Akun BDD", multiSelection:false, maxLength:10, tag:1});				
		this.cb_bmhd = new saiCBBL(this.pc1.childPage[1],{bound:[20,15,220,20],caption:"Akun BYMHD", multiSelection:false, maxLength:10, tag:1});				
		this.cb_beban = new saiCBBL(this.pc1.childPage[1],{bound:[20,12,220,20],caption:"Akun Beban", multiSelection:false, maxLength:10, tag:1});						
		this.cb_bsisih = new saiCBBL(this.pc1.childPage[1],{bound:[20,13,220,20],caption:"Bbn Sisih", multiSelection:false, maxLength:10, tag:1});						
		this.cb_akum = new saiCBBL(this.pc1.childPage[1],{bound:[20,15,220,20],caption:"Akum Sisih", multiSelection:false, maxLength:10, tag:1});								
		this.cb_pp = new saiCBBL(this.pc1.childPage[1],{bound:[20,14,220,20],caption:"PP/Unit", multiSelection:false, maxLength:10, tag:1});						
		this.c_kelompok = new saiCB(this.pc1.childPage[1],{bound:[20,13,200,20],caption:"Kelompok",items:["PROYEK","PELATIHAN","EVENT","NTF_LOGISTIK","NTF_BTP","SEWA"], readOnly:true,tag:2});		
		this.c_aktif = new saiCB(this.pc1.childPage[1],{bound:[20,15,200,20],caption:"Status Aktif",items:["1-AKTIF","0-NON"], readOnly:true,tag:2});
		this.c_tahun = new saiCB(this.pc1.childPage[1],{bound:[20,17,200,20],caption:"Tahun Anggaran", readOnly:true,tag:2,change:[this,"doChange"]});	
		this.cb_drkp = new saiCBBL(this.pc1.childPage[1],{bound:[20,15,220,20],caption:"DRK Pdpt", multiSelection:false, maxLength:10, tag:1});						
		this.cb_drkb = new saiCBBL(this.pc1.childPage[1],{bound:[20,14,220,20],caption:"DRK Beban", multiSelection:false, maxLength:10, tag:1});						
			
		this.rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);			
		this.pc1.childPage[1].rearrangeChild(10, 23);		
		
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			
			this.c_tahun2.setText("");
			this.c_tahun2.items.clear();
			var data = this.dbLib.getDataProvider("select distinct substring(periode,1,4) as tahun from periode where kode_lokasi='"+this.app._lokasi+"' order by substring(periode,1,4) desc",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];													
					this.c_tahun2.addItem(i,line.tahun);
				}
			} 

			this.doLoad();			

			this.cb_bdd.setSQL("select kode_akun,nama from masakun where kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);
			this.cb_pyt.setSQL("select kode_akun,nama from masakun where kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);
			this.cb_pdpt.setSQL("select kode_akun,nama from masakun where kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);
			this.cb_bmhd.setSQL("select kode_akun,nama from masakun where kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);
			this.cb_beban.setSQL("select kode_akun,nama from masakun where kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);
			this.cb_bsisih.setSQL("select kode_akun,nama from masakun where kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);
			this.cb_akum.setSQL("select kode_akun,nama from masakun where kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);			
			this.cb_pp.setSQL("select kode_pp,nama from pp where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP/Unit",true);

			this.c_tahun.items.clear();
			var data = this.dbLib.getDataProvider("select distinct max(substring(periode,1,4)) as tahun from periode where kode_lokasi='"+this.app._lokasi+"' union select year(getdate()) ",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.c_tahun.addItem(i,line.tahun);
				}
			}
			this.c_tahun.setText(this.app._periode.substr(0,4));

			this.stsCol = [0, 0, 0, 0, 0];
			this.c_show.setText("25");
			this.timeout = null;

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_tu_ntf21_fJenisProyek.extend(window.childForm);
window.app_saku3_transaksi_tu_ntf21_fJenisProyek.implement({
	doTambah: function() {		
		this.stsSimpan = 1;
		this.pc1.setActivePage(this.pc1.childPage[1]);	   
		this.cb_kode.setFocus();     																	
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
					sql.add("insert into prb_proyek_jenis(kode_jenis,kode_lokasi,nama,akun_bdd,akun_pdpt,akun_bmhd,akun_pyt,kelompok, akun_beban,   kode_pp,flag_aktif,flag_memo,tahun,kode_drkb,kode_drkp,jenis_pph42, akun_bsisih,akun_akum) values "+
						    "('"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.e_nama.getText()+"','"+this.cb_bdd.getText()+"','"+this.cb_pdpt.getText()+"','"+this.cb_bmhd.getText()+"','"+this.cb_pyt.getText()+"','"+this.c_kelompok.getText()+"','"+this.cb_beban.getText()+"' ,'"+this.cb_pp.getText()+"','"+this.c_aktif.getText().substr(0,1)+"','-','"+this.c_tahun.getText()+"','"+this.cb_drkb.getText()+"','"+this.cb_drkp.getText()+"','-','"+this.cb_bsisih.getText()+"','"+this.cb_akum.getText()+"')");	//"+this.c_memo.getText().substr(0,1)+"    "+this.c_jenis.getText()+"
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
					sql.add("delete from prb_proyek_jenis where kode_jenis= '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");								
					
					sql.add("insert into prb_proyek_jenis(kode_jenis,kode_lokasi,nama,akun_bdd,akun_pdpt,akun_bmhd,akun_pyt,kelompok, akun_beban,   kode_pp,flag_aktif,flag_memo,tahun,kode_drkb,kode_drkp,jenis_pph42, akun_bsisih,akun_akum) values "+
						    "('"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.e_nama.getText()+"','"+this.cb_bdd.getText()+"','"+this.cb_pdpt.getText()+"','"+this.cb_bmhd.getText()+"','"+this.cb_pyt.getText()+"','"+this.c_kelompok.getText()+"','"+this.cb_beban.getText()+"' ,'"+this.cb_pp.getText()+"','"+this.c_aktif.getText().substr(0,1)+"','-','"+this.c_tahun.getText()+"','"+this.cb_drkb.getText()+"','"+this.cb_drkp.getText()+"','-','"+this.cb_bsisih.getText()+"','"+this.cb_akum.getText()+"')");	//"+this.c_memo.getText().substr(0,1)+"    "+this.c_jenis.getText()+"
							
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
					sql.add("delete from prb_proyek_jenis where kode_jenis = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");								
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
					this.standarLib.clearByTag(this, new Array("0","1"),this.cb_kode);					
					this.doLoad();
					setTipeButton(tbAllFalse);
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
			if (sender == this.c_tahun2 && this.c_tahun2.getText() != ""){
				this.doLoad();
			}
			if (sender == this.cb_kode && this.cb_kode.getText() != ""){
				var strSQL = "select * from prb_proyek_jenis "+
						     "where kode_jenis ='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						   				
				var data = this.dbLib.getDataProvider(strSQL,true);				
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.e_nama.setText(line.nama);
						this.cb_bdd.setText(line.akun_bdd);
						this.cb_pyt.setText(line.akun_pyt);
						this.cb_pdpt.setText(line.akun_pdpt);
						//this.c_jenis.setText(line.jenis_pph42);
						this.cb_bmhd.setText(line.akun_bmhd);
						this.c_kelompok.setText(line.kelompok);
						this.cb_beban.setText(line.akun_beban);		
						this.cb_bsisih.setText(line.akun_bsisih);
						this.cb_akum.setText(line.akun_akum);

						this.cb_pp.setText(line.kode_pp);		

						/*
						if (line.flag_memo == "1") this.c_memo.setText("1-ADA");
						else this.c_memo.setText("0-TIDAK");
						*/

						if (line.flag_aktif == "1") this.c_aktif.setText("1-AKTIF");
						else this.c_aktif.setText("0-NON");

						this.c_tahun.setText(line.tahun);	
						this.cb_drkb.setText(line.kode_drkb);	
						this.cb_drkp.setText(line.kode_drkp);	

						setTipeButton(tbUbahHapus);
					}
					else{
						this.standarLib.clearByTag(this, new Array("1"),undefined);
						setTipeButton(tbSimpan);
					}
				}								
			}	
			
			if (sender == this.c_tahun && this.c_tahun.getText()!="") {
				this.cb_drkp.setSQL("select a.kode_drk, a.nama from drk a where a.tahun='"+this.c_tahun.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",["kode_drk","nama"],false,["Kode","Nama"],"and","Data DRK Pendapatan",true);		
				this.cb_drkb.setSQL("select a.kode_drk, a.nama from drk a where a.tahun='"+this.c_tahun.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",["kode_drk","nama"],false,["Kode","Nama"],"and","Data DRK Beban",true);																													 				
			}

		}catch(e){
			systemAPI.alert(e);
		}
	},	
	doBtnClick: function(sender, event){
		try{
			if (sender == this.cb_kode) {   
			    this.standarLib.showListData(this, "Daftar Jenis",sender,undefined, 
											  "select kode_jenis, nama  from prb_proyek_jenis where kode_lokasi='"+this.app._lokasi+"'",
											  "select count(*) from prb_proyek_jenis where kode_lokasi='"+this.app._lokasi+"'",
											  ["kode_jenis","nama"],"and",["Kode","Nama"],false);				
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
	doLoad:function(sender){								
		try {
			var strSQL = "select a.kode_jenis,a.nama "+
						 "from prb_proyek_jenis a "+					 
						 "where a.kode_lokasi='"+this.app._lokasi+"' and a.tahun='"+this.c_tahun2.getText()+"' order by a.kode_jenis";				
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
		var show = parseInt(this.c_show.getText());		
		this.sg1.clear();
		var line;
		this.page = page;
		var start = (page - 1) * show;
		var finish = (start + show > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+show);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];																
			this.sg1.appendData([line.kode_jenis,line.nama,"Pilih"]); 
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
	},
	doCari: function (sender) {
		try {

			var show = parseInt(this.c_show.getText());
			var column_array = ['kode_jenis', 'nama'];

			var search = this.e_kode2.getText();
			var filter_string = " (";

			for (var i = 0; i < column_array.length; i++) {

				if (i == (column_array.length - 1)) {
					filter_string += column_array[i] + " like '%" + search + "%' )";
				} else {
					filter_string += column_array[i] + " like '%" + search + "%' or ";
				}
			}
			
			var strSQL = "select kode_jenis, nama from prb_proyek_jenis " +
						 "where " + filter_string + " and kode_lokasi= '" + this.app._lokasi + "' and tahun='"+this.c_tahun2.getText()+"'";
			
			var data = this.dbLib.getDataProvider(strSQL, true);
			if (typeof data == "object" && data.rs.rows[0] != undefined) {
				this.dataJU = data;
				this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length / show));
				this.sgn1.rearrange();
				this.doTampilData(1);
			} else this.sg1.clear(1);
			this.pc1.setActivePage(this.pc1.childPage[0]);
		}
		catch (e) {
			alert(e);
		}
	},
	doSort: function (sender, col, row) {
		try {

			var show = parseInt(this.c_show.getText());
			if (col == 2) {
				this.doDoubleClick(sender, col, row);
			} else {
				if (this.stsCol[col] == 1) {
					this.stsCol[col] = 0;
					var ordertype = " asc ";
				} else {
					this.stsCol[col] = 1;
					var ordertype = " desc ";
				}

				var column_array = ['kode_jenis', 'nama'];

				var search = this.e_kode2.getText();
				var filter_string = " (";

				for (var i = 0; i < column_array.length; i++) {

					if (i == (column_array.length - 1)) {
						filter_string += column_array[i] + " like '%" + search + "%' )";
					} else {
						filter_string += column_array[i] + " like '%" + search + "%' or ";
					}
				}

				var strSQL = "select kode_jenis,nama " +
					"from prb_proyek_jenis " +
					"where " + filter_string + "and kode_lokasi= '" + this.app._lokasi + "' and tahun='"+this.c_tahun2.getText()+"' " +
					" order by " + column_array[col] + " " + ordertype;

				var data = this.dbLib.getDataProvider(strSQL, true);
				if (typeof data == "object" && data.rs.rows[0] != undefined) {
					this.dataJU = data;
					this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length / show));
					this.sgn1.rearrange();
					this.doTampilData(1);
				} else this.sg1.clear(1);
			}
		} catch (e) {

			alert(e);
		}
	}
});
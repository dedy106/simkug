window.app_saku3_transaksi_spro_fPPtm = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_spro_fPPtm.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_spro_fPPtm";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data PP: Input/Edit", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);		
		
		this.cb_lokasi = new saiCBBL(this,{bound:[20,10,200,20],caption:"Lokasi", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});
		this.pc1 = new pageControl(this,{bound:[20,12,1000,400], childPage:["Daftar PP","Data PP","Filter Cari"]});				
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:4,tag:9,
		            colTitle:["Kode PP","Nama PP","Bidang","Regional"],
					colWidth:[[3,2,1,0],[200,300,300,100]],
					readOnly:true,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
		
		this.cb_kode = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,10,180,20],caption:"Kode",maxLength:10,change:[this,"doChange"]});		
		this.e_nama = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,11,400,20],caption:"Nama", maxLength:50, tag:1});	
		this.cb_bidang = new saiCBBL(this.pc1.childPage[1],{bound:[20,15,200,20],caption:"Bidang", multiSelection:false, maxLength:10, tag:2});
		this.cb_regional = new saiCBBL(this.pc1.childPage[1],{bound:[20,16,200,20],caption:"Regional", multiSelection:false, maxLength:10, tag:2});
		this.c_status = new saiCB(this.pc1.childPage[1],{bound:[20,22,200,20],caption:"Status",items:["1. AKTIF","0. NONAKTIF"], readOnly:true,tag:2});
		this.c_jenis = new saiCB(this.pc1.childPage[1],{bound:[20,23,200,20],caption:"Jenis",items:["I - INDEMNITY","M - MANAGECARE","-"], readOnly:true,tag:2});
		
		
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
			this.cb_lokasi.setSQL("select kode_lokasi,nama from lokasi where flag_konsol='0'",["kode_lokasi","nama"],false,["Kode","Nama"],"and","Data Lokasi",true);
			this.cb_bidang.setSQL("select kode_bidang,nama from bidang",["kode_bidang","nama"],false,["Kode","Nama"],"where","Data Bidang",true);
			this.cb_regional.setSQL("select kode_regional,nama from regional",["kode_regional","nama"],false,["Kode","Nama"],"where","Data Regional",true);
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_spro_fPPtm.extend(window.childForm);
window.app_saku3_transaksi_spro_fPPtm.implement({
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
					sql.add("insert into pp(kode_pp, kode_lokasi, nama, initial, level_spasi, tipe, sum_header, kode_induk, rowindex, kode_bidang, flag_aktif,kode_regional) values "+
						    "	('"+this.cb_kode.getText()+"','"+this.cb_lokasi.getText()+"','"+this.e_nama.getText()+"',  '-', '0', 'Posting', '00', '"+this.c_jenis.getText().substr(0,1)+"', 1, '"+this.cb_bidang.getText()+"', '"+this.c_status.getText().substr(0,1)+"','"+this.cb_regional.getText()+"')");
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
					sql.add("update pp set kode_induk='"+this.c_jenis.getText().substr(0,1)+"', nama='"+this.e_nama.getText()+"', flag_aktif ='"+this.c_status.getText().substr(0,1)+"', kode_bidang='"+this.cb_bidang.getText()+"',kode_regional='"+this.cb_regional.getText()+"' "+
					        "where kode_pp = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.cb_lokasi.getText()+"'");
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
					sql.add("delete from pp where kode_pp = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.cb_lokasi.getText()+"'");			
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
				if (modalResult == mrOk)
					this.standarLib.clearByTag(this, new Array("0","1"),this.cb_kode);
					this.doLoad();
				setTipeButton(tbAllFalse);
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
			if (sender == this.cb_lokasi && this.cb_lokasi.getText() != "") this.doLoad();
	
			if (sender == this.cb_kode && this.cb_kode.getText() != ""){
				var strSQL = "select kode_pp,nama,flag_aktif,kode_bidang,kode_induk,kode_regional from pp "+
						     "where kode_pp ='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.cb_lokasi.getText()+"'";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.e_nama.setText(line.nama);
						this.cb_bidang.setText(line.kode_bidang);
						this.cb_regional.setText(line.kode_regional);
						if (line.flag_aktif == "0") this.c_status.setText("0. NONAKTIF");
						else this.c_status.setText("1. AKTIF");
						
						if (line.kode_induk == "I") this.c_jenis.setText("I - INDEMNITY");
						if (line.kode_induk == "M") this.c_jenis.setText("M - MANAGECARE");
						if (line.kode_induk == "-") this.c_jenis.setText("-");
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
			}
		} catch(e) {alert(e);}
	},
	doCari:function(sender){								
		if (this.e_kode2.getText() != "") var filter = " a.kode_pp like '%"+this.e_kode2.getText()+"%' and ";
		else var filter = " a.nama like '%"+this.e_nama2.getText()+"%' and ";
		var strSQL = "select a.kode_pp,a.nama,a.kode_bidang+' - '+b.nama as bidang "+
		             "from pp a inner join bidang b on a.kode_bidang=b.kode_bidang  "+
					 "where "+filter+" a.kode_lokasi='"+this.cb_lokasi.getText()+"' order by a.kode_pp";		
		var data = this.dbLib.getDataProvider(strSQL,true);		
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn1.rearrange();
			this.doTampilData(1);
		} else this.sg1.clear(1);			
		this.pc1.setActivePage(this.pc1.childPage[0]);
	},
	doLoad:function(sender){						
		var strSQL = "select a.kode_pp,a.nama,a.kode_bidang+' - '+b.nama as bidang,a.kode_regional+' - '+c.nama as regional "+
		             "from pp a inner join bidang b on a.kode_bidang=b.kode_bidang  "+
					 "inner join regional c on a.kode_regional=c.kode_regional "
					 "where a.kode_lokasi='"+this.cb_lokasi.getText()+"' order by a.kode_pp";		
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
			this.sg1.appendData([line.kode_pp,line.nama,line.bidang,line.regional]); 
		}
		this.sg1.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	}
});
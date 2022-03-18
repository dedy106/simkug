window.app_saku3_transaksi_dago_fHp = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_dago_fHp.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_dago_fHp";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Hotel & Pembimbing", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);
		this.pc1 = new pageControl(this,{bound:[20,12,1000,450], childPage:["Data Hotel/Pembimbing","Daftar Hotel/Pembimbing"]});				
		this.sg1 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:6,tag:9,
		            colTitle:["No. Registrasi","No Jamaah","Pembimbing","Hotel Madinah","Hotel Makkah","Hotel Lainnya"],
					colWidth:[[5,4,3,2,1,0],[150,150,150,150,150,150]],
					readOnly:true,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
		
		this.cb_paket = new saiCBBL(this.pc1.childPage[0],{bound:[20,11,220,20],caption:"Paket",tag:1,multiSelection:false, maxLength:10, change:[this,"doChange"]});
		this.cb_jadwal = new saiCBBL(this.pc1.childPage[0],{bound:[20,12,220,20],caption:"Jadwal", multiSelection:false, maxLength:10, tag:1});		
		this.cb_hotelmd = new saiCBBL(this.pc1.childPage[0],{bound:[20,13,220,20],caption:"Hotel Madinah",tag:1,multiSelection:false, maxLength:10,  change:[this,"doChange"]});
		this.cb_hotelmk = new saiCBBL(this.pc1.childPage[0],{bound:[20,15,220,20],caption:"Hotel Makkah",tag:1,multiSelection:false, maxLength:10,  change:[this,"doChange"]});
		this.cb_hotelln = new saiCBBL(this.pc1.childPage[0],{bound:[20,16,220,20],caption:"Hotel Lainnya",tag:9,multiSelection:false, maxLength:10,  change:[this,"doChange"]});
		this.cb_pbb = new saiCBBL(this.pc1.childPage[0],{bound:[20,14,220,20],caption:"Pembimbing", multiSelection:false, maxLength:10, tag:1});		
		this.bValid = new button(this.pc1.childPage[0],{bound:[455,14,80,18],caption:"Tampil Data",click:[this,"doCari"]});					
		
		this.pc2 = new pageControl(this.pc1.childPage[0],{bound:[5,15,955,270], childPage:["Data Jamaah"]});				
		this.sg4 = new saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:3,tag:9,
		            colTitle:["Status","No. registrasi","No. Jamaah"],
					colWidth:[[2,1,0],[200,200,100]],
					columnReadOnly:[true,[0,1,2]],
					change:[this,"doChangeCell"],
					buttonStyle:[[0],[bsAuto]],
					picklist:[[0],[new portalui_arrayMap({items:["APP","NON"]})]],
					autoAppend:false,defaultRow:1,dblClick:[this,"doDoubleClick4"]});
		this.sgn4 = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg4,pager:[this,"doPager4"]});

		this.rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);			
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan=1;
			
			this.cb_paket.setSQL("select no_paket, nama from dgw_paket where kode_lokasi='"+this.app._lokasi+"' ",["no_paket","nama"],false,["Kode","Nama"],"and","Data Paket",true);
			this.cb_hotelmd.setSQL("select id_hotel, nama from dgw_hotel where kode_lokasi = '"+this.app._lokasi+"' ",["id_hotel","nama"],false,["ID Hotel","Nama"],"and","Data Hotel",true);
			this.cb_hotelmk.setSQL("select id_hotel, nama from dgw_hotel where kode_lokasi = '"+this.app._lokasi+"' ",["id_hotel","nama"],false,["ID Hotel","Nama"],"and","Data Hotel",true);
			this.cb_hotelln.setSQL("select id_hotel, nama from dgw_hotel  where kode_lokasi = '"+this.app._lokasi+"' union select '-','-' ",["id_hotel","nama"],false,["ID Hotel","Nama"],"and","Data Hotel",true);
			this.cb_pbb.setSQL("select id_pbb, nama from dgw_pbb where kode_lokasi = '"+this.app._lokasi+"' ",["id_pbb","nama"],false,["ID Pembimbing","Nama"],"and","Data Akun Pembimbing",true);
			this.doLoad();			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_dago_fHp.extend(window.childForm);
window.app_saku3_transaksi_dago_fHp.implement({
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
			if (this.stsSimpan == 1);		
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try{
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();	
					
					var line;
					for (var i=0;i < this.dataJU4.rs.rows.length;i++){
						line = this.dataJU4.rs.rows[i];
						if(line.stsapp.toUpperCase()=="APP"){
							sql.add("update dgw_reg set id_hotelmd='"+this.cb_hotelmd.getText()+"', id_hotelmk='"+this.cb_hotelmk.getText()+"', id_hotelln='"+this.cb_hotelln.getText()+"', id_pbb='"+this.cb_pbb.getText()+"' where no_reg='"+line.no_reg+"' and kode_lokasi='"+this.app._lokasi+"' ");
						}
					}
					setTipeButton(tbSimpan);
					this.dbLib.execArraySQL(sql);
				}
				catch(e){ system.alert(this, e,""); }
			}
		}
		catch(e){ systemAPI.alert(e); }
	},

	hapus: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from ktu_tcash_m where no_bukti_t = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from ktu_tcash_d where no_bukti_t = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
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
				if (modalResult == mrOk) this.standarLib.clearByTag(this, new Array("0","1","4"),this.cb_kode);
				setTipeButton(tbSimpan);
				this.pc1.setActivePage(this.pc1.childPage[0]);
				this.stsSimpan=1;
				this.sg1.clear(1);	
				break;
			case "simpan" :	
			case "ubah" :
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;				
			case "hapus" :
				this.hapus();
				break;				
		}
	},

	doChange:function(sender){
		try{
			if (sender == this.cb_paket && this.cb_paket.getText() != "") {
				this.cb_jadwal.setSQL("select convert(varchar,tgl_berangkat,103) as tgl_berangkat,no_jadwal from dgw_jadwal where no_closing='-' and no_paket='"+this.cb_paket.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["no_jadwal","tgl_berangkat"],false,["ID Jadwal","Jadwal"],"and","Data Jadwal",true);
			}
		}catch(e) {alert(e);}
	},

	doCari:function(sender){								
		this.pc1.setActivePage(this.pc1.childPage[0]);
		var strSQL = "select 'APP' as stsapp, no_reg, no_peserta from dgw_reg where id_hotelmd = '-' and id_hotelmk = '-' and id_hotelln = '-' and id_pbb = '-' and no_paket ='"+this.cb_paket.getText()+"' and no_jadwal ='"+this.cb_jadwal.getText()+"' and kode_lokasi='"+this.app._lokasi+"' "
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU4 = data;
			this.sgn4.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn4.rearrange();
			this.doTampilData4(1);
		} else this.sg4.clear(1);
	},

	doTampilData4: function(page) {
		this.sg4.clear();
		var line2;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU4.rs.rows.length? this.dataJU4.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line2 = this.dataJU4.rs.rows[i];													
			this.sg4.appendData([line2.stsapp.toUpperCase(),line2.no_reg,line2.no_peserta]); 
		}
		this.sg4.setNoUrut(start);
	},

	doPager4: function(sender, page) {
		this.doTampilData4(page);
	},		
	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan.");							
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
		var strSQL = "select no_reg, no_peserta,id_hotelmd,id_hotelmk,id_hotelln,id_pbb from dgw_reg where id_hotelmd <> '-' and id_hotelmk <> '-' and id_pbb <> '-' ";		
		var data = this.dbLib.getDataProvider(strSQL,true);		
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn1.rearrange();
			this.doTampilData(1);
		} else this.sg1.clear(1);			
	},

	doTampilData: function(page) {
		this.sg1.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];													
			this.sg1.appendData([line.no_reg,line.no_peserta,line.id_pbb,line.id_hotelmd,line.id_hotelmk,line.id_hotelln]); 
		}
		this.sg1.setNoUrut(start);
	},

	doChangeCell: function(sender, col, row){		
		if (col == 0 ){
			this.dataJU4.rs.rows[((this.page-1)*20) + row].stsapp = this.sg4.cells(0,row);
			this.sg4.validasi();
		}
	},

	doDoubleClick4: function(sender, col , row) {
		if(this.sg4.cells(0,row) == "NON") this.sg4.cells(0,row,"APP");
		else this.sg4.cells(0,row,"NON");
	},

	doPager: function(sender, page){
		this.doTampilData(page);
	}
});

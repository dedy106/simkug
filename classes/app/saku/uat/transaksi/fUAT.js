window.app_saku_uat_transaksi_fUAT = function(owner)
{
	if (owner)
	{
		window.app_saku_uat_transaksi_fUAT.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_uat_transaksi_fUAT";
		this.maximize();
		this.itemsValue = new portalui_arrayList();	
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form UAT : Input", 0);	
		
		uses("portalui_datePicker;portalui_saiGrid;portalui_sgNavigator");
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_tgl = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()});
		this.e_noUat = new portalui_saiLabelEdit(this,{bound:[20,13,250,20],caption:"No. UAT"});
		this.b_gen = new portalui_button(this,{bound:[271,13,80,18],caption:"Generate",click:[this,"doGenClick"],icon:"icon/"+system.getThemes()+"/process.png"});
		this.e_dok = new portalui_saiLabelEdit(this,{bound:[20,14,250,20],caption:"No. Dokumen"});	
		this.e_ket = new portalui_saiLabelEdit(this,{bound:[20,23,500,20],caption:"Keterangan"});
		this.cb_nikbuat = new portalui_saiCBBL(this,{bound:[20,24,200,20],caption:"NIK Buat",btnClick:[this,"doBtnClick"]});					
		this.cb_menu = new portalui_saiCB(this,{bound:[20,25,250,20],caption:"Kode Menu",readOnly:false,mustCheck:false,tag:9});
		this.btn = new portalui_imageButton(this,{bound:[275,25,21,21],image:"icon/"+system.getThemes()+"/reload.png",click:[this, "doClick"]});
		this.btn.setHint("Reload");
		this.p1 = new portalui_panel(this,{bound:[20,26,750,257],caption:"Detail Menu"});
		this.sg = new portalui_saiGrid(this.p1,{bound:[0,20,750,210],colCount:4,colTitle:["No. Form","Nama Form","Keterangan Error","Status"],
				colWidth:[[0,1,2,3],[80,253,300,75]],buttonStyle:[[3],[bsAuto]],defaultRow:1, 
				ellipsClick:[this, "sgFindBtnClick"],change:[this, "doSgChange"],autoAppend:true,
				tag:2,picklist:[[3],[new portalui_arrayMap({items:["OK","NOT OK"]})]]});
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[0,231,750,25],buttonStyle:1,grid:this.sg});
		
		this.rearrangeChild(10, 23);		
		setTipeButton(tbSimpan);
		this.setTabChildIndex();
		try
		{		    
			this.dbLib = new util_dbLib();
		    this.dbLib.addListener(this);
		    this.standarLib = new util_standar();
			this.idMenu = new Array();
		    
			uses("util_addOnLib");
		    this.addOnLib = new util_addOnLib();
			uses("util_gridLib");
			this.gridLib=new util_gridLib();
			
			var klp = this.dbLib.getDataProvider("select distinct kode_klp from menu");
			eval("klp= "+klp+";");
			if (klp.rs.rows[0] !== undefined) {
				this.cb_menu.clearItem();
				for (var i in klp.rs.rows){							
					this.cb_menu.addItem(i,klp.rs.rows[i].kode_klp);
				}
			}
			this.cb_menu.setText(this.app._kodeMenu);
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku_uat_transaksi_fUAT.extend(window.portalui_childForm);
window.app_saku_uat_transaksi_fUAT.implement({
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
		
			if (this.standarLib.checkEmptyByTag(this, [0,1]))
			{
				try
				{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("insert into uat_m (no_uat, no_dokumen, kode_lokasi, keterangan, tanggal, nik_buat, nik_user, tgl_input ) values" +
						"	('"+this.e_noUat.getText()+"','"+this.e_dok.getText()+"','"+this.app._lokasi+"','"+this.e_ket.getText()+"' "+
						" 	,'"+this.dp_tgl.getDateString()+"','"+this.cb_nikbuat.getText()+"','"+this.app._userLog+"',now())");
					if (this.sg.getRowValidCount() > 0){
						var d="insert into uat_d (no_uat, kode_menu, kode_klp, nu, kode_lokasi, keterangan, flag_user, flag_dev) values";
						var urut=1;
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								if (i > 0) d+= ",";
								d += "('"+this.e_noUat.getText()+"','"+this.idMenu[i]+"','"+this.cb_menu.getText()+"',"+urut+",'"+this.app._lokasi+"','"+this.sg.cells(2,i)+"','"+this.sg.cells(3,i)+"','-')";
								urut++;
							}
						}
						sql.add(d);
					}
					this.dbLib.execArraySQL(sql);
				}
				catch(e)
				{
					system.alert(this, e,"");
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		
		switch (event)
		{
			case "clear" :
				if (modalResult == mrOk)
					this.standarLib.clearByTag(this, new Array("0","1","2"),this.e_noUat);
			break;
			case "simpan" :	
				this.simpan();
			break;				
			case "simpancek" : this.simpan();			
			break;
		}
	},
	doBtnClick: function(sender, event){
		try
		{
			if (sender == this.cb_nikbuat) 
			{   
			    this.standarLib.showListData(this, "Daftar Karyawan",sender,undefined, 
											  "select nik, nama   from karyawan where kode_lokasi='"+this.app._lokasi+"' ",
											  "select count(nik) from karyawan where kode_lokasi='"+this.app._lokasi+"' ",
											  ["nik","nama"],"and",["NIK","Nama Karyawan"],false);
			}			
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib)
		{
			try
			{
				switch(methodName)
	    		{
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (Site ID : "+ this.e_noUat.getText()+")");							
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;
	    		}    		
			}
			catch(e)
			{
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	},
	doGenClick:function(sender){
		this.e_noUat.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"uat_m","no_uat","UAT/"+this.app._lokasi+"/","000"));
	},
	doClick:function(sender){
		this.sg.clear(1);
		if (this.cb_menu.getText() !== ""){
			var data = this.dbLib.getDataProvider("select kode_menu,kode_form,nama from menu where kode_klp = '"+this.cb_menu.getText()+"' order by rowindex ");										
			eval("data = "+data+";");
			if (typeof data === "object"){
				var temp;
				this.sg.clear();
				for (var i in data.rs.rows){
					temp = data.rs.rows[i];
					this.idMenu[i]=temp.kode_menu;
					if (temp !== undefined)
						this.sg.appendData([temp.kode_form, temp.nama,'-','OK']);
				}
			}
		}
	}
});
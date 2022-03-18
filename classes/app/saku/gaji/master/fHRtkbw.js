window.app_saku_gaji_master_fHRtkbw = function(owner)
{
	if (owner)
	{
		window.app_saku_gaji_master_fHRtkbw.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_gaji_master_fHRtkbw";
		this.maximize();
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Tabel Renumerasi TKBW", 0);
		
		uses("portalui_saiCBBL;portalui_saiGrid");
		this.ed_status = new portalui_saiCBBL(this, {
			bound: [20, 9, 185, 20],
			caption: "Status Pegawai",
			multiSelection: false,
			sql:["select kode_status, nama from hr_status2 where kode_lokkonsol = '"+this.app._lokKonsol+"' ",["kode_status","nama"], true, ["Kode","Nama"],"and","Daftar Status Pegawai",true],
			change:[this, "doChange"]
		});
		this.cb_mk = new portalui_saiCB(this, {
			bound: [20, 10, 200, 20],
			caption: "Masa Kerja(Bulan)",
			mustCheck: true,
			items:["6","12","24","36"],
			change:[this, "doChange"]
		});				
		this.bShow = new portalui_imageButton(this, {
			bound: [210, 10, 22, 22],
			hint: "Load Data",
			image: "icon" / +system.getThemes() + "/reload.png"
		});
				
		this.ed_gd = new portalui_saiLabelEdit(this, {
			bound: [20, 11, 200, 20],
			caption: "Gaji Dasar",
			tipeText: ttNilai,
			alignment: alRight,
			text: "0"
		});
		this.ed_ty = new portalui_saiLabelEdit(this, {
			bound: [20, 12, 200, 20],
			caption: "Tunj. Yayasan",
			tipeText: ttNilai,
			alignment: alRight,
			text: "0"
		});
		this.ed_tp = new portalui_saiLabelEdit(this, {
			bound: [20, 13, 200, 20],
			caption: "Tunj. Profesi",
			tipeText: ttNilai,
			alignment: alRight,
			text: "0"
		});		
				
		this.bTampil = new portalui_button(this, {
			bound: [670, 13, 80, 20],
			caption: "Tampil"
		});		
		
	    this.p1 = new portalui_panel(this, {
			bound: [20, 14, 725, 360],
			caption: "Daftar Tarif"
		});	    
				
		this.sg1 = new portalui_saiGrid(this.p1, {
			bound: [1, 20, 720, 335],
			tag: 8,
			colCount: 4,
			colWidth: [[3,2,1,0],[100,100,100,100]],
			colTitle:["Masa Kerja","Gaji Dasar","Tunj. Yayasan","Tunj. Profesi"],
			readOnly: true
		});    	
		
		setTipeButton(tbAllFalse);
		this.bShow.onClick.set(this, "showClick");
		this.bTampil.onClick.set(this, "tampilClick");
		this.rearrangeChild(10,23);
		this.setTabChildIndex();
		try
		{
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			this.standarLib = new util_standar();
			
			this.lokkonsol = this.app._lokKonsol;					
		
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_saku_gaji_master_fHRtkbw.extend(window.portalui_childForm);
window.app_saku_gaji_master_fHRtkbw.implement({
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
	doModalResult: function(event, modalResult){
		switch (event)
		{
			case "clear" :
				if (modalResult == mrOk)
				{
					this.standarLib.clearByTag(this, new Array("0"),this.cb_mk);				
					setTipeButton(tbAllFalse);
				}
				break;
			case "simpan" :
				if (modalResult == mrOk)
				{
					if (this.standarLib.checkEmptyByTag(this, new Array("0","2")))
					{
						try
						{					
							uses("server_util_arrayList");
							sql = new server_util_arrayList();
							sql.add("insert into hr_tkbw (status, mk,gd, ty, tp, kode_lokasi, tgl_input, nik_user) values "+
									"('"+this.ed_status.getText()+"','"+this.cb_mk.getText()+"','"+parseNilai(this.ed_gd.getText())+"','"+parseNilai(this.ed_ty.getText())+"','"+parseNilai(this.ed_tp.getText())+"','"+this.app._lokasi+"', now(), '"+this.app._userLog+"') ");
							this.dbLib.execArraySQL(sql);	
						}
						catch(e)
						{
							system.alert(this, e,"");
						}
					}
				}
				break;
			case "ubah" :
				if (modalResult == mrOk)
				{
						uses("server_util_arrayList");					
						var sql = new server_util_arrayList();
						sql.add(" update hr_tkbw set  "+
								" gd ="+parseNilai(this.ed_gd.getText())+
								", ty ="+parseNilai(this.ed_ty.getText())+
								", tp ="+parseNilai(this.ed_tp.getText())+
								" where mk='"+this.cb_mk.getText()+"' and status = '"+this.ed_status.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						this.dbLib.execArraySQL(sql);	
				}
				break;
			case "hapus" :
			   if (modalResult == mrOk)
			   {
					uses("server_util_arrayList");					
						var sql = new server_util_arrayList();
						sql.add("delete from hr_tkbw where mk='"+this.cb_mk.getText()+"' and status = '"+this.ed_status.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						this.dbLib.execArraySQL(sql);	
			   }
				break;
		}
	},
	showClick: function(sender){	
		if (this.cb_mk.getText() != "")
		{
			try
			{
				uses("server_util_arrayMap");
				var data = this.dbLib.getDataProvider("select mk, gd, ty, tp "+
				                                "from hr_tkbw a "+
												"where mk = '"+this.cb_mk.getText()+"' and status = '"+this.ed_status.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data != "string"){
				  	if  (data.rs.rows[0] != undefined){
						this.ed_gd.setText(data.rs.rows[0].gd);
						this.ed_ty.setText(data.rs.rows[0].ty);
						this.ed_tp.setText(data.rs.rows[0].tp);
						setTipeButton(tbUbahHapus);
				  	}else{					
						this.ed_gd.setText("0");
				  		this.ed_ty.setText("0");
				  		this.ed_tp.setText("0");	  
					  	setTipeButton(tbSimpan);
					}
				}else{	
				  this.ed_gd.setText("0");
				  this.ed_ty.setText("0");
				  this.ed_tp.setText("0");
				  setTipeButton(tbSimpan);
				}
			}catch(e)
			{
				system.alert(this, e,"");
			}
		}
	},
	tampilClick: function(sender){
		this.sg1.clear();
		var temp = this.dbLib.getDataProvider("select mk, gd, ty, tp "+
		                             "from hr_tkbw a "+
									 "where kode_lokasi = '"+this.app._lokasi+"' and status = '"+this.ed_status.getText()+"' ",true);
			
		if (typeof temp!= "string"){
			this.sg1.clear();
			var line;
			for (var i in temp.rs.rows){
				line = temp.rs.rows[i];
				this.sg1.appendData([line.mk, floatToNilai(line.gd), floatToNilai(line.ty), floatToNilai(line.tp)]);
			}
		}else alert(rs);
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib)
		{
			switch	(methodName)
			{
				case "execArraySQL" :
					if (result.toLowerCase().search("error") == -1)					
		            {
		              this.app._mainForm.pesan(2,"Transaksi Sukses");
		              this.app._mainForm.bClear.click();              
		            }else
				   	     system.info(this, result,"");
					break;
			}
		}
	},
	doChange: function(sender){
		if (sender == this.ed_status || sender == this.cb_mk){
			this.showClick();			
		}
	}
});
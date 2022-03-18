/**
 * @author dweexfuad
 */
window.app_budget_transaksi_fKunjCc = function(owner)
{
	if (owner)
	{
		window.app_budget_transaksi_fKunjCc.prototype.parent.constructor.call(this,owner);
		this.className  = "app_budget_transaksi_fKunjCc";
		this.setTop(60);
		this.setWidth(1280);
		this.setHeight(550);
		this.itemsValue = new portalui_arrayList();
		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Claim Cost", 0);	
		
//------------------------------------------------------------------------
		try{
			uses("portalui_saiCBBL;util_standar;portalui_datePicker");
			this.ed_lokasi = new portalui_saiCBBL(this,{bound:[20,20,185,20],caption:"Lokasi",text:this.app._lokasi,rightLabelCaption:this.app._namalokasi,btnVisible:false,readOnly:true});
			this.ed_period = new portalui_saiLabelEdit(this,{bound:[20,21,182,20],caption:"Periode",readOnly:true});		
			this.lblTgl1 = new portalui_label(this,{bound:[20,22,101,18],caption:"Tanggal",underline:true});						
			this.dp_tgl1 = new portalui_datePicker(this,{bound:[120,22,82,18], selectDate:[this,"doSelectDate"]});		
			this.ed_nb = new portalui_saiLabelEdit(this,{bound:[20,23,230,20],caption:"No Bukti", readOnly:true});					
			this.bGen = new portalui_button(this,{bound:[256,23,80,20],caption:"Gen",icon:"url(icon/"+system.getThemes()+"/process.png)",click:[this,"doClick"]});		   		
			this.ed_ket = new portalui_saiLabelEdit(this,{bound:[20,24,500,20],caption:"Keterangan",maxLength:150});						
			this.cb_setuju = new portalui_saiCBBL(this,{bound:[20,25,185, 20],caption:"Dibuat",readOnly:true,btnClick:[this,"doFindBtnClick"]});						
			this.bTampil = new portalui_button(this,{bound:[729,25,80,18],caption:"Tampil",click:[this,"doTampilClick"]});		
			this.p1 = new portalui_panel(this,{bound:[10,26,800,323],caption:"Daftar"});
			this.sg1 = new portalui_saiGrid(this.p1,{bound:[0,20,800,280]});		
			this.sgn = new portalui_sgNavigator(this.p1,{bound:[0,300,800,25],buttonStyle:3, grid:this.sg1, pager:[this,"doPager"]});		

			this.rearrangeChild(10,23);
			setTipeButton(tbSimpan);
			this.maximize();		
			this.setTabChildIndex();				
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			this.standarLib = new util_standar();					
			this.ed_lokasi.setText(this.app._lokasi);
			var lokasi = (this.app._userStatus == "A" ? "%" : this.app._lokasi);				
			this.ed_lokasi.setSQL("select kode_lokasi, nama from lokasi where kode_lokasi like '"+lokasi+"' ",["kode_lokasi","nama"],undefined,["Kode","Nama"],"and","Data Lokasi");			
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_budget_transaksi_fKunjCc.extend(window.portalui_childForm);
//------------------------------------------------------------------ event
window.app_budget_transaksi_fKunjCc.implement({
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
		if (modalResult != mrOk) return;
		try{
			var status  = this.cb1.isSelected() ? '1': '0';
			switch (event)
			{
				case "clear" :
																	
					break;
				case "simpan" :
											break;
				case "ubah" :					
										break;
				case "hapus" :
				    					break;
			}
			
		}catch(e){
			system.alert(this, e,"");
		}
	},
	keyPress: function(sender, charCode, buttonState ){
	},
	doEditChange: function(sender){
		
	},	
	doTampilClick: function(sender){
		try{			
			var temp = this.dbLib.runSQL("SELECT a.kode_kunj,a.kode_param,b.nama, a.jml_nik as jml_nik_tpkk, a.jml_pas as jml_pas_tpkk, a.jml_anak as jml_anak_tpkk, a.jml_nik1 as jml_nik_tpku, a.jml_pas1 as jml_pas_tpku, a.jml_anak1 as jml_anak_tpku, "+
										"	   a.jml_nik2 as jml_nik_luar, a.jml_pas2 as jml_pas_luar, a.jml_anak2 as jml_pas_luar, a.nilai_nik as nilai_nik_tpkk, a.nilai_pas as nilai_pas_tpkk, a.nilai_anak as nilai_pas_anak, a.nilai_nik1 as nilai_nik_tpku, "+
										"	   a.nilai_pas1 as nilai_pas_tpku, a.nilai_anak1 as nilai_anak_tpku, a.nilai_nik2 as nilai_nik_lain, a.nilai_pas2 as nilai_pas_lain, a.nilai_anak2 as nilai_anak_lain "+
										"FROM agg_kunj_cc_d a "+
										"inner join agg_kunj_param b on a.kode_param=b.kode_param ");
			if (temp instanceof portalui_arrayMap) {
				this.sg1.setData(temp,true,20);
				this.sgn.setTotalPage(this.sg1.pageCount);				
				this.sgn.rearrange();
				this.sgn.activePage = 0;
			}else systemAPI.alert(temp);
			
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doPager: function(sender, page){
		this.sg1.selectPage(page);
	
	},
	doRequestReady: function(sender, methodName, result){	
		if (sender == this.dbLib)
		{
			switch	(methodName)
			{
				case "execArraySQL" :
					if (result.toLowerCase().search("error") == -1)
						this.app._mainForm.pesan(2,"Transaksi Sukses ("+ this.e0.getText()+")");
					else this.app._mainForm.pesan(0, result); 
					break;
			}
		}
	}
});
window.app_mede_transaksi_fJustifikasi = function(owner){
	if (owner){
		window.app_mede_transaksi_fJustifikasi.prototype.parent.constructor.call(this,owner);
		this.className  = "app_mede_transaksi_fJustifikasi";
		this.maximize();
		this.itemsValue = new portalui_arrayList();	
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Justifikasi: Input", 0);	
		
		this.ed_period = new portalui_saiLabelEdit(this,{bound:[20,20,180,20],caption:"Periode",readOnly:true});
		this.lTgl = new portalui_label(this,{bound:[20,31,100,20],caption:"Tanggal"});
		uses("portalui_datePicker;portalui_richTextArea;portalui_saiMemo");
		this.dp_tgl = new portalui_datePicker(this,{bound:[120,31,80,18]});
		this.ed_no = new portalui_saiLabelEdit(this,{bound:[20,32,200,20],caption:"No Justifikasi", readOnly:true});
		this.b_gen = new portalui_button(this,{bound:[230,32,80,18],caption:"Gen", click:[this,"doClick"]});
		this.cb_pr = new portalui_saiCBBL(this,{bound:[20,33,300,20],caption:"No PR",readOnly:true, btnClick:[this,"FindBtnClick"]});
		this.ed_dok = new portalui_saiLabelEdit(this,{bound:[20,34,300,20],caption:"Dokumen Ref"});
		this.ed_desc = new portalui_saiMemo(this,{bound:[20,35,500,50],caption:"Kegiatan"});
		this.cb_buat = new portalui_saiCBBL(this,{bound:[20,36,300,20],caption:"Dibuat Oleh"});
		this.cb_setuju = new portalui_saiCBBL(this,{bound:[20,37,300,20],caption:"Disetujui Oleh"});
		this.p1 = new portalui_panel(this,{bound:[20,38,800,100],caption:"Content"});
		this.ta_content = new portalui_richTextArea(this.p1,{bound:[1,20,798,this.p1.height - 20]});
		this.rearrangeChild(10,23);
		this.p1.setHeight(this.height - this.p1.top - 10);
		this.ta_content.setHeight(this.p1.height - 20);
		this.standarLib = new util_standar();
		this.dbLib = new util_dbLib();
		this.dbLib.addListener(this);
	}
};
window.app_mede_transaksi_fJustifikasi.extend(window.portalui_childForm);
window.app_mede_transaksi_fJustifikasi.implement({
	doClick: function(sender){
		if (this.ed_period.getText() != "")
		{
			this.ed_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'doc_justifikasi','no_ver',this.app._lokasi+"-VPR"+this.ed_period.getText().substr(2,4)+".",'0000'));
			this.ed_desc.setFocus();
		}
	},
	mainButtonClick:function(sender){
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
		if (modalResult != mrOk) return false;		
		switch (event)
		{
			case "clear" :
			break;
			case "simpan":
			break;
			case "ubah":
			break;
		}			
	}
});
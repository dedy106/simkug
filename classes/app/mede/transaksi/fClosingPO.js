window.app_mede_transaksi_fClosingPO = function(owner){
	if (owner){
		window.app_mede_transaksi_fClosingPO.prototype.parent.constructor.call(this,owner);
		this.className  = "app_mede_transaksi_fClosingPO";
		this.maximize();
		this.itemsValue = new portalui_arrayList();	
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Closing PO: Input", 0);			
		this.ed_period = new portalui_saiLabelEdit(this,{bound:[20,20,180,20],caption:"Periode",readOnly:true});
		this.lTgl = new portalui_label(this,{bound:[20,31,100,20],caption:"Tanggal",underline:true});
		uses("portalui_datePicker;portalui_saiGrid;portalui_saiCBBL;util_file;portalui_sgNavigator");
		this.dp_tgl = new portalui_datePicker(this,{bound:[120,31,80,18]});
		this.ed_no = new portalui_saiLabelEdit(this,{bound:[20,32,200,20],caption:"No Bukti", readOnly:true});
		this.b_gen = new portalui_button(this,{bound:[230,32,80,18],caption:"Gen", click:[this,"doClick"]});
		this.ed_desc = new portalui_saiLabelEdit(this,{bound:[20,35,500,20],caption:"Kegiatan"});				
		this.cb_po = new portalui_saiCBBL(this,{bound:[20,36,200,20],caption:"No PO", btnClick:[this,"FindBtnClick"]});
		
		this.p1 = new portalui_panel(this,{bound:[20,38,900,250],caption:"Data Lampiran PO"});
		this.sg1 = new portalui_saiGrid(this.p1,{bound:[1,20,898,200],colCount:3,colTitle:["Upload","Lampiran","Keterangan"],
			colWidth:[[2,1,0],[300,300,100]],colReadOnly:[true,[1],[]],colFormat:[[0],[cfUpload]],
			picklist:[[0],[new portalui_arrayMap({items:["CLOSE","INPROG"]})]], change:[this,"doGridChange"]});										
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[1,225,898,25], buttonStyle:1, grid:this.sg1});
		this.rearrangeChild(10,23);		
		this.standarLib = new util_standar();
		this.dbLib = new util_dbLib();
		this.dbLib.addListener(this);		
		this.sg1.setUploadParam([0],"uploadTo","classes/app/mede/document/","","");
		this.sg1.clear(1);
		this.onClose.set(this,"doClose");
		this.fileUtil = new util_file();
		this.rootDir = this.fileUtil.getRootDir();
		this.rootDir = this.rootDir.substr(0,this.rootDir.search("server")-1);			
	}
};
window.app_mede_transaksi_fClosingPO.extend(window.portalui_childForm);
window.app_mede_transaksi_fClosingPO.implement({
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
	},
	doGridChange: function(sender, col, row, filename, result, data){		
		if (col == 0){
			if (data != this.sg1.rows.get(row).dataAfterUpload[col]){
				this.fileUtil.deleteFile(this.rootDir+"/classes/app/mede/document/"+this.sg1.rows.get(row).dataAfterUpload[col]);
			}
				
			this.sg1.cells(1, row, data);
		}
	},
	doClose: function(){
		for (var i=0;i < this.sg1.rows.getLength();i++){						
			this.fileUtil.deleteFile(this.rootDir+"/classes/app/mede/document/"+this.sg1.rows.get(i).dataAfterUpload[0]);		
		}
	}
});
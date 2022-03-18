window.app_mede_transaksi_fPJP = function(owner)
{
	if (owner)
	{
		window.app_mede_transaksi_fPJP.prototype.parent.constructor.call(this,owner);
		this.className  = "app_mede_transaksi_fPJP";
		this.maximize();
		this.itemsValue = new portalui_arrayList();	
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Pertanggungjawaban Pengeluaran: Input", 0);	
		
		uses("portalui_datePicker;portalui_saiGrid;portalui_saiCBBL;util_addOnLib;app_saku_fJurnalViewer");
		this.ed_periode = new portalui_saiLabelEdit(this,{bound:[20,10,200,20],caption:"Periode",readOnly:true});		
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal",underline:true});
		this.dp_tgl = new portalui_datePicker(this,{bound:[120,11,80,18]});
		this.ed_no = new portalui_saiLabelEdit(this,{bound:[20,12,200,20],caption:"No Bukti",readOnly:true});
		this.b_gen = new portalui_button(this,{bound:[230,12,80,20],caption:"Generate"});
		this.e_ket = new portalui_saiLabelEdit(this,{bound:[20,13,500,20],caption:"Keterangan"});
		this.cb_dok = new portalui_saiCBBL(this,{bound:[20,16,200,20],caption:"No Dokumen Ref.",btnClick:[this,"FindBtnClick"]});
		this.cb_nik = new portalui_saiCBBL(this,{bound:[20,14,200,20],caption:"NIK Pembuat",btnClick:[this,"FindBtnClick"]});
		this.ed_jabatan = new portalui_saiLabelEdit(this,{bound:[20,15,200,20],caption:"Jabatan",readOnly:true});
		
		this.p1 = new portalui_panel(this,{bound:[20,16,800,300],caption:"Data Jurnal"});
		this.sg1 = new portalui_saiGrid(this.p1,{bound:[1,20,798,250],colCount:8,colTitle:["Kode Akun","Nama","Kode DRK","Nama DRK","Cost Center","Nama Cost Center","Uraian","Nilai"],
                   colWidth:[[7,6,5,4,3,2,1,0],[80,200,150,80,150,80,150,80]],
                   colFormat:[[7],[cfNilai]], buttonStyle:[[0,2,4],[bsEllips,bsEllips,bsEllips]]});
        this.sgn = new portalui_sgNavigator(this.p1,{bound:[1,270,798,29],buttonStyle:1,grid:this.sg1});
        this.rearrangeChild(10,23);
        setTipeButton(tbSimpan);
        this.dbLib = new util_dbLib();
        this.dbLib.addListener();
        this.sg1.appendRow();
	}
};
window.app_mede_transaksi_fPJP.extend(window.portalui_childForm);
window.app_mede_transaksi_fPJP.implement({});

window.app_mede_transaksi_fAppTreas = function(owner)
{
	if (owner)
	{
		window.app_mede_transaksi_fAppTreas.prototype.parent.constructor.call(this,owner);
		this.className  = "app_mede_transaksi_fAppTreas";
		this.maximize();
		this.itemsValue = new portalui_arrayList();	
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Approval Treasury: Input", 0);	
		
		this.ed_period = new portalui_saiLabelEdit(this,{bound:[20,10,182,20],caption:"Periode",readOnly:true});
		this.lblTgl1 = new portalui_label(this,{bound:[20,32,101,18],caption:"Tanggal",underline:true});
		uses("portalui_datePicker;portalui_saiGrid;portalui_saiTable;portalui_sgNavigator;util_standar;util_addOnLib");	
		this.dp_tgl1 = new portalui_datePicker(this,{bound:[120,32,82,18]});		
		this.ed_nb = new portalui_saiLabelEdit(this,{bound:[20,56,220,20],caption:"No Verifikasi",readOnly:true});
		this.bGen = new portalui_button(this,{bound:[246,56,80,20],caption:"Gen",icon:"url(icon/"+system.getThemes()+"/process.png)"});
		this.ed_desc = new portalui_saiLabelEdit(this,{bound:[20,78,500,20],caption:"Deskripsi",maxLength:150});
		this.cb_pembuat = new portalui_saiCBBL(this,{bound:[20,100,185,20],caption:"Dibuat Oleh",readOnly:true});
		this.cb_setuju = new portalui_saiCBBL(this,{bound:[20,122,185,20],caption:"Disetujui Oleh", readOnly:true});
		this.bShow = new portalui_button(this,{bound:[450,122,80,20],caption:"Tampil"});
		this.bPAll = new portalui_button(this,{bound:[536,122,80,20],caption:"APP All",icon:"url(icon/"+system.getThemes()+"/process.png)"});		
		this.p1 = new portalui_panel(this,{bound:[20,144,900,330],caption:"Daftar Dokumen Purchase Order"});		
		this.sg1 = new portalui_saiGrid(this.p1,{bound:[1,20,895,165],colCount:12,colTitle:["Status","Catatan","No Invoice","No Dokumen","Vendor","Tgl Mulai","Tgl Selesai","Deskripsi","Currency","Nilai","PPN","Pnj"],
			colWidth:[[11,10,9,8,7,6,5,4,3,2,1,0],[100,100,100,60,200,80,80,100,100,100,200,60]],
			colReadOnly:[true,[2,3,4,5,6,7,8,9,10,11],[]],buttonStyle:[[0],[bsAuto]],colFormat:[[9,10],[cfNilai]]});						
		this.sg1.columns.get(0).setPicklist(new portalui_arrayMap({items:["APP","NONAPP","INPROG"]}))		
		this.sg2 = new portalui_saiTable(this.p1,{bound:[1,190,895,135],tag:2,colTitle:["No","Kode Akun","Nama Akun","Kode Brg","Nama Brg","Satuan","Qty","Nilai","Sub Ttl"]});
		this.rearrangeChild(10,23);
		this.sgNav =  new portalui_sgNavigator(this,{bound:[623,this.bShow.top,297,25],border:0,buttonStyle:3});
		setTipeButton(tbSimpan);
		this.setTabChildIndex();
		try
		{
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);			
			this.standarLib = new util_standar();						
			this.addOnLib=new util_addOnLib();
		
			this.ed_period.onChange.set(this, "doEditChange");
			this.dp_tgl1.onSelect.set(this, "doSelect");
			this.cb_pembuat.onChange.set(this, "doEditChange");
			this.cb_pembuat.onBtnClick.set(this, "FindBtnClick");
			this.cb_setuju.onChange.set(this, "doEditChange");
			this.cb_setuju.onBtnClick.set(this, "FindBtnClick");
			this.bPAll.onClick.set(this, "pAllClick");
			this.sg1.onDblClick.set(this,"sg1ondblclick");
			this.sgNav.onPager.set(this, "doSelectedPage");
			this.bGen.onClick.set(this, "genClick");
			this.bShow.onClick.set(this, "showClick");
			
			this.standarLib.clearByTag(this, new Array("0"),this.dp_tgl1);							
			this.sg1.clear(1); this.sg2.clearAll();
			this.baris = this.app._baris;
			
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_mede_transaksi_fAppTreas.extend(window.portalui_childForm);
window.app_mede_transaksi_fAppTreas.implement({});

window.app_mede_transaksi_fPoTrisha = function(owner)
{
	if (owner)
	{
		window.app_mede_transaksi_fPoTrisha.prototype.parent.constructor.call(this,owner);
		this.className  = "app_mede_transaksi_fPoTrisha";
		this.maximize();
		this.itemsValue = new portalui_arrayList();	
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Purchase Order: Input", 0);	
		
		this.ed_period = new portalui_saiLabelEdit(this,{bound:[20,10,182,20],caption:"Periode",readOnly:true, tag:9});
		this.lblTgl1 = new portalui_label(this,{bound:[20,32,101,20],caption:"Tanggal",underline:true});			
		uses("portalui_datePicker;portalui_saiGrid;portalui_sgNavigator;util_standar;util_addOnLib;app_saku_fJurnalViewer");	
		this.dp_tgl1 = new portalui_datePicker(this,{bound:[120, 34, 82,18]});
		this.ed_nb = new portalui_saiLabelEdit(this,{bound:[20,56,230,20],caption:"No PO",readOnly:true});
		this.bGen = new portalui_button(this,{bound:[256,56, 80,20],caption:"Gen",icon:"url(icon/"+system.getThemes()+"/process.png)"});
		this.ed_dok = new portalui_saiLabelEdit(this,{bound:[20,78, 310, 20],caption:"No Dok. Kontrak",maxLength:50});
		this.ed_desc = new portalui_saiLabelEdit(this,{bound:[20,100,500,20],caption:"Deskripsi",maxLength:150});
		this.cb_curr = new portalui_saiCBBL(this,{bound:[20,122,185,20],caption:"Currency dan Kurs",readOnly:true, rightLabelVisible:false});
		this.ed_kurs = new portalui_saiLabelEdit(this,{bound:[205,122, 45, 20],labelWidth:0,tipeText:ttNilai, alignment:alRight, readOnly:true});
		this.cb_vendor = new portalui_saiCBBL(this,{bound:[20,144, 185, 20],caption:"Vendor",readOnly:true});
		this.cb_pembuat = new portalui_saiCBBL(this,{bound:[20,166,185, 20],caption:"Penanggung Jawab", readOnly:true});
		this.lbltgl2 = new portalui_label(this,{bound:[20,188, 101, 20],caption:"Tanggal Mulai",underline:true});		
		this.dp_tgl2 = new portalui_datePicker(this,{bound:[120,190,82,18]});
		this.lbltgl3 = new portalui_label(this,{bound:[250,188, 101, 20],caption:"Tanggal Selesai",underline:true});		
		this.dp_tgl3 = new portalui_datePicker(this,{bound:[350,190,82,18]});
		this.ed_denda = new portalui_saiLabelEdit(this,{bound:[680,144,220,20],tipeText:ttNilai, caption:"% Denda/1000",alignment:alRight,text:"0"});
		this.ed_ppn = new portalui_saiLabelEdit(this,{bound:[680,166,220,20],caption:"Nilai PPN",tipeText:ttNilai, alignment:alRight,text:"0"});		
		this.ed_nilai = new portalui_saiLabelEdit(this,{bound:[680,188,220,20],caption:"Nilai PO",tipeText:ttNilai, alignment:alRight,text:"0", readOnly:true});		
		this.bGar = new portalui_imageButton(this,{bound:[900,188,22,22],hint:"Hitung Anggaran",image:"icon/"+system.getThemes()+"/tabCont2.png"});		
		this.p1 = new portalui_panel(this,{bound:[20,210,900,260],caption:"Daftar Item Barang"});		
		this.sg1 = new portalui_saiGrid(this.p1,{bound:[1,20,895,210],colCount:12,colTitle:["No PR","RKM","Keterangan","Satuan","Kode Akun","Qty","Harga","SubTotal","Kode PP","Kode RKM","Harga PR","Periode PR"],
			colWidth:[[11,10,9,8,7,6,5,4,3,2,1,0],[60,100,60,60,100,100,50,80,50,200,80,110]],buttonStyle:[[0],[bsEllips]],colReadOnly:[true,[1,3,4,5,7,8,9,10,11],[]],
			colFormat:[[5,6,7,10],[cfNilai,cfNilai, cfNilai, cfNilai]]});		
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[1,234,899,25],buttonStyle:2,grid:this.sg1});
		setTipeButton(tbSimpan);
		this.setTabChildIndex();
		try
		{
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);			
			this.standarLib = new util_standar();						
			this.addOnLib = new util_addOnLib();			
			this.jurnal = new app_saku_fJurnalViewer(this.app);
			this.jurnal.sg.setColTitle(["Kode Akun","Kode PP","Kode RKM","Periode","Nilai","Saldo Anggaran"]);
			this.jurnal.p.setCaption('Data Anggaran');
		
			this.ed_period.onChange.set(this, "doEditChange");
			this.dp_tgl1.onSelect.set(this, "doSelect");
			this.bGen.onClick.set(this, "genClick");
			this.bGar.onClick.set(this, "garClick");
			this.ed_nilai.onChange.set(this, "doEditChange");
			this.cb_curr.onChange.set(this, "doEditChange");
			this.cb_curr.onBtnClick.set(this, "FindBtnClick");
			this.cb_vendor.onBtnClick.set(this, "FindBtnClick");
			this.cb_pembuat.onBtnClick.set(this, "FindBtnClick");
			//this.ed_dok.onBtnClick.set(this, "FindBtnClick");
			
			this.sg1.onEllipsClick.set(this, "doFindBtnClick");
			this.sg1.onNilaiChange.set(this, "doNilaiChange");
			this.sg1.onCellExit.set(this, "doCellExit");
			
			this.standarLib.clearByTag(this, [0,9],this.dp_tgl1);			
			this.sg1.clear(1);
			this.cb_curr.setText("IDR"); this.ed_kurs.setText("1");			
			var data = this.dbLib.runSQL("select value1 from spro where kode_spro = 'PPPNM' and kode_lokasi='"+this.app._lokasi+"'");
			var row = undefined;			
			row = data.get(0);
			if (row !== undefined)
				this.pppn = row.get("value1");
			this.ed_ppn.setText("0");
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_mede_transaksi_fPoTrisha.extend(window.portalui_childForm);
window.app_mede_transaksi_fPoTrisha.implement({});

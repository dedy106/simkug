window.app_saku3_transaksi_siaga_aset_fDataFa = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_siaga_aset_fDataFa.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_siaga_aset_fDataFa";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Data Aset", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;");	
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,600], childPage:["List Data","Data Aset","Cari Data"]});	
		this.sg1 = new saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:5,tag:9,
		colTitle:["Id Asset","Nama","Satuan","Jenis","Nilai"],
		colWidth:[[4,3,2,1,0],[100,100,300,200,100]],
		colFormat:[[4],[cfNilai]],
		readOnly:true,
		dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});

		
		this.cb_proyek = new saiCBBL(this.pc2.childPage[1],{bound:[20,10,220,20],caption:"Proyek", multiSelection:false, maxLength:10, tag:2, change:[this,"doChange"]});
		this.cb_pp = new saiCBBL(this.pc2.childPage[1],{bound:[20,11,220,20],caption:"PP", multiSelection:false, maxLength:10, tag:2, change:[this,"doChange"]});
		this.cb_subpp = new saiCBBL(this.pc2.childPage[1],{bound:[20,12,220,20],caption:"SubPP", multiSelection:false, maxLength:10, tag:2, change:[this,"doChange"]});

		this.cb_klplok = new saiCBBL(this.pc2.childPage[1],{bound:[20,10,220,20],caption:"Kelompok Lokasi", multiSelection:false, maxLength:10, tag:2, change:[this,"doChange"]});
		this.cb_lokasi = new saiCBBL(this.pc2.childPage[1],{bound:[20,11,220,20],caption:"Lokasi", multiSelection:false, maxLength:10, tag:2, change:[this,"doChange"]});
		this.cb_sublok = new saiCBBL(this.pc2.childPage[1],{bound:[20,12,220,20],caption:"SubLokasi", multiSelection:false, maxLength:10, tag:2, change:[this,"doChange"]});

		this.cb_kateg = new saiCBBL(this.pc2.childPage[1],{bound:[20,10,220,20],caption:"Kategori Aktiva", multiSelection:false, maxLength:10, tag:2, change:[this,"doChange"]});
		this.cb_subkateg = new saiCBBL(this.pc2.childPage[1],{bound:[20,11,220,20],caption:"SubKategori Aktiva", multiSelection:false, maxLength:10, tag:2, change:[this,"doChange"]});
		this.cb_klpaset = new saiCBBL(this.pc2.childPage[1],{bound:[20,12,220,20],caption:"Kelompok Aktiva", multiSelection:false, maxLength:10, tag:2, change:[this,"doChange"]});

		this.e_id = new portalui_saiLabelEdit(this.pc2.childPage[1],{bound:[20,42,300,20],caption:"ID Aset",tag:1,change:[this,"doChange"]}); //readOnly:true,				
		this.i_gen = new portalui_imageButton(this.pc2.childPage[1],{bound:[320,42,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});		

		
		this.e_npko = new portalui_saiLabelEdit(this.pc2.childPage[1],{bound:[20,13,350,20],caption:"No NPKO",maxLength:50,tag:1});				
		this.c_jenis = new saiCB(this.pc2.childPage[1],{bound:[20,14,200,20],caption:"Jenis",items:["COD","PO","SPK","KONTRAK"], readOnly:true,tag:2});
		this.e_dasar = new portalui_saiLabelEdit(this.pc2.childPage[1],{bound:[20,15,500,20],caption:"Dasar Pengadaan",maxLength:200,tag:1});				
		this.e_jml = new saiLabelEdit(this.pc2.childPage[1],{bound:[20,16,200,20],caption:"Jumlah", tag:1, tipeText:ttNilai, text:"0"});		
		this.c_sat = new saiCB(this.pc2.childPage[1],{bound:[20,17,200,20],caption:"Satuan",items:["Unit","Buah","Set"], readOnly:true,tag:2});
		this.e_nama = new portalui_saiLabelEdit(this.pc2.childPage[1],{bound:[20,18,500,20],caption:"Nama Aktiva",maxLength:200,tag:1});				
		this.e_nobukti = new portalui_saiLabelEdit(this.pc2.childPage[1],{bound:[20,19,350,20],caption:"No Bukti Akuntansi",maxLength:100,tag:1});				
		this.e_noseri = new portalui_saiLabelEdit(this.pc2.childPage[1],{bound:[20,20,350,20],caption:"Serial Number",maxLength:100,tag:1});				
		this.e_lokasi = new portalui_saiLabelEdit(this.pc2.childPage[1],{bound:[20,21,350,20],caption:"Lokasi Aktual",maxLength:100,tag:1});				
		this.e_spek = new portalui_saiLabelEdit(this.pc2.childPage[1],{bound:[20,22,500,20],caption:"Spesifikasi Teknik",maxLength:200,tag:1});				
		this.cb_vendor = new saiCBBL(this.pc2.childPage[1],{bound:[20,23,220,20],caption:"Vendor", multiSelection:false, maxLength:10, tag:2});
		this.c_status = new saiCB(this.pc2.childPage[1],{bound:[20,24,200,20],caption:"Status",items:["Berfungsi","Tidak Layak Pakai","Rusak"], readOnly:true,tag:2});
		this.e_garansi = new saiLabelEdit(this.pc2.childPage[1],{bound:[20,25,200,20],caption:"Garansi [Bulan]", tag:1, tipeText:ttNilai, text:"0"});		
		this.e_pnj = new portalui_saiLabelEdit(this.pc2.childPage[1],{bound:[20,26,350,20],caption:"Penanggungjawab",maxLength:50,tag:1});				
		this.c_curr = new saiCB(this.pc2.childPage[1],{bound:[20,27,200,20],caption:"Currency",readOnly:true,tag:2});
		this.e_nilai = new saiLabelEdit(this.pc2.childPage[1],{bound:[20,28,200,20],caption:"Nilai Perolehan", tag:1, tipeText:ttNilai, text:"0"});		
		this.e_kurs = new saiLabelEdit(this.pc2.childPage[1],{bound:[20,29,200,20],caption:"Kurs", tag:1, tipeText:ttNilai, text:"1"});		
		this.l_tgl1 = new portalui_label(this.pc2.childPage[1],{bound:[20,30,100,18],caption:"Tgl Perolehan", underline:true});
		this.dp_d1 = new portalui_datePicker(this.pc2.childPage[1],{bound:[120,30,98,18]}); 		
		this.e_ket = new portalui_saiLabelEdit(this.pc2.childPage[1],{bound:[20,32,500,20],caption:"Keterangan",maxLength:200,tag:1});	
		
		
		this.cb_proyek2 = new saiCBBL(this.pc2.childPage[2],{bound:[20,10,220,20],caption:"Proyek", multiSelection:false, maxLength:10, tag:9, change:[this,"doChange"]});
		this.cb_pp2 = new saiCBBL(this.pc2.childPage[2],{bound:[20,11,220,20],caption:"PP", multiSelection:false, maxLength:10, tag:9, change:[this,"doChange"]});
		this.cb_subpp2 = new saiCBBL(this.pc2.childPage[2],{bound:[20,12,220,20],caption:"SubPP", multiSelection:false, maxLength:10, tag:9, change:[this,"doChange"]});

		this.cb_klplok2 = new saiCBBL(this.pc2.childPage[2],{bound:[20,10,220,20],caption:"Kelompok Lokasi", multiSelection:false, maxLength:10, tag:9, change:[this,"doChange"]});
		this.cb_lokasi2 = new saiCBBL(this.pc2.childPage[2],{bound:[20,11,220,20],caption:"Lokasi", multiSelection:false, maxLength:10, tag:9, change:[this,"doChange"]});
		this.cb_sublok2 = new saiCBBL(this.pc2.childPage[2],{bound:[20,12,220,20],caption:"SubLokasi", multiSelection:false, maxLength:10, tag:9, change:[this,"doChange"]});

		this.cb_kateg2 = new saiCBBL(this.pc2.childPage[2],{bound:[20,10,220,20],caption:"Kategori Aktiva", multiSelection:false, maxLength:10, tag:9, change:[this,"doChange"]});
		this.cb_subkateg2 = new saiCBBL(this.pc2.childPage[2],{bound:[20,11,220,20],caption:"SubKategori Aktiva", multiSelection:false, maxLength:10, tag:9, change:[this,"doChange"]});
		this.cb_klpaset2 = new saiCBBL(this.pc2.childPage[2],{bound:[20,12,220,20],caption:"Kelompok Aktiva", multiSelection:false, maxLength:10, tag:9, change:[this,"doChange"]});
		
		this.cb_id2 = new saiCBBL(this.pc2.childPage[2],{bound:[20,13,300,20],caption:"ID Aset", multiSelection:false, maxLength:10, tag:9});
		this.bCari = new button(this.pc2.childPage[2],{bound:[120,14,80,18],caption:"Cari Data",click:[this,"doCari"]});			

		this.rearrangeChild(10, 23);
		this.pc2.childPage[1].rearrangeChild(10, 23);	
		this.pc2.childPage[2].rearrangeChild(10, 23);	
		
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan = 1;
			
			this.cb_proyek.setSQL("select kode_proyek, nama from am_proyek where kode_lokasi='"+this.app._lokasi+"'",["kode_proyek","nama"],false,["Kode","Nama"],"where","Data Proyek",true);			
			this.cb_pp.setSQL("select kode_pp, nama from am_pp where kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"where","Data PP",true);			
			this.cb_klplok.setSQL("select kode_klp, nama from am_lokasi_klp where kode_lokasi='"+this.app._lokasi+"'",["kode_klp","nama"],false,["Kode","Nama"],"where","Data Kelompok Lokasi",true);			
			this.cb_kateg.setSQL("select kode_kateg, nama from am_kateg where kode_lokasi='"+this.app._lokasi+"'",["kode_kateg","nama"],false,["Kode","Nama"],"where","Data Kategori Aktiva",true);			


			this.cb_proyek2.setSQL("select kode_proyek, nama from am_proyek where kode_lokasi='"+this.app._lokasi+"'",["kode_proyek","nama"],false,["Kode","Nama"],"where","Data Proyek",true);			
			this.cb_pp2.setSQL("select kode_pp, nama from am_pp where kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"where","Data PP",true);			
			this.cb_klplok2.setSQL("select kode_klp, nama from am_lokasi_klp where kode_lokasi='"+this.app._lokasi+"'",["kode_klp","nama"],false,["Kode","Nama"],"where","Data Kelompok Lokasi",true);			
			this.cb_kateg2.setSQL("select kode_kateg, nama from am_kateg where kode_lokasi='"+this.app._lokasi+"'",["kode_kateg","nama"],false,["Kode","Nama"],"where","Data Kategori Aktiva",true);	

			this.cb_vendor.setSQL("select kode_vendor, nama from vendor where kode_lokasi='"+this.app._lokasi+"'",["kode_vendor","nama"],false,["Kode","Nama"],"where","Data Mitra",true);

			this.filterCari=" where kode_proyek LIKE '%' and kode_pp LIKE '%' and kode_subpp LIKE '%' and kode_klp LIKE '%' and kode_lokam LIKE '%' and kode_sublok LIKE '%' and kode_kateg LIKE '%' and kode_subkateg LIKE '%' and kode_klpbarang LIKE '%' ";

			this.cb_id2.setSQL("select id_aset, nama from am_aset "+this.filterCari,["id_aset","nama"],false,["Kode","Nama"],"where","Data Aktiva",true);				

			this.doLoad();

			this.c_curr.items.clear();
			var data = this.dbLib.getDataProvider("select kode_curr from curr",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.c_curr.addItem(i,line.kode_curr);
				}
			}

			var data = this.dbLib.getDataProvider("select substring(cast( year(getdate()) as varchar),3,2) as tahun",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.tahun = line.tahun;
			}
			this.cb_proyek.setFocus();
			//this.cb_id2.setSQL("select id_aset, nama from am_aset ",["id_aset","nama"],false,["ID","Nama"],"where","Data Aktiva",true);			

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_siaga_aset_fDataFa.extend(window.childForm);
window.app_saku3_transaksi_siaga_aset_fDataFa.implement({
	doCari : function() {			
		// if (this.cb_id2.getText()!="") {			
			// this.pc2.setActivePage(this.pc2.childPage[1]);		
			// this.stsSimpan = 0;
			// setTipeButton(tbUbahHapus);

			// this.e_id.setText(this.cb_id2.getText());			
		// }
		//else system.alert(this,"Filter tidak valid.","No Request dan No FA harus dipilih.");
		if (this.cb_id2.getText()!="") {			
			this.filterCari=this.filterCari+" and id_aset='"+this.cb_id2.getText()+"' ";
		}
		var strSQL="select * from am_aset "+this.filterCari;
		alert (strSQL);

		var data = this.dbLib.getDataProvider(strSQL,true);		
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn1.rearrange();
			this.doTampilData(1);
		} else this.sg1.clear(1);			
		this.pc2.setActivePage(this.pc2.childPage[0]);


	},
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
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					if (this.stsSimpan == 0) {
						sql.add("delete from am_aset where id_aset='"+this.e_id.getText()+"' ");
					}					
					sql.add("insert into am_aset(id_aset,kode_proyek,kode_pp,kode_subpp,kode_klp,kode_lokam,kode_sublok,kode_kateg,kode_subkateg,kode_klpbarang,no_npko,jenis,dasar,jumlah,satuan,nama,no_bukti,no_seri,lokasi,spek,kode_vendor,status,garansi,pnj,kode_curr,kurs,nilai,tgl_oleh,keterangan) values "+
							"('"+this.e_id.getText()+"','"+this.cb_proyek.getText()+"','"+this.cb_pp.getText()+"','"+this.cb_subpp.getText()+"','"+this.cb_klplok.getText()+"','"+this.cb_lokasi.getText()+"','"+this.cb_sublok.getText()+"','"+this.cb_kateg.getText()+"','"+this.cb_subkateg.getText()+"','"+this.cb_klpaset.getText()+"','"+this.e_npko.getText()+"','"+this.c_jenis.getText()+"','"+this.e_dasar.getText()+"',"+nilaiToFloat(this.e_jml.getText())+",'"+this.c_sat.getText()+"','"+this.e_nama.getText()+"','"+this.e_nobukti.getText()+"','"+this.e_noseri.getText()+"','"+this.e_lokasi.getText()+"','"+this.e_spek.getText()+"','"+this.cb_vendor.getText()+"','"+this.c_status.getText()+"',"+nilaiToFloat(this.e_garansi.getText())+",'"+this.e_pnj.getText()+"','"+this.c_curr.getText()+"',"+nilaiToFloat(this.e_kurs.getText())+","+nilaiToFloat(this.e_nilai.getText())+",'"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"')");														
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
					this.standarLib.clearByTag(this, new Array("0","1"),this.e_fa);
					this.stsSimpan=1;					
					setTipeButton(tbSimpan);
				break;
			case "simpan" :	
			case "ubah" :													
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;
			case "hapus" :									
				uses("server_util_arrayList");
				var sql = new server_util_arrayList();
				sql.add("delete from am_aset where id_aset='"+this.e_id.getText()+"' ");
				setTipeButton(tbAllFalse);	
				this.dbLib.execArraySQL(sql);
				
				break;
		}
	},	
	doClick:function(sender){		
		//this.e_id.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"am_aset","id_aset",this.app._lokasi+"-AT"+this.tahun+".","00000"));
		
		if (sender == this.i_gen && this.cb_proyek.getText()!="" && this.cb_pp.getText()!="" && this.cb_subpp.getText()!="" && this.cb_klplok.getText()!="" && this.cb_lokasi.getText()!="" && this.cb_sublok.getText()!="" && this.cb_kateg.getText()!="" && this.cb_subkateg.getText()!="" && this.cb_klpaset.getText()!="" ){
			var AddFormat=this.cb_proyek.getText()+"."+this.cb_pp.getText()+""+this.cb_subpp.getText()+"."+this.cb_klplok.getText()+"."+this.cb_lokasi.getText()+"-"+this.cb_sublok.getText()+"."+this.cb_kateg.getText()+""+this.cb_subkateg.getText()+""+this.cb_klpaset.getText();

			this.e_id.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"am_aset","id_aset",AddFormat+".","000"));
		
		}
		
		setTipeButton(tbSimpan);						
	},
	doChange:function(sender){	
		if (sender == this.cb_pp && this.cb_pp.getText()!=""){
			this.cb_subpp.setSQL("select kode_subpp, nama from am_subpp where kode_pp='"+this.cb_pp.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["kode_subpp","nama"],false,["Kode","Nama"],"where","Data SubPP",true);				
		}
		if (sender == this.cb_klplok && this.cb_klplok.getText()!=""){
			this.cb_lokasi.setSQL("select kode_lokam, nama from am_lokasi where kode_klp='"+this.cb_klplok.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["kode_lokam","nama"],false,["Kode","Nama"],"where","Data Lokasi",true);				
		}
		if ((sender == this.cb_subpp || sender == this.cb_lokasi) && this.cb_lokasi.getText()!="" && this.cb_subpp.getText()!=""){
			this.cb_sublok.setSQL("select kode_sublok, nama from am_sublok where kode_subpp='"+this.cb_subpp.getText()+"' and kode_lokam='"+this.cb_lokasi.getText()+"' and kode_pp='"+this.cb_pp.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["kode_sublok","nama"],false,["Kode","Nama"],"where","Data Lokasi",true);				
		}

		if (sender == this.cb_kateg && this.cb_kateg.getText()!=""){
			this.cb_subkateg.setSQL("select kode_subkateg, nama from am_subkateg where kode_kateg='"+this.cb_kateg.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["kode_subkateg","nama"],false,["Kode","Nama"],"where","Data Sub Kategori",true);				
		}
		if (sender == this.cb_subkateg && this.cb_subkateg.getText()!=""){
			this.cb_klpaset.setSQL("select kode_klpbarang, nama from am_klpbarang where kode_subkateg='"+this.cb_subkateg.getText()+"' and kode_kateg='"+this.cb_kateg.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["kode_klpbarang","nama"],false,["Kode","Nama"],"where","Data Kelompok Aktiva",true);				
		}	
		if (sender == this.e_id && this.e_id.getText()!="") {
			var strSQL = "select * from am_aset where id_aset='"+this.e_id.getText()+"'";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
					this.cb_proyek.setText(line.kode_proyek);
					this.cb_pp.setText(line.kode_pp);
					this.cb_subpp.setText(line.kode_subpp);
			
					this.cb_klplok.setText(line.kode_klp);
					this.cb_lokasi.setText(line.kode_lokam);
					this.cb_sublok.setText(line.kode_sublok);
			
					this.cb_kateg.setText(line.kode_kateg);
					this.cb_subkateg.setText(line.kode_subkateg);
					this.cb_klpaset.setText(line.kode_klpbarang);
			
					this.e_npko.setText(line.no_npko);
					this.c_jenis.setText(line.jenis);
					this.e_dasar.setText(line.dasar);
					this.e_jml.setText(floatToNilai(line.jumlah));
					this.c_sat.setText(line.satuan);
					this.e_nama.setText(line.nama);
					this.e_nobukti.setText(line.no_bukti);
					this.e_noseri.setText(line.no_seri);
					this.e_lokasi.setText(line.lokasi);
					this.e_spek.setText(line.spek);
					this.cb_vendor.setText(line.kode_vendor);
					this.c_status.setText(line.status);
					this.e_garansi.setText(floatToNilai(line.garansi));
					this.e_pnj.setText(line.pnj);
					this.c_curr.setText(line.kode_curr);
					this.e_nilai.setText(floatToNilai(line.nilai));
					this.e_kurs.setText(floatToNilai(line.kurs));
					this.dp_d1.setText(line.tgl_oleh);
					this.e_ket.setText(line.keterangan);	
					
					this.stsSimpan = 0;
					setTipeButton(tbUbahHapus);
				} 
				else {
					this.stsSimpan = 1;
					setTipeButton(tbSimpan);
				}
			} 			
		}
		
		if (sender == this.cb_pp2 && this.cb_pp2.getText()!=""){
			this.cb_subpp2.setSQL("select kode_subpp, nama from am_subpp where kode_pp='"+this.cb_pp2.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["kode_subpp","nama"],false,["Kode","Nama"],"where","Data SubPP",true);					
		}
		if (sender == this.cb_klplok2 && this.cb_klplok2.getText()!=""){
			this.cb_lokasi2.setSQL("select kode_lokam, nama from am_lokasi where kode_klp='"+this.cb_klplok2.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["kode_lokam","nama"],false,["Kode","Nama"],"where","Data Lokasi",true);					

		}
		if ((sender == this.cb_subpp2 || sender == this.cb_lokasi2) && this.cb_lokasi2.getText()!="" && this.cb_subpp2.getText()!=""){
			this.cb_sublok2.setSQL("select kode_sublok, nama from am_sublok where kode_subpp='"+this.cb_subpp2.getText()+"' and kode_lokam='"+this.cb_lokasi2.getText()+"' and kode_pp='"+this.cb_pp2.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["kode_sublok","nama"],false,["Kode","Nama"],"where","Data Lokasi",true);
		}

		if (sender == this.cb_kateg2 && this.cb_kateg2.getText()!=""){
			this.cb_subkateg2.setSQL("select kode_subkateg, nama from am_subkateg where kode_kateg='"+this.cb_kateg2.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["kode_subkateg","nama"],false,["Kode","Nama"],"where","Data Sub Kategori",true);	
		}
		if (sender == this.cb_subkateg2 && this.cb_subkateg2.getText()!=""){
			this.cb_klpaset2.setSQL("select kode_klpbarang, nama from am_klpbarang where kode_subkateg='"+this.cb_subkateg2.getText()+"' and kode_kateg='"+this.cb_kateg2.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["kode_klpbarang","nama"],false,["Kode","Nama"],"where","Data Kelompok Aktiva",true);				
		}	

		if( sender == this.cb_proyek2 || sender == this.cb_pp || sender == this.cb_subpp || sender == this.cb_klplok || sender == this.cb_lokasi || sender == this.cb_sublok || sender == this.cb_kateg || sender == this.cb_subkateg || sender == this.cb_klpaset ){
					if(this.cb_proyek2.getText() != ""){
						this.filterCari= " where kode_proyek='"+this.cb_proyek2.getText()+"' ";
					}else{
						this.filterCari= " where kode_proyek LIKE '%' ";
					}
			
					if(this.cb_pp2.getText() != ""){
						this.filterCari=this.filterCari+" and kode_pp='"+this.cb_pp2.getText()+"' ";
					}else{
						this.filterCari=this.filterCari+" and kode_pp LIKE '%' ";
					}
			
					if(this.cb_subpp2.getText() != ""){
						this.filterCari=this.filterCari+" and kode_subpp='"+this.cb_subpp2.getText()+"' ";
					}else{
						this.filterCari=this.filterCari+" and kode_subpp LIKE '%' ";
					}
			
					if(this.cb_klplok2.getText() != ""){
						this.filterCari=this.filterCari+" and kode_klp='"+this.cb_klplok2.getText()+"' ";
					}else{
						this.filterCari=this.filterCari+" and kode_klp LIKE '%' ";
					}
			
					if(this.cb_lokasi2.getText() != ""){
						this.filterCari=this.filterCari+" and kode_lokam ='"+this.cb_lokasi2.getText()+"' ";
					}else{
						this.filterCari=this.filterCari+" and kode_lokam LIKE '%' ";
					}
			
					if(this.cb_sublok2.getText() != ""){
						this.filterCari=this.filterCari+" and kode_sublok ='"+this.cb_sublok2.getText()+"' ";
					}else{
						this.filterCari=this.filterCari+" and kode_sublok LIKE '%' ";
					}
			
					if(this.cb_kateg2.getText() != ""){
						this.filterCari=this.filterCari+" and kode_kateg ='"+this.cb_kateg2.getText()+"' ";
					}else{
						this.filterCari=this.filterCari+" and kode_kateg LIKE '%' ";
					}
			
					if(this.cb_subkateg2.getText() != ""){
						this.filterCari=this.filterCari+" and kode_subkateg ='"+this.cb_subkateg2.getText()+"' ";
					}else{
						this.filterCari=this.filterCari+" and kode_subkateg LIKE '%' ";
					}
			
					if(this.cb_klpaset2.getText() != ""){
						this.filterCari=this.filterCari+" and kode_klpbarang ='"+this.cb_klpaset2.getText()+"' ";
					}else{
						this.filterCari=this.filterCari+" and kode_klpbarang LIKE '%' ";
					}
				
					this.cb_id2.setSQL("select id_aset, nama from am_aset"+this.filterCari,["id_aset","nama"],false,["Kode","Nama"],"where","Data Aktiva",true);				
						
		}

		
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							system.info(this,"Transaksi telah sukses tersimpan (No Bukti : "+ this.e_id.getText()+")","");							
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
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg1.cells(0,row) != "") {			
				setTipeButton(tbUbahHapus);
				this.pc2.setActivePage(this.pc2.childPage[1]);
				
				this.e_id.setText(this.sg1.cells(0,row));	
				
				// var data = this.dbLib.getDataProvider(
				// 	"select a.* "+						  
				// 	"from am_aset a "+
				// 	"where a.id_aset='"+this.e_id.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);

				// if (typeof data == "object"){
				// 	var line = data.rs.rows[0];							
				// 	if (line != undefined){

				// 		this.cb_proyek.setText(line.kode_proyek);
				// 		this.cb_pp.setText(line.kode_pp);
				// 		this.cb_subpp.setText(line.kode_subpp);
				
				// 		this.cb_klplok.setText(line.kode_klp);
				// 		this.cb_lokasi.setText(line.kode_lokam);
				// 		this.cb_sublok.setText(line.kode_sublok);
				
				// 		this.cb_kateg.setText(line.kode_kateg);
				// 		this.cb_subkateg.setText(line.kode_subkateg);
				// 		this.cb_klpaset.setText(line.kode_klpbarang);
				
				// 		this.e_npko.setText(line.no_npko);
				// 		this.c_jenis.setText(line.jenis);
				// 		this.e_dasar.setText(line.dasar);

				// 		this.e_jml.setText(floatToNilai(line.jumlah));
				// 		this.c_sat.setText(line.satuan);
				// 		this.e_nama.setText(line.nama);

				// 		this.e_nobukti.setText(line.no_bukti);
				// 		this.e_noseri.setText(line.no_seri);
				// 		this.e_lokasi.setText(line.lokasi);

				// 		this.e_spek.setText(line.spek);
				// 		this.cb_vendor.setText(line.kode_vendor);
				// 		this.c_status.setText(line.status);

				// 		this.e_garansi.setText(floatToNilai(line.garansi));
				// 		this.e_pnj.setText(line.pnj);
				// 		this.c_curr.setText(line.kode_curr);

				// 		this.e_nilai.setText(floatToNilai(line.nilai));
				// 		this.e_kurs.setText(floatToNilai(line.kurs));
				// 		this.dp_d1.setText(line.tgl_oleh);
				// 		this.e_ket.setText(line.keterangan);	
						

				// 	} 
				// }	
				
				
			}
		} catch(e) {alert(e);}
	},

	doLoad:function(sender){						
		var strSQL = "select * from am_aset order by id_aset ";		
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
			this.sg1.appendData([line.id_aset,line.nama,line.satuan,line.jenis,floatToNilai(line.nilai)]); 
		}
		this.sg1.setNoUrut(start);
	},	
	doPager: function(sender, page) {
		this.doTampilData(page);
	}
});
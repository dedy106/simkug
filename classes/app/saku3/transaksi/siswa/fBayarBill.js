window.app_saku3_transaksi_siswa_fBayarBill = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_siswa_fBayarBill.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_siswa_fBayarBill";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Pembayaran : Input/Edit", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal - Periode", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()}); 		
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[230,11,80,20],caption:"",tag:2,readOnly:true,change:[this,"doChange"],labelWidth:0});
		this.pc1 = new pageControl(this,{bound:[20,12,1000,600], childPage:["Daftar Pembayaran","Data Pembayaran","Cari Data"]});				
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:7,tag:9,
		             colTitle:["No Bukti","Tanggal","Keterangan","Tingkat","Nilai","akun titip","nik_app"],
					colWidth:[[6,5,4,3,2,1,0],[60,60,90,80,300,60,100]],readOnly:true,
					colFormat:[[4],[cfNilai]],
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});			
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
		
		
		this.e_nb = new portalui_saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,202,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc1.childPage[1],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_ket = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,450,20],caption:"Deskripsi", maxLength:150});		
		this.cb_titip = new saiCBBL(this.pc1.childPage[1],{bound:[20,18,200,20],caption:"Akun Titipan", multiSelection:false, maxLength:10, tag:2 });
		this.cb_tingkat = new saiCBBL(this.pc1.childPage[1],{bound:[20,17,200,20],caption:"Tingkat", multiSelection:false, maxLength:10, tag:1, change:[this,"doChange"]});
		this.cb_app = new saiCBBL(this.pc1.childPage[1],{bound:[20,18,200,20],caption:"NIK Approve", multiSelection:false, maxLength:10, tag:2});
		this.e_total = new saiLabelEdit(this.pc1.childPage[1],{bound:[700,18,220,20],caption:"Total Usulan", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
		this.pc2 = new pageControl(this.pc1.childPage[1],{bound:[20,12,950,420], childPage:["Pembayaran TK","Pembayaran SD","Pembayaran SMP","Pembayaran SMA","Pembayaran ASM"]});
		//this.p1 = new panel(this.pc1.childPage[1],{bound:[20,23,500,350],caption:"Daftar Pembayaran"});		
		this.sg = new portalui_saiGrid(this.pc2.childPage[0],{bound:[0,10,this.pc2.width-5,this.pc2.height-20],colCount:12,tag:9,
					colTitle:["NIS","Nama", "USKL","PRAK","UKGS","EVAL","KOMP","BING","ESKL","OUTH","BPEL","DEND"],
					colWidth:[[11,10,9,8,7,6,5,4,3,2,1,0],[ 80,80,80,80,80,80,80,80,80,80,200,80]],
					colFormat:[[2,3,4,5,6,7,8,9,10,11],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],
					pasteEnable:true,autoPaging:true,rowPerPage:1000,afterPaste:[this,"doAfterPaste"],
					readOnly:true, defaultRow:1
					});		
		this.sgn = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[1,this.pc2.height-30,this.pc2.width-1,25],buttonStyle:bsAll,grid:this.sg});		
		//this.cb1 = new portalui_checkBox(this.sgn,{bound:[840,5,100,25],caption:"Preview",selected:true});
		this.sg2 = new portalui_saiGrid(this.pc2.childPage[1],{bound:[0,10,this.pc2.width-5,this.pc2.height-20],colCount:14,tag:9,
					colTitle:["NIS","Nama", "USSD","SEMSD","PRASD","KOMSD","EKSSD","UKGSD","UASD","BINGSD","INTSD","KEAGSD","OUTSD","DDSD"],
					colWidth:[[13,12,11,10,9,8,7,6,5,4,3,2,1,0],[ 80,80,80,80,80,80,80,80,80,80,80,80,200,80]],
					colFormat:[[2,3,4,5,6,7,8,9,10,11,12,13],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],
					pasteEnable:true,autoPaging:true,rowPerPage:1000,afterPaste:[this,"doAfterPaste2"],
					readOnly:true, defaultRow:1
					});		
		this.sgn2 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-30,this.pc2.width-1,25],buttonStyle:bsAll,grid:this.sg2});	
		
		this.sg3 = new portalui_saiGrid(this.pc2.childPage[2],{bound:[0,10,this.pc2.width-5,this.pc2.height-20],colCount:14,tag:9,
					colTitle:["NIS","Nama", "USSMP","TPBSMP","UASSMP","KETSMP","BTESMP","KOMSMP","INTSMP","BINGSMP","EKSSMP","OUTSMP","KEAGSMP","DDSMP"],
					colWidth:[[13,12,11,10,9,8,7,6,5,4,3,2,1,0],[ 80,80,80,80,80,80,80,80,80,80,80,80,200,80]],
					colFormat:[[2,3,4,5,6,7,8,9,10,11,12,13],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],
					pasteEnable:true,autoPaging:true,rowPerPage:1000,afterPaste:[this,"doAfterPaste3"],
					readOnly:true, defaultRow:1
					});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[2],{bound:[1,this.pc2.height-30,this.pc2.width-1,25],buttonStyle:bsAll,grid:this.sg3});
		
		this.sg4 = new portalui_saiGrid(this.pc2.childPage[3],{bound:[0,10,this.pc2.width-5,this.pc2.height-20],colCount:13,tag:9,
					colTitle:["NIS","Nama", "USSMA","ULSMA","PRAKSMA","KOMSMA","UASSMA","EKSSMA","INTSMA","KEAGSMA","OUTSMA","BINGSMA","DDSMA"],
					colWidth:[[12,11,10,9,8,7,6,5,4,3,2,1,0],[ 80,80,80,80,80,80,80,80,80,80,80,200,80]],
					colFormat:[[2,3,4,5,6,7,8,9,10,11,12],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],
					pasteEnable:true,autoPaging:true,rowPerPage:1000,afterPaste:[this,"doAfterPaste4"],
					readOnly:true, defaultRow:1
					});		
		this.sgn4 = new portalui_sgNavigator(this.pc2.childPage[3],{bound:[1,this.pc2.height-30,this.pc2.width-1,25],buttonStyle:bsAll,grid:this.sg4});
		
		this.sg5 = new portalui_saiGrid(this.pc2.childPage[4],{bound:[0,10,this.pc2.width-5,this.pc2.height-20],colCount:19,tag:9,
					colTitle:["NIS","Nama", "UKASM","DPPASM","SSASM","PRASM","UTSASM","UASASM","EKSASM","SMASM","IAASM","SRASM","KOPASM","KUASM","BCASM","LLASM","KPASM","MKPASM","TMASM"],
					colWidth:[[18,17,1,6,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0],[ 80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,200,80]],
					colFormat:[[2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],
					pasteEnable:true,autoPaging:true,rowPerPage:1000,afterPaste:[this,"doAfterPaste5"],
					readOnly:true, defaultRow:1
					});		
		this.sgn5 = new portalui_sgNavigator(this.pc2.childPage[4],{bound:[1,this.pc2.height-30,this.pc2.width-1,25],buttonStyle:bsAll,grid:this.sg4});
		
		this.cb_tingkat2 = new saiCBBL(this.pc1.childPage[2],{bound:[20,17,200,20],caption:"Tingkat", multiSelection:false, maxLength:10,tag:9});
		this.e_nb2 = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,14,200,20],caption:"No Bukti",maxLength:30,tag:9});		
		this.e_ket2 = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,15,300,20],caption:"Keterangan",maxLength:50,tag:9});		
		this.bLoad = new button(this.pc1.childPage[2],{bound:[120,16,80,18],caption:"Cari Data",click:[this,"doCari"]});
		
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);		
		this.pc1.childPage[2].rearrangeChild(10, 23);
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			
			this.cb_titip.setSQL("select kode_akun, nama from masakun where kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Daftar Akun Pelunasan",true);
			this.cb_tingkat.setSQL("select kode_tingkat, nama from sis_tingkat where kode_lokasi='"+this.app._lokasi+"'",["kode_tingkat","nama"],false,["Kode","Nama"],"and","Daftar Tingkat",true);
			this.cb_app.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Approval",true);
			this.cb_tingkat.setText("TK");	
			this.cb_tingkat2.setSQL("select kode_tingkat, nama from sis_tingkat where kode_lokasi='"+this.app._lokasi+"'",["kode_tingkat","nama"],false,["Kode","Nama"],"and","Daftar Tingkat",true);

			this.doLoad();
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_siswa_fBayarBill.extend(window.childForm);
window.app_saku3_transaksi_siswa_fBayarBill.implement({
	doAfterPaste: function(sender,totalRow){
		try {
			this.sgn.setTotalPage(sender.getTotalPage());
			this.sgn.rearrange();
			this.doNilaiChange();
		} catch(e) {alert(e);}
	},
	doNilaiChange: function(){
		try{
			var tot=0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i)){
					tot += nilaiToFloat(this.sg.cells(2,i))+nilaiToFloat(this.sg.cells(3,i))+nilaiToFloat(this.sg.cells(4,i))+nilaiToFloat(this.sg.cells(5,i))+
						nilaiToFloat(this.sg.cells(6,i))+nilaiToFloat(this.sg.cells(7,i))+nilaiToFloat(this.sg.cells(8,i))+nilaiToFloat(this.sg.cells(9,i))+
						nilaiToFloat(this.sg.cells(10,i))+nilaiToFloat(this.sg.cells(11,i));					
				}
			}
			this.e_total.setText(floatToNilai(tot));			
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},		
	doAfterPaste2: function(sender,totalRow){
		try {
			this.sgn2.setTotalPage(sender.getTotalPage());
			this.sgn2.rearrange();
			this.doNilaiChange2();
		} catch(e) {alert(e);}
	},
	doNilaiChange2: function(){
		try{
			var tot=0;
			for (var i = 0; i < this.sg2.rows.getLength();i++){
				if (this.sg2.rowValid(i)){
					tot += nilaiToFloat(this.sg2.cells(2,i))+nilaiToFloat(this.sg2.cells(3,i))+nilaiToFloat(this.sg2.cells(4,i))+nilaiToFloat(this.sg2.cells(5,i))+
						nilaiToFloat(this.sg2.cells(6,i))+nilaiToFloat(this.sg2.cells(7,i))+nilaiToFloat(this.sg2.cells(8,i))+nilaiToFloat(this.sg2.cells(9,i))+
						nilaiToFloat(this.sg2.cells(10,i))+nilaiToFloat(this.sg2.cells(11,i))+nilaiToFloat(this.sg2.cells(12,i))+nilaiToFloat(this.sg2.cells(13,i));					
				}
			}
			this.e_total.setText(floatToNilai(tot));
			
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},		
	doAfterPaste3: function(sender,totalRow){
		try {
			this.sgn3.setTotalPage(sender.getTotalPage());
			this.sgn3.rearrange();
			this.doNilaiChange3();
		} catch(e) {alert(e);}
	},
	doNilaiChange3: function(){
		try{
			var tot=0;
			for (var i = 0; i < this.sg3.rows.getLength();i++){
				if (this.sg3.rowValid(i)){
					tot += nilaiToFloat(this.sg3.cells(2,i))+nilaiToFloat(this.sg3.cells(3,i))+nilaiToFloat(this.sg3.cells(4,i))+nilaiToFloat(this.sg3.cells(5,i))+
						nilaiToFloat(this.sg3.cells(6,i))+nilaiToFloat(this.sg3.cells(7,i))+nilaiToFloat(this.sg3.cells(8,i))+nilaiToFloat(this.sg3.cells(9,i))+
						nilaiToFloat(this.sg3.cells(10,i))+nilaiToFloat(this.sg3.cells(11,i))+nilaiToFloat(this.sg3.cells(12,i))+nilaiToFloat(this.sg3.cells(13,i));					
				}
			}
			this.e_total.setText(floatToNilai(tot));			
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},		
	doAfterPaste4: function(sender,totalRow){
		try {
			this.sgn4.setTotalPage(sender.getTotalPage());
			this.sgn4.rearrange();
			this.doNilaiChange4();
		} catch(e) {alert(e);}
	},
	doNilaiChange4: function(){
		try{
			var tot=0;
			for (var i = 0; i < this.sg4.rows.getLength();i++){
				if (this.sg4.rowValid(i)){
					tot += nilaiToFloat(this.sg4.cells(2,i))+nilaiToFloat(this.sg4.cells(3,i))+nilaiToFloat(this.sg4.cells(4,i))+nilaiToFloat(this.sg4.cells(5,i))+
						nilaiToFloat(this.sg4.cells(6,i))+nilaiToFloat(this.sg4.cells(7,i))+nilaiToFloat(this.sg4.cells(8,i))+nilaiToFloat(this.sg4.cells(9,i))+
						nilaiToFloat(this.sg4.cells(10,i))+nilaiToFloat(this.sg4.cells(11,i))+nilaiToFloat(this.sg4.cells(12,i));					
				}
			}
			this.e_total.setText(floatToNilai(tot));			
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},		
	doAfterPaste5: function(sender,totalRow){
		try {
			this.sgn5.setTotalPage(sender.getTotalPage());
			this.sgn5.rearrange();
			this.doNilaiChange5();
		} catch(e) {alert(e);}
	},
	doNilaiChange5: function(){
		try{
			var tot=0;
			for (var i = 0; i < this.sg5.rows.getLength();i++){
				if (this.sg5.rowValid(i)){
					tot += nilaiToFloat(this.sg5.cells(2,i))+nilaiToFloat(this.sg5.cells(3,i))+nilaiToFloat(this.sg5.cells(4,i))+nilaiToFloat(this.sg5.cells(5,i))+
						nilaiToFloat(this.sg5.cells(6,i))+nilaiToFloat(this.sg5.cells(7,i))+nilaiToFloat(this.sg5.cells(8,i))+nilaiToFloat(this.sg5.cells(9,i))+
						nilaiToFloat(this.sg5.cells(10,i))+nilaiToFloat(this.sg5.cells(11,i))+nilaiToFloat(this.sg5.cells(12,i))+nilaiToFloat(this.sg5.cells(13,i))+
						+nilaiToFloat(this.sg5.cells(14,i))+nilaiToFloat(this.sg5.cells(15,i))+nilaiToFloat(this.sg5.cells(16,i))+nilaiToFloat(this.sg5.cells(17,i))+
						+nilaiToFloat(this.sg5.cells(18,i));					
				}
			}
			this.e_total.setText(floatToNilai(tot));			
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},		
	doPage: function(sender,page){
		this.sg.doSelectPage(page);
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
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					
					sql.add("insert into sis_rekon_m(no_rekon,no_dokumen,tanggal,keterangan,nilai,posted,modul,akun_titip,kode_tingkat,nik_buat,nik_app,kode_lokasi,periode,nik_user,tgl_input) values "+
						    "('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"',"+parseNilai(this.e_total.getText())+",'F','LOAD','"+this.cb_titip.getText()+"','"+this.cb_tingkat.getText()+"','"+this.app._userLog+"','"+this.cb_app.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate())");
					
					if (this.cb_tingkat.getText()=="TK")
					{
						if (this.sg.getRowValidCount() > 0){
							for (var i=0;i < this.sg.getRowCount();i++){
								if (this.sg.rowValid(i)){
									
									sql.add("insert into sis_rekon_load(  no_rekon, kode_lokasi, nis, nama, n1, n2, n3, n4, n5, n6, n7, n8, n9, n10,nu) values "+
											"	('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.sg.cells(0,i)+"','"+this.sg.cells(1,i)+"',"+nilaiToFloat(this.sg.cells(2,i))+","+nilaiToFloat(this.sg.cells(3,i))+","+nilaiToFloat(this.sg.cells(4,i))+","+nilaiToFloat(this.sg.cells(5,i))+
											","+nilaiToFloat(this.sg.cells(6,i))+","+nilaiToFloat(this.sg.cells(7,i))+","+nilaiToFloat(this.sg.cells(8,i))+","+nilaiToFloat(this.sg.cells(9,i))+","+nilaiToFloat(this.sg.cells(10,i))+","+nilaiToFloat(this.sg.cells(11,i))+","+i+")");
															
								}
							}
						}
						sql.add("exec sp_rekon_d '"+this.e_nb.getText()+"','"+this.app._lokasi+"'");
					}
					if (this.cb_tingkat.getText()=="SMP")
					{
						if (this.sg3.getRowValidCount() > 0){
							for (var i=0;i < this.sg3.getRowCount();i++){
								if (this.sg3.rowValid(i)){
									
									sql.add("insert into sis_rekon_load(  no_rekon, kode_lokasi, nis, nama, n1, n2, n3, n4, n5, n6, n7, n8, n9, n10,n11,n12,nu) values "+
											"	('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.sg3.cells(0,i)+"','"+this.sg3.cells(1,i)+"',"+nilaiToFloat(this.sg3.cells(2,i))+","+nilaiToFloat(this.sg3.cells(3,i))+","+nilaiToFloat(this.sg3.cells(4,i))+","+nilaiToFloat(this.sg3.cells(5,i))+
											","+nilaiToFloat(this.sg3.cells(6,i))+","+nilaiToFloat(this.sg3.cells(7,i))+","+nilaiToFloat(this.sg3.cells(8,i))+","+nilaiToFloat(this.sg3.cells(9,i))+","+nilaiToFloat(this.sg3.cells(10,i))+","+nilaiToFloat(this.sg3.cells(11,i))+","+nilaiToFloat(this.sg3.cells(12,i))+","+nilaiToFloat(this.sg3.cells(13,i))+","+i+")");
															
								}
							}
						}
						sql.add("exec sp_rekon_d_smp '"+this.e_nb.getText()+"','"+this.app._lokasi+"'");
					}
					if (this.cb_tingkat.getText()=="SD")
					{
						if (this.sg2.getRowValidCount() > 0){
							for (var i=0;i < this.sg2.getRowCount();i++){
								if (this.sg2.rowValid(i)){
									
									sql.add("insert into sis_rekon_load(  no_rekon, kode_lokasi, nis, nama, n1, n2, n3, n4, n5, n6, n7, n8, n9, n10,n11,n12,nu) values "+
											"	('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.sg2.cells(0,i)+"','"+this.sg2.cells(1,i)+"',"+nilaiToFloat(this.sg2.cells(2,i))+","+nilaiToFloat(this.sg2.cells(3,i))+","+nilaiToFloat(this.sg2.cells(4,i))+","+nilaiToFloat(this.sg2.cells(5,i))+
											","+nilaiToFloat(this.sg2.cells(6,i))+","+nilaiToFloat(this.sg2.cells(7,i))+","+nilaiToFloat(this.sg2.cells(8,i))+","+nilaiToFloat(this.sg2.cells(9,i))+","+nilaiToFloat(this.sg2.cells(10,i))+","+nilaiToFloat(this.sg2.cells(11,i))+","+nilaiToFloat(this.sg2.cells(12,i))+","+nilaiToFloat(this.sg2.cells(13,i))+","+i+")");
															
								}
							}
						}
						sql.add("exec sp_rekon_d_sd '"+this.e_nb.getText()+"','"+this.app._lokasi+"'");
					}
					if (this.cb_tingkat.getText()=="SMA")
					{
						if (this.sg4.getRowValidCount() > 0){
							for (var i=0;i < this.sg4.getRowCount();i++){
								if (this.sg4.rowValid(i)){
									
									sql.add("insert into sis_rekon_load(  no_rekon, kode_lokasi, nis, nama, n1, n2, n3, n4, n5, n6, n7, n8, n9, n10,n11,nu) values "+
											"	('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.sg4.cells(0,i)+"','"+this.sg4.cells(1,i)+"',"+nilaiToFloat(this.sg4.cells(2,i))+","+nilaiToFloat(this.sg4.cells(3,i))+","+nilaiToFloat(this.sg4.cells(4,i))+","+nilaiToFloat(this.sg4.cells(5,i))+
											","+nilaiToFloat(this.sg4.cells(6,i))+","+nilaiToFloat(this.sg4.cells(7,i))+","+nilaiToFloat(this.sg4.cells(8,i))+","+nilaiToFloat(this.sg4.cells(9,i))+","+nilaiToFloat(this.sg4.cells(10,i))+","+nilaiToFloat(this.sg4.cells(11,i))+","+nilaiToFloat(this.sg4.cells(12,i))+","+i+")");
															
								}
							}
						}
						sql.add("exec sp_rekon_d_sma '"+this.e_nb.getText()+"','"+this.app._lokasi+"'");
					}
					if (this.cb_tingkat.getText()=="ASM")
					{
						if (this.sg5.getRowValidCount() > 0){
							for (var i=0;i < this.sg5.getRowCount();i++){
								if (this.sg5.rowValid(i)){
									
									sql.add("insert into sis_rekon_load(  no_rekon, kode_lokasi, nis, nama, n1, n2, n3, n4, n5, n6, n7, n8, n9, n10,n11,n12,n13,n14,n15,n16,n17,nu) values "+
											"	('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.sg5.cells(0,i)+"','"+this.sg5.cells(1,i)+"',"+nilaiToFloat(this.sg5.cells(2,i))+","+nilaiToFloat(this.sg5.cells(3,i))+","+nilaiToFloat(this.sg5.cells(4,i))+","+nilaiToFloat(this.sg5.cells(5,i))+
											","+nilaiToFloat(this.sg5.cells(6,i))+","+nilaiToFloat(this.sg5.cells(7,i))+","+nilaiToFloat(this.sg5.cells(8,i))+","+nilaiToFloat(this.sg5.cells(9,i))+","+nilaiToFloat(this.sg5.cells(10,i))+","+nilaiToFloat(this.sg5.cells(11,i))+","+nilaiToFloat(this.sg5.cells(12,i))+","+nilaiToFloat(this.sg5.cells(13,i))+","+
											nilaiToFloat(this.sg5.cells(14,i))+","+nilaiToFloat(this.sg5.cells(15,i))+","+nilaiToFloat(this.sg5.cells(16,i))+","+nilaiToFloat(this.sg5.cells(17,i))+","+nilaiToFloat(this.sg5.cells(18,i))+","+i+")");
															
								}
							}
						}
						sql.add("exec sp_rekon_d_asm '"+this.e_nb.getText()+"','"+this.app._lokasi+"'");
					}
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
	ubah: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					
					sql.add("delete from sis_rekon_m where no_rekon = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
					sql.add("delete from sis_rekon_d where no_rekon = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
					sql.add("delete from sis_rekon_load where no_rekon = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from sis_rekon_j where no_rekon = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from kas_m where no_kas = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from kas_j where no_kas = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					
					sql.add("insert into sis_rekon_m(no_rekon,no_dokumen,tanggal,keterangan,nilai,posted,modul,akun_titip,kode_tingkat,nik_buat,nik_app,kode_lokasi,periode,nik_user,tgl_input) values "+
						    "('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"',"+parseNilai(this.e_total.getText())+",'F','LOAD','"+this.cb_titip.getText()+"','"+this.cb_tingkat.getText()+"','"+this.app._userLog+"','"+this.cb_app.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate())");
					
					if (this.cb_tingkat.getText()=="TK")
					{
						if (this.sg.getRowValidCount() > 0){
							for (var i=0;i < this.sg.getRowCount();i++){
								if (this.sg.rowValid(i)){
									
									sql.add("insert into sis_rekon_load(  no_rekon, kode_lokasi, nis, nama, n1, n2, n3, n4, n5, n6, n7, n8, n9, n10,nu) values "+
											"	('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.sg.cells(0,i)+"','"+this.sg.cells(1,i)+"',"+nilaiToFloat(this.sg.cells(2,i))+","+nilaiToFloat(this.sg.cells(3,i))+","+nilaiToFloat(this.sg.cells(4,i))+","+nilaiToFloat(this.sg.cells(5,i))+
											","+nilaiToFloat(this.sg.cells(6,i))+","+nilaiToFloat(this.sg.cells(7,i))+","+nilaiToFloat(this.sg.cells(8,i))+","+nilaiToFloat(this.sg.cells(9,i))+","+nilaiToFloat(this.sg.cells(10,i))+","+nilaiToFloat(this.sg.cells(11,i))+","+i+")");
															
								}
							}
						}
						sql.add("exec sp_rekon_d '"+this.e_nb.getText()+"','"+this.app._lokasi+"'");
					}
					if (this.cb_tingkat.getText()=="SMP")
					{
						if (this.sg3.getRowValidCount() > 0){
							for (var i=0;i < this.sg3.getRowCount();i++){
								if (this.sg3.rowValid(i)){
									
									sql.add("insert into sis_rekon_load(  no_rekon, kode_lokasi, nis, nama, n1, n2, n3, n4, n5, n6, n7, n8, n9, n10,n11,n12,nu) values "+
											"	('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.sg3.cells(0,i)+"','"+this.sg3.cells(1,i)+"',"+nilaiToFloat(this.sg3.cells(2,i))+","+nilaiToFloat(this.sg3.cells(3,i))+","+nilaiToFloat(this.sg3.cells(4,i))+","+nilaiToFloat(this.sg3.cells(5,i))+
											","+nilaiToFloat(this.sg3.cells(6,i))+","+nilaiToFloat(this.sg3.cells(7,i))+","+nilaiToFloat(this.sg3.cells(8,i))+","+nilaiToFloat(this.sg3.cells(9,i))+","+nilaiToFloat(this.sg3.cells(10,i))+","+nilaiToFloat(this.sg3.cells(11,i))+","+nilaiToFloat(this.sg3.cells(12,i))+","+nilaiToFloat(this.sg3.cells(13,i))+","+i+")");
															
								}
							}
						}
						sql.add("exec sp_rekon_d_smp '"+this.e_nb.getText()+"','"+this.app._lokasi+"'");
					}
					if (this.cb_tingkat.getText()=="SD")
					{
						if (this.sg2.getRowValidCount() > 0){
							for (var i=0;i < this.sg2.getRowCount();i++){
								if (this.sg2.rowValid(i)){
									
									sql.add("insert into sis_rekon_load(  no_rekon, kode_lokasi, nis, nama, n1, n2, n3, n4, n5, n6, n7, n8, n9, n10,n11,n12,nu) values "+
											"	('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.sg2.cells(0,i)+"','"+this.sg2.cells(1,i)+"',"+nilaiToFloat(this.sg2.cells(2,i))+","+nilaiToFloat(this.sg2.cells(3,i))+","+nilaiToFloat(this.sg2.cells(4,i))+","+nilaiToFloat(this.sg2.cells(5,i))+
											","+nilaiToFloat(this.sg2.cells(6,i))+","+nilaiToFloat(this.sg2.cells(7,i))+","+nilaiToFloat(this.sg2.cells(8,i))+","+nilaiToFloat(this.sg2.cells(9,i))+","+nilaiToFloat(this.sg2.cells(10,i))+","+nilaiToFloat(this.sg2.cells(11,i))+","+nilaiToFloat(this.sg2.cells(12,i))+","+nilaiToFloat(this.sg2.cells(13,i))+","+i+")");
															
								}
							}
						}
						sql.add("exec sp_rekon_d_sd '"+this.e_nb.getText()+"','"+this.app._lokasi+"'");
					}
					if (this.cb_tingkat.getText()=="SMA")
					{
						if (this.sg4.getRowValidCount() > 0){
							for (var i=0;i < this.sg4.getRowCount();i++){
								if (this.sg4.rowValid(i)){
									
									sql.add("insert into sis_rekon_load(  no_rekon, kode_lokasi, nis, nama, n1, n2, n3, n4, n5, n6, n7, n8, n9, n10,n11,nu) values "+
											"	('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.sg4.cells(0,i)+"','"+this.sg4.cells(1,i)+"',"+nilaiToFloat(this.sg4.cells(2,i))+","+nilaiToFloat(this.sg4.cells(3,i))+","+nilaiToFloat(this.sg4.cells(4,i))+","+nilaiToFloat(this.sg4.cells(5,i))+
											","+nilaiToFloat(this.sg4.cells(6,i))+","+nilaiToFloat(this.sg4.cells(7,i))+","+nilaiToFloat(this.sg4.cells(8,i))+","+nilaiToFloat(this.sg4.cells(9,i))+","+nilaiToFloat(this.sg4.cells(10,i))+","+nilaiToFloat(this.sg4.cells(11,i))+","+nilaiToFloat(this.sg4.cells(12,i))+","+i+")");
															
								}
							}
						}
						sql.add("exec sp_rekon_d_sma '"+this.e_nb.getText()+"','"+this.app._lokasi+"'");
					}
					if (this.cb_tingkat.getText()=="ASM")
					{
						if (this.sg5.getRowValidCount() > 0){
							for (var i=0;i < this.sg5.getRowCount();i++){
								if (this.sg5.rowValid(i)){
									
									sql.add("insert into sis_rekon_load(  no_rekon, kode_lokasi, nis, nama, n1, n2, n3, n4, n5, n6, n7, n8, n9, n10,n11,n12,n13,n14,n15,n16,n17,nu) values "+
											"	('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.sg5.cells(0,i)+"','"+this.sg5.cells(1,i)+"',"+nilaiToFloat(this.sg5.cells(2,i))+","+nilaiToFloat(this.sg5.cells(3,i))+","+nilaiToFloat(this.sg5.cells(4,i))+","+nilaiToFloat(this.sg5.cells(5,i))+
											","+nilaiToFloat(this.sg5.cells(6,i))+","+nilaiToFloat(this.sg5.cells(7,i))+","+nilaiToFloat(this.sg5.cells(8,i))+","+nilaiToFloat(this.sg5.cells(9,i))+","+nilaiToFloat(this.sg5.cells(10,i))+","+nilaiToFloat(this.sg5.cells(11,i))+","+nilaiToFloat(this.sg5.cells(12,i))+","+nilaiToFloat(this.sg5.cells(13,i))+","+
											nilaiToFloat(this.sg5.cells(14,i))+","+nilaiToFloat(this.sg5.cells(15,i))+","+nilaiToFloat(this.sg5.cells(16,i))+","+nilaiToFloat(this.sg5.cells(17,i))+","+nilaiToFloat(this.sg5.cells(18,i))+","+i+")");
															
								}
							}
						}
						sql.add("exec sp_rekon_d_asm '"+this.e_nb.getText()+"','"+this.app._lokasi+"'");
					}
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
	hapus: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from sis_rekon_m where no_rekon = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
					sql.add("delete from sis_rekon_d where no_rekon = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
					sql.add("delete from sis_rekon_load where no_rekon = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from sis_rekon_j where no_rekon = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from kas_m where no_kas = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from kas_j where no_kas = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
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
				if (modalResult == mrOk) {
					this.standarLib.clearByTag(this, new Array("0","1","9"),this.e_nb);
					setTipeButton(tbAllFalse);
					this.doLoad();
				}
				break;
			case "simpan" :	
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;
			case "ubah" :	
				this.ubah();
				break;				
			case "hapus" :	
				this.hapus();
				break;				
		}
	},
	doChange: function(sender){
		try{
			
			if (this.cb_tingkat.getText() != ""){
				
				if (this.cb_tingkat.getText()=="TK")
				{
					this.pc2.setActivePage(this.pc2.childPage[0]);
				}
				if (this.cb_tingkat.getText()=="SD")
				{
					this.pc2.setActivePage(this.pc2.childPage[1]);
				}
				if (this.cb_tingkat.getText()=="SMP")
				{
					this.pc2.setActivePage(this.pc2.childPage[2]);
				}
				if (this.cb_tingkat.getText()=="SMA")
				{
					this.pc2.setActivePage(this.pc2.childPage[3]);
				}
				if (this.cb_tingkat.getText()=="ASM")
				{
					this.pc2.setActivePage(this.pc2.childPage[4]);
				}
			
			}
			
		}catch(e){
			systemAPI.alert(e);
		}
	},	
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
		else {
			if (m == "12") this.e_periode.setText(this.app._periode);
			else this.e_periode.setText(y+""+m);
		}
		if (this.stsSimpan == 1) this.doClick(this.i_gen);
	},
	doClick:function(sender){
		if (sender == this.i_gen) {			
			if (this.stsSimpan == 0) {									
				this.sg.clear(1);this.sg4.clear(1);
				this.e_nilai.setText("0");
				this.bTampil.show();				
			}	
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"kas_m","no_kas",this.app._lokasi+"-BM"+this.e_periode.getText().substr(2,4)+".","0000"));
			this.cb_app.setFocus();
			setTipeButton(tbSimpan);
			this.stsSimpan = 1;
		}		
	},
	doEllipsClick: function(sender, col, row) {
		try
		{
			switch(col){
				case 0 :
						this.standarLib.showListDataForSG(this, "Daftar DRK",this.sg, this.sg.row, this.sg.col, 
														"select kode_drk, nama  from agg_drk where kode_lokasi='"+this.app._lokasi+"' and kode_rkm='"+this.cb_rkm.getText()+"'",
														"select count(kode_drk) from agg_drk where kode_lokasi='"+this.app._lokasi+"' and kode_rkm='"+this.cb_rkm.getText()+"'",
														 new Array("kode_drk","nama"),"and",new Array("Kode","Nama"),false);					
						break;					
			}						
		}catch(e)
		{
			systemAPI.alert("[app_saku_gl_transaksi_fJu2] : doFindBtnClick : " + e);
		}
	},	
	doBtnClick: function(sender, event){
		try{
			if (sender == this.e_nb) {   
			    this.standarLib.showListData(this, "Daftar Flag Akun",sender,undefined, 
											  "select kode_loker, nama  from hr_loker where kode_lokasi='"+this.app._lokasi+"'",
											  "select count(kode_loker) from hr_loker where kode_lokasi='"+this.app._lokasi+"'",
											  ["kode_loker","nama"],"where",["Kode","Nama"],false);				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{
							this.app._mainForm.pesan(2,"transaksi telah sukses tereksekusi (Kode : "+ this.e_nb.getText()+")");							
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;
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
				this.pc1.setActivePage(this.pc1.childPage[1]);
				this.e_nb.setText(this.sg1.cells(0,row));	
				this.dp_d1.setText(this.sg1.cells(1,row));					
				this.e_ket.setText(this.sg1.cells(2,row));
				this.cb_app.setText(this.sg1.cells(6,row));
				this.cb_titip.setText(this.sg1.cells(5,row));
				this.cb_tingkat.setText(this.sg1.cells(3,row));	
				if (this.sg1.cells(3,row)=="TK")
				{
					
					var strSQL = " select no_rekon, kode_lokasi, nis, nama, n1, n2, n3, n4, n5, n6, n7, n8, n9, n10  from sis_rekon_load "+
						"where no_rekon = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' order by nu ";
					var data = this.dbLib.getDataProvider(strSQL,true);
					if (typeof data == "object" && data.rs.rows[0] != undefined){
						var line;
						this.sg.clear();
						for (var i in data.rs.rows){
							line = data.rs.rows[i];							
							this.sg.appendData([line.nis,line.nama,floatToNilai(line.n1),floatToNilai(line.n2),floatToNilai(line.n3),floatToNilai(line.n4),floatToNilai(line.n5)
							,floatToNilai(line.n6),floatToNilai(line.n7),floatToNilai(line.n8),floatToNilai(line.n9),floatToNilai(line.n10)]);
						}
						this.sg.validasi();
					} else this.sg.clear(1);	
					this.doNilaiChange();
				}
				if (this.sg1.cells(3,row)=="SD")
				{
					
					var strSQL = " select no_rekon, kode_lokasi, nis, nama, n1, n2, n3, n4, n5, n6, n7, n8, n9, n10,n11,n12  from sis_rekon_load "+
						"where no_rekon = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' order by nu ";
					var data = this.dbLib.getDataProvider(strSQL,true);
					if (typeof data == "object" && data.rs.rows[0] != undefined){
						var line;
						this.sg2.clear();
						for (var i in data.rs.rows){
							line = data.rs.rows[i];							
							this.sg2.appendData([line.nis,line.nama,floatToNilai(line.n1),floatToNilai(line.n2),floatToNilai(line.n3),floatToNilai(line.n4),floatToNilai(line.n5)
							,floatToNilai(line.n6),floatToNilai(line.n7),floatToNilai(line.n8),floatToNilai(line.n9),floatToNilai(line.n10),floatToNilai(line.n11),floatToNilai(line.n12)]);
						}
						this.sg2.validasi();
					} else this.sg2.clear(1);	
					this.doNilaiChange2();
				}
				if (this.sg1.cells(3,row)=="SMP")
				{
					
					var strSQL = " select no_rekon, kode_lokasi, nis, nama, n1, n2, n3, n4, n5, n6, n7, n8, n9, n10,n11,n12  from sis_rekon_load "+
						"where no_rekon = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' order by nu ";
					var data = this.dbLib.getDataProvider(strSQL,true);
					if (typeof data == "object" && data.rs.rows[0] != undefined){
						var line;
						this.sg3.clear();
						for (var i in data.rs.rows){
							line = data.rs.rows[i];							
							this.sg3.appendData([line.nis,line.nama,floatToNilai(line.n1),floatToNilai(line.n2),floatToNilai(line.n3),floatToNilai(line.n4),floatToNilai(line.n5)
							,floatToNilai(line.n6),floatToNilai(line.n7),floatToNilai(line.n8),floatToNilai(line.n9),floatToNilai(line.n10),floatToNilai(line.n11),floatToNilai(line.n12)]);
						}
						this.sg3.validasi();
					} else this.sg3.clear(1);	
					this.doNilaiChange3();
				}
				if (this.sg1.cells(3,row)=="SMA")
				{
					var strSQL = " select no_rekon, kode_lokasi, nis, nama, n1, n2, n3, n4, n5, n6, n7, n8, n9, n10,n11  from sis_rekon_load "+
						"where no_rekon = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' order by nu ";
					var data = this.dbLib.getDataProvider(strSQL,true);
					if (typeof data == "object" && data.rs.rows[0] != undefined){
						var line;
						this.sg4.clear();
						for (var i in data.rs.rows){
							line = data.rs.rows[i];							
							this.sg4.appendData([line.nis,line.nama,floatToNilai(line.n1),floatToNilai(line.n2),floatToNilai(line.n3),floatToNilai(line.n4),floatToNilai(line.n5)
							,floatToNilai(line.n6),floatToNilai(line.n7),floatToNilai(line.n8),floatToNilai(line.n9),floatToNilai(line.n10),floatToNilai(line.n11)]);
						}
						this.sg4.validasi();
					} else this.sg4.clear(1);	
					this.doNilaiChange4();
				}
			}
		} catch(e) {alert(e);}
	},
	doCari:function(sender){								
		try {
			var filter = "";
			if (this.cb_tingkat2.getText() != "") var filter = filter+" and a.kode_tingkat='"+this.cb_tingkat2.getText()+"' ";
			if (this.e_nb2.getText() != "") var filter = filter+" and no_rekon like  '%"+this.e_nb2.getText()+"%' ";
			if (this.e_ket2.getText() != "") var filter = filter+" and keterangan = '"+this.e_ket2.getText()+"' ";
			var strSQL = "select a.no_rekon,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.nilai,a.kode_tingkat,a.akun_titip,a.nik_app "+
		             "from sis_rekon_m a "+
					 "where a.kode_lokasi='"+this.app._lokasi+"' "+filter+" order by a.no_rekon ";
			var data = this.dbLib.getDataProvider(strSQL,true);		
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn1.rearrange();
				this.doTampilData(1);
			} else this.sg1.clear(1);			
			this.pc1.setActivePage(this.pc1.childPage[0]);
		} 
		catch(e) {
			alert(e);
		}
	},
	doLoad:function(sender){						
		var strSQL = "select a.no_rekon,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.nilai,a.kode_tingkat,a.akun_titip,a.nik_app "+
		             "from sis_rekon_m a "+
					 "where a.kode_lokasi='"+this.app._lokasi+"' order by a.no_rekon ";	
		
		var data = this.dbLib.getDataProvider(strSQL,true);		
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn1.rearrange();
			this.doTampilData(1);
		} else this.sg1.clear(1);			
		this.pc1.setActivePage(this.pc1.childPage[0]);
	},		
	doTampilData: function(page) {		
		this.sg1.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];													
			this.sg1.appendData([line.no_rekon,line.tgl,line.keterangan,line.kode_tingkat,floatToNilai(line.nilai),line.akun_titip,line.nik_app]); 
		}
		this.sg1.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	
	
	doChangeCell: function(sender, col, row){	
		/*
		if (col ==  2 || col ==  3  || col ==  4 || col == 5  || col == 6 || col == 7 || col == 8 || col == 9 || col == 10 || col == 11 ) {			
			
					
			if (sender.cells(2,row) != "" && sender.cells(3,row) != "" && sender.cells(4,row) != "" && sender.cells(5,row) != "" && 
			   sender.cells(6,row) != "" && sender.cells(7,row) != "" && sender.cells(8,row) != "" && sender.cells(9,row) != "" && sender.cells(10,row) != "" ) {
				var total = nilaiToFloat(sender.cells(2,row)) + nilaiToFloat(sender.cells(3,row)) + nilaiToFloat(sender.cells(4,row)) + nilaiToFloat(sender.cells(5,row)) + 
				            nilaiToFloat(sender.cells(6,row)) + nilaiToFloat(sender.cells(7,row)) + nilaiToFloat(sender.cells(8,row)) + nilaiToFloat(sender.cells(9,row)) +
							nilaiToFloat(sender.cells(10,row)) +nilaiToFloat(sender.cells(11,row)) ;
				sender.cells(12,row,floatToNilai(total));	
			}	
			
			sender.validasi();
		}
		*/
	}
});
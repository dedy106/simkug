window.app_saku2_transaksi_aka_aka2_fBatalRekonMulti = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_aka_aka2_fBatalRekonMulti.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_aka_aka2_fBatalRekonMulti";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Pembatalan Rekon per Invoice [Multi]", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;pageControl;portalui_saiMemo");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,200,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,98,18],selectDate:[this,"doSelectDate"]}); 
		this.e_bpp = new saiLabelEdit(this,{bound:[800,11,200,20],caption:"Ni. Koreksi BPP", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});						
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,200,20],caption:"No Rekon",maxLength:30,readOnly:true});		
		this.e_sdp2 = new saiLabelEdit(this,{bound:[800,12,200,20],caption:"Ni. Koreksi SDP2", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});						
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_nbtak = new portalui_saiLabelEdit(this,{bound:[20,13,200,20],caption:"No TAK",maxLength:30,readOnly:true});
		this.e_up3 = new saiLabelEdit(this,{bound:[800,13,200,20],caption:"Ni. Koreksi UP3", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});						
		this.cb_lokasi = new saiCBBL(this,{bound:[20,14,220,20],caption:"Lokasi Tujuan", multiSelection:false, maxLength:10, tag:2 });
		this.e_sks = new saiLabelEdit(this,{bound:[800,14,200,20],caption:"Ni. Koreksi SKS", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});							
		this.e_ket = new saiLabelEdit(this,{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});				
		this.e_asur = new saiLabelEdit(this,{bound:[800,17,200,20],caption:"Ni. Kor. Asuransi", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});						
		this.cb_titip = new saiCBBL(this,{bound:[20,18,220,20],caption:"Akun PDD", multiSelection:false, maxLength:10, tag:2 });
		this.e_perpus = new saiLabelEdit(this,{bound:[800,18,200,20],caption:"Ni. Koreksi Perpus", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});						
		this.cb_tak = new saiCBBL(this,{bound:[20,19,220,20],caption:"Akun TAK", multiSelection:false, maxLength:10, tag:2 });		
		this.e_denda = new saiLabelEdit(this,{bound:[800,19,200,20],caption:"Ni. Koreksi Denda", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});						
		this.cb_buat = new saiCBBL(this,{bound:[20,16,220,20],caption:"NIK Pembuat", multiSelection:false, maxLength:10, tag:2 });		
		this.e_status = new saiLabelEdit(this,{bound:[800,16,200,20],caption:"Ni. Kor, UStatus", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});								
		this.cb_app = new saiCBBL(this,{bound:[20,17,220,20],caption:"NIK Approve", multiSelection:false, maxLength:10, tag:2});
		this.e_bea = new saiLabelEdit(this,{bound:[800,17,200,20],caption:"Ni. Koreksi Bea", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.bValid = new button(this,{bound:[700,17,80,20],caption:"Validasi Data",click:[this,"doValid"]});			

		this.pc2 = new pageControl(this,{bound:[10,10,1000,260], childPage:["Data Invoice","Error Msg","Simulasi Jurnal"]});		
		this.sg2 = new portalui_saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:33,tag:9,
						colTitle:["NIM","ThnAka","Ni. Beasiswa","Tot Rekon",  //3										  
						          "Rekon BPP","Rekon SDP2","Rekon UP3","Rekon SKS","Rekon ASUR","Rekon PERPUS","Rekon DENDA","Rekon USTATUS",  //11
								  "Invoice","Ni TagihLama","Ni BeaLama", //14
								  "Rekon BPPLama","Rekon SDP2Lama","Rekon UP3Lama","Rekon SKSLama","Rek ASURLama","Rek PERPUSLama","Rek DENDALama","Rek USTATUSLama", //22
								  "Akun Piutang","KodePP", //24
								  "Bill BPP","Bill SDP2","Bill UP3","Bill SKS","Bill ASUR","Bill PERPUS","Bill DENDA","Bill USTATUS"],  //32											
						colWidth:[[32,31,30,29,28,27,26,25, 24,23,22,21,20,19,18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0],[100,100,100,100,100,100,100,100  ,80,80, 100,100,100,100,100,100,100,100, 80,80,180, 100,100,100,100,100,100,100,100, 100,100,50,100]],autoAppend:false,
						colFormat:[[2,3, 4,5,6,7,8,9,10,11, 13,14,15,16,17,18,19,20,21,22,  25,26,27,28,29,30,31,32],[cfNilai,cfNilai, cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,  cfNilai,cfNilai,  cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,  cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],
						pasteEnable:true,autoPaging:true,rowPerPage:20,afterPaste:[this,"doAfterPaste"],
						readOnly:true, defaultRow:1});		
		this.sgn2 = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[0,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3, grid:this.sg2, pager:[this,"doPage2"]});		
		
		this.sg3 = new portalui_saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:2,tag:9,
						colTitle:["Baris INVALID","Keterangan"],
						colWidth:[[1,0],[400,200]],autoAppend:false,
						readOnly:true, defaultRow:1
		});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[0,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3, grid:this.sg3, pager:[this,"doPage2"]});		

		this.sg4 = new saiGrid(this.pc2.childPage[2],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:6,tag:2,
						colTitle:["Kode Akun","DC","No Invoice","Nilai","Kode PP","Jenis"],
						colWidth:[[5,4,3,2,1,0],[120,120,120,300,50,120]],					
						readOnly:true,colFormat:[[3],[cfNilai]],autoAppend:true,defaultRow:1});
		this.sgn4 = new portalui_sgNavigator(this.pc2.childPage[2],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg4});
		this.i_jurnal = new portalui_imageButton(this.sgn4,{bound:[960,2,20,20],hint:"Simulasi Jurnal",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doJurnal"]});		

		this.sg5 = new saiGrid(this.pc2.childPage[2],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:4,tag:2, visible:false,
					colTitle:["Kode Akun","DC","Nilai","Kode PP"],
					colWidth:[[3,2,1,0],[100,100,100,100]],					
					readOnly:true,colFormat:[[2],[cfNilai]],autoAppend:true,defaultRow:1});
		
		this.rearrangeChild(10, 23);
		
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();

		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);

			
		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);

			this.cb_lokasi.setSQL("select kode_lokasi, nama from lokasi where kode_lokasi not in ('"+this.app._lokasi+"','"+this.app._kodeLokasiKonsol+"')",["kode_lokasi","nama"],false,["Kode","Nama"],"and","Data Lokasi",true);		
			this.cb_titip.setSQL("select kode_akun, nama from masakun where kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Daftar Akun",true);
			this.cb_tak.setSQL("select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag='016' "+
			                    "where a.kode_lokasi='"+this.app._lokasi+"'",["a.kode_akun","a.nama"],false,["Kode","Nama"],"and","Daftar Akun TAK",true);			this.cb_buat.setSQL("select nik, nama from karyawan where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Pembuat",true);
			this.cb_app.setSQL("select nik, nama from karyawan where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Approval",true);
			
			var data = this.dbLib.getDataProvider("select a.flag,b.nama from spro a inner join masakun b on a.flag=b.kode_akun and a.kode_lokasi=b.kode_lokasi where kode_spro='KBTTP' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_titip.setText(line.flag,line.nama);
			} else this.cb_titip.setText("","");		

			this.cb_tak.setText("3311101");
			this.cb_lokasi.setText("03");

			var data = this.dbLib.getDataProvider("select nik,nama from karyawan where nik='"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_buat.setText(line.nik,line.nama);
			} else this.cb_buat.setText("","");

			var data = this.dbLib.getDataProvider("select a.flag,b.nama from spro a inner join karyawan b on a.flag=b.nik and a.kode_lokasi=b.kode_lokasi where kode_spro='ARAPP' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_app.setText(line.flag,line.nama);
			} else this.cb_app.setText("","");
			
			var sql = new server_util_arrayList();
			sql.add(
				"select distinct substring(kode_produk,1,3) as kode_produk,akun_piutang from aka_produk "+
				"where kode_produk like 'BPP%' and kode_lokasi ='"+this.app._lokasi+"' "+
				"union "+
				"select distinct kode_produk,akun_piutang from aka_produk "+
				"where kode_produk not like 'BPP%' and kode_lokasi ='"+this.app._lokasi+"' ");												
			this.dbLib.getMultiDataProviderA(sql);
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_aka_aka2_fBatalRekonMulti.extend(window.childForm);
window.app_saku2_transaksi_aka_aka2_fBatalRekonMulti.implement({
	doAfterPaste: function(sender,totalRow){
		try {
			this.sgn2.setTotalPage(sender.getTotalPage());
			this.sgn2.rearrange();	
		} catch(e) {alert(e);}
	},
	doPage2: function(sender,page){
		this.sg2.doSelectPage(page);
	},	
	doValid: function() {	
		try {
			if (this.cb_titip.getText()== "" || this.cb_tak.getText()== "") {
				system.alert(this,"Akun Titipan dan Akun TAK harap diisi."," ");
				return false;
			}

			this.inValid = false;
			var nimAka = "";
			for (var i=0;i < this.sg2.getRowCount();i++){
				if (this.sg2.rowValid(i)){		
					nimAka += ",'"+this.sg2.cells(0,i)+this.sg2.cells(1,i)+"'";
				}
			}
			nimAka = nimAka.substr(1);

			//krn satu inv bisa bbrpa produk,, 
			//yg batal = 0 tidak di jadikan refrensi
			var strSQL = "select a.no_inv,a.nim,a.tahunaka,a.kode_pp,sum(case dc when 'D' then a.nilai else -a.nilai end) as nilai "+
						 "from aka_bill_d a "+
						 "where a.nim+a.tahunaka in ("+nimAka+") and a.kode_lokasi='"+this.app._lokasi+"' "+
						 "group by a.no_inv,a.nim,a.tahunaka,a.kode_pp "+
						 "having sum(case dc when 'D' then a.nilai else -a.nilai end) >0 ";		

			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataINV = data;
			}	

			//"NIM","ThnAka","Ni. Beasiswa","Tot Rekon",  //3										  
			//"Rekon BPP","Rekon SDP2","Rekon UP3","Rekon SKS","Rekon ASUR","Rekon PERPUS","Rekon DENDA","Rekon USTATUS",  //11
			//"Invoice","Ni TagihLama","Ni BeaLama", //14
			//"Rekon BPPLama","Rekon SDP2Lama","Rekon UP3Lama","Rekon SKSLama","Rek ASURLama","Rek PERPUSLama","Rek DENDALama","Rek USTATUSLama", //22
			//"Akun Piutang","KodePP", //24
			//"Bill BPP","Bill SDP2","Bill UP3","Bill SKS","Bill ASUR","Bill PERPUS","Bill DENDA","Bill USTATUS"],  //32											

			for (var i=0; i < this.sg2.getRowCount();i++){
				this.sg2.cells(12,i,"INVALID-BILL");
				
				if (this.dataINV.rs.rows.length > 0) {
					for (var j=0;j < this.dataINV.rs.rows.length;j++){									
						if (this.sg2.cells(0,i) == this.dataINV.rs.rows[j].nim && this.sg2.cells(1,i) == this.dataINV.rs.rows[j].tahunaka) {						

							this.sg2.cells(12,i,this.dataINV.rs.rows[j].no_inv);	
							this.sg2.cells(23,i,"-");	
							this.sg2.cells(24,i,this.dataINV.rs.rows[j].kode_pp);	

							var strSQL = "select a.tagihlama,isnull(c.beapakai,0) as bealama, "+
													
										"isnull(b.bpp,0) + isnull(b.sdp2,0) + isnull(b.up3,0) + isnull(b.sks,0) + isnull(b.asur,0) + isnull(b.perpus,0) + isnull(b.denda,0) + isnull(b.ustatus,0) as totrekonlama, "+

										"isnull(b.bpp,0) as bpplama,isnull(b.sdp2,0) as sdp2lama, isnull(b.up3,0) as up3lama, isnull(b.sks,0) as skslama, "+
										"isnull(b.asur,0) as asurlama,isnull(b.perpus,0) as perpuslama,isnull(b.denda,0) as dendalama,isnull(b.ustatus,0) as ustatuslama, "+
										
										"isnull(d.bpp,0) as bppbill,isnull(d.sdp2,0) as sdp2bill, isnull(d.up3,0) as up3bill, isnull(d.sks,0) as sksbill, "+
										"isnull(d.asur,0) as asurbill,isnull(d.perpus,0) as perpusbill,isnull(d.denda,0) as dendabill,isnull(d.ustatus,0) as ustatusbill "+

										"from "+ 
										"( "+
										"select no_inv,sum(case dc when 'D' then nilai else -nilai end) as tagihlama "+
										"from aka_bill_d "+
										"where no_inv= '"+this.sg2.cells(12,i)+"' and kode_lokasi ='"+this.app._lokasi+"' "+
										"group by no_inv "+
										") a "+

										"inner join ( "+
										"select x.no_inv,sum(x.bpp) as bpp,sum(x.sdp2) as sdp2,sum(x.up3) as up3,sum(x.sks) as sks,sum(x.asur) as asur,sum(x.perpus) as perpus,sum(x.denda) as denda,sum(x.ustatus) as ustatus "+
										"from "+

										"			( "+													
										"				select no_inv, "+
										"				case when substring(kode_produk,1,3) = 'BPP' then sum(case dc when 'D' then nilai else -nilai end) end as bpp, "+
										"				case when kode_produk = 'SDP2' then sum(case dc when 'D' then nilai else -nilai end) end as sdp2, "+
										"				case when kode_produk = 'UP3' then sum(case dc when 'D' then nilai else -nilai end) end as up3, "+
										"				case when kode_produk = 'SKS' then sum(case dc when 'D' then nilai else -nilai end) end as sks, "+
										"				case when kode_produk = 'ASUR' then sum(case dc when 'D' then nilai else -nilai end) end as asur, "+
										"				case when kode_produk = 'PERPUS' then sum(case dc when 'D' then nilai else -nilai end) end as perpus, "+
										"				case when kode_produk = 'DENDA' then sum(case dc when 'D' then nilai else -nilai end) end as denda, "+
										"				case when kode_produk = 'USTATUS' then sum(case dc when 'D' then nilai else -nilai end) end as ustatus  "+
										"				from aka_bill_d "+ 
										"				where no_inv= '"+this.sg2.cells(12,i)+"' and kode_lokasi ='"+this.app._lokasi+"' "+
										"				group by no_inv, kode_produk  "+
										"			) x group by x.no_inv "+

										") d on a.no_inv=d.no_inv "+
										
										"left join ( "+
										"select x.no_inv,sum(x.bpp) as bpp,sum(x.sdp2) as sdp2,sum(x.up3) as up3,sum(x.sks) as sks,sum(x.asur) as asur,sum(x.perpus) as perpus,sum(x.denda) as denda,sum(x.ustatus) as ustatus "+
										"from "+

										"			( "+													
										"				select no_inv, "+
										"				case when substring(kode_produk,1,3) = 'BPP' then sum(case dc when 'D' then nilai else -nilai end) end as bpp, "+
										"				case when kode_produk = 'SDP2' then sum(case dc when 'D' then nilai else -nilai end) end as sdp2, "+
										"				case when kode_produk = 'UP3' then sum(case dc when 'D' then nilai else -nilai end) end as up3, "+
										"				case when kode_produk = 'SKS' then sum(case dc when 'D' then nilai else -nilai end) end as sks, "+
										"				case when kode_produk = 'ASUR' then sum(case dc when 'D' then nilai else -nilai end) end as asur, "+
										"				case when kode_produk = 'PERPUS' then sum(case dc when 'D' then nilai else -nilai end) end as perpus, "+
										"				case when kode_produk = 'DENDA' then sum(case dc when 'D' then nilai else -nilai end) end as denda, "+
										"				case when kode_produk = 'USTATUS' then sum(case dc when 'D' then nilai else -nilai end) end as ustatus  "+
										"				from aka_rekon_d "+ 
										"				where no_inv= '"+this.sg2.cells(12,i)+"' and kode_lokasi ='"+this.app._lokasi+"' "+
										"				group by no_inv, kode_produk  "+
										"			) x group by x.no_inv "+

										") b on a.no_inv=b.no_inv "+
										
										"left join ( "+
										"select no_inv,sum(pakai) as beapakai "+
										"from aka_bill_bea a "+
										"where no_inv= '"+this.sg2.cells(12,i)+"' and kode_lokasi ='"+this.app._lokasi+"' "+
										"group by no_inv  "+
										") c on a.no_inv=c.no_inv ";
							
							var data = this.dbLib.getDataProvider(strSQL,true);
							if (typeof data == "object"){
								var line = data.rs.rows[0];							
								if (line != undefined){					
									this.sg2.cells(13,i,line.tagihlama);	
									this.sg2.cells(14,i,line.bealama);	

									this.sg2.cells(15,i,line.bpplama);
									this.sg2.cells(16,i,line.sdp2lama);
									this.sg2.cells(17,i,line.up3lama);
									this.sg2.cells(18,i,line.skslama);
									this.sg2.cells(19,i,line.asurlama);
									this.sg2.cells(20,i,line.perpuslama);
									this.sg2.cells(21,i,line.dendalama);
									this.sg2.cells(22,i,line.ustatuslama);									

									this.sg2.cells(25,i,line.bppbill);
									this.sg2.cells(26,i,line.sdp2bill);
									this.sg2.cells(27,i,line.up3bill);
									this.sg2.cells(28,i,line.sksbill);
									this.sg2.cells(29,i,line.asurbill);
									this.sg2.cells(30,i,line.perpusbill);
									this.sg2.cells(31,i,line.dendabill);
									this.sg2.cells(32,i,line.ustatusbill);									

								}				
							}

							if (nilaiToFloat(this.sg2.cells(3,i)) > 0) {
								if (parseFloat(line.totrekonlama) == nilaiToFloat(this.sg2.cells(3,i))) {
									//jika total rekonlama sama dgn totrekonbaru, rekon baru <--- diisi dr rekonlama
									this.sg2.cells(4,i,this.sg2.cells(15,i));
									this.sg2.cells(5,i,this.sg2.cells(16,i));
									this.sg2.cells(6,i,this.sg2.cells(17,i));
									this.sg2.cells(7,i,this.sg2.cells(18,i));
									this.sg2.cells(8,i,this.sg2.cells(19,i));
									this.sg2.cells(9,i,this.sg2.cells(20,i));
									this.sg2.cells(10,i,this.sg2.cells(21,i));
									this.sg2.cells(11,i,this.sg2.cells(22,i));
								}							
								else {
									//urutan prioritas: BPP-SKS-SDP2-UP3-PERPUS-DENDA-USTATUS-ASUR
									//jika total rekonlama tidak sama dgn totrekonbaru---> rekonlama dihapus, pakai nilai rekon baru yg dihitung dr nilai billnya
									var rekonbaru = nilaiToFloat(this.sg2.cells(3,i));

									//bpp
									if (rekonbaru > nilaiToFloat(this.sg2.cells(25,i)))
										this.sg2.cells(4,i,this.sg2.cells(25,i));
									else this.sg2.cells(4,i,rekonbaru);
									rekonbaru = rekonbaru - nilaiToFloat(this.sg2.cells(4,i));

									if (rekonbaru > 0) {
										//sks
										if (rekonbaru > nilaiToFloat(this.sg2.cells(26,i)))
											this.sg2.cells(5,i,this.sg2.cells(26,i));
										else this.sg2.cells(5,i,rekonbaru);
									}
									rekonbaru = rekonbaru - nilaiToFloat(this.sg2.cells(5,i));

									if (rekonbaru > 0) {
										//sdp2
										if (rekonbaru > nilaiToFloat(this.sg2.cells(27,i)))
											this.sg2.cells(6,i,this.sg2.cells(27,i));
										else this.sg2.cells(6,i,rekonbaru);
									}
									rekonbaru = rekonbaru - nilaiToFloat(this.sg2.cells(6,i));

									if (rekonbaru > 0) {
										//up3
										if (rekonbaru > nilaiToFloat(this.sg2.cells(28,i)))
											this.sg2.cells(7,i,this.sg2.cells(28,i));
										else this.sg2.cells(7,i,rekonbaru);
									}
									rekonbaru = rekonbaru - nilaiToFloat(this.sg2.cells(7,i));

									if (rekonbaru > 0) {
										//perpus
										if (rekonbaru > nilaiToFloat(this.sg2.cells(29,i)))
											this.sg2.cells(8,i,this.sg2.cells(29,i));
										else this.sg2.cells(8,i,rekonbaru);
									}
									rekonbaru = rekonbaru - nilaiToFloat(this.sg2.cells(8,i));

									if (rekonbaru > 0) {
										//denda
										if (rekonbaru > nilaiToFloat(this.sg2.cells(30,i)))
											this.sg2.cells(9,i,this.sg2.cells(30,i));
										else this.sg2.cells(9,i,rekonbaru);
									}
									rekonbaru = rekonbaru - nilaiToFloat(this.sg2.cells(9,i));

									if (rekonbaru > 0) {
										//ustatus
										if (rekonbaru > nilaiToFloat(this.sg2.cells(31,i)))
											this.sg2.cells(10,i,this.sg2.cells(31,i));
										else this.sg2.cells(10,i,rekonbaru);
									}
									rekonbaru = rekonbaru - nilaiToFloat(this.sg2.cells(10,i));

									if (rekonbaru > 0) {
										//asur
										if (rekonbaru > nilaiToFloat(this.sg2.cells(32,i)))
											this.sg2.cells(11,i,this.sg2.cells(32,i));
										else this.sg2.cells(11,i,rekonbaru);
									}
									rekonbaru = rekonbaru - nilaiToFloat(this.sg2.cells(11,i));

								}
							}

							//nilai bea baru melebihi nilai billing lama
							if (nilaiToFloat(this.sg2.cells(13,i)) < nilaiToFloat(this.sg2.cells(2,i))) {
								this.sg2.cells(11,i,"INVALID-BEA");									
							}							
							
						}
					}	
					if (this.sg2.cells(12,i).substr(0,7) == "INVALID") this.inValid = true;			
				}											
			}	

			if (this.inValid == false) {
				this.doJurnal();
				setTipeButton(tbSimpan);	
			}
			else {
				this.pc2.setActivePage(this.pc2.childPage[1]);	
				this.sg3.clear();
				for (var i=0; i < this.sg2.getRowCount();i++) {
					if (this.sg2.cells(12,i).substr(0,7) == "INVALID") {
						var j = i+1;
						if (this.sg2.cells(12,i) == "INVALID-BILL") var desk = "NIM/THNAKA tidak terdaftar";
						if (this.sg2.cells(12,i) == "INVALID-BEA") var desk = "Kolom Nilai Beasiswa Baru melebihi Total Tagihan Lama";						
						this.sg3.appendData([j,desk]);						
					}
				}
			}
		}
		catch(e) {
			alert(e);
		}			
	},
	doJurnal : function() {
		this.sg4.clear();
		var slsBpp = totBpp = totBea = 0;
		var slsSdp2 = totSdp2 = 0;
		var slsUp3 = totUp3 = 0;
		var slsSks = totSks = 0;
		var slsAsur = totAsur = 0;
		var slsPerpus = totPerpus = 0;
		var slsDenda = totDenda = 0;
		var slsStatus = totStatus = 0;

		for (var i=0; i < this.sg2.getRowCount();i++){			
			if (this.sg2.cells(12,i).substr(0,7) != "INVALID") {

				//pdd dan piutang(BPP)
				if (nilaiToFloat(this.sg2.cells(4,i)) != nilaiToFloat(this.sg2.cells(15,i))) {		
					var akun = this.dataProd.get("BPP");
					if (akun) this.sg2.cells(23,i,akun);
					else this.sg2.cells(23,i,"-");
					
					slsBpp = nilaiToFloat(this.sg2.cells(4,i)) - nilaiToFloat(this.sg2.cells(15,i));
					totBpp += slsBpp;

					if (slsBpp < 0) {
						var dcBpp = "C"; 
						var dcPiu = "D"; 
					}
					else {
						var dcBpp = "D";
						var dcPiu = "C"; 
					}

					this.sg4.appendData([this.cb_titip.getText(),dcBpp,this.sg2.cells(12,i),Math.abs(slsBpp),this.sg2.cells(24,i),"PDDPIU"]);										
					this.sg4.appendData([this.sg2.cells(23,i),dcPiu,this.sg2.cells(12,i),Math.abs(slsBpp),this.sg2.cells(24,i),"PIUBPP"]);										
				}

				//pdd dan piutang(sdp2)
				if (nilaiToFloat(this.sg2.cells(5,i)) != nilaiToFloat(this.sg2.cells(16,i))) {				
					var akun = this.dataProd.get("SDP2");
					if (akun) this.sg2.cells(23,i,akun);
					else this.sg2.cells(23,i,"-");
					
					slsSdp2 = nilaiToFloat(this.sg2.cells(5,i)) - nilaiToFloat(this.sg2.cells(16,i));
					totSdp2 += slsSdp2;

					if (slsSdp2 < 0) {
						var dcSdp2 = "C"; 
						var dcPiu = "D"; 
					}
					else {
						var dcSdp2 = "D";
						var dcPiu = "C"; 
					}

					this.sg4.appendData([this.cb_titip.getText(),dcSdp2,this.sg2.cells(12,i),Math.abs(slsSdp2),this.sg2.cells(24,i),"PDDPIU"]);										
					this.sg4.appendData([this.sg2.cells(23,i),dcPiu,this.sg2.cells(12,i),Math.abs(slsSdp2),this.sg2.cells(24,i),"PIUSDP2"]);										
				}

				//pdd dan piutang(up3)				
				if (nilaiToFloat(this.sg2.cells(6,i)) != nilaiToFloat(this.sg2.cells(17,i))) {				
					var akun = this.dataProd.get("UP3");
					if (akun) this.sg2.cells(23,i,akun);
					else this.sg2.cells(23,i,"-");
					
					slsUp3 = nilaiToFloat(this.sg2.cells(6,i)) - nilaiToFloat(this.sg2.cells(17,i));
					totUp3 += slsUp3;

					if (slsUp3 < 0) {
						var dcUp3 = "C"; 
						var dcPiu = "D"; 
					}
					else {
						var dcUp3 = "D";
						var dcPiu = "C"; 
					}

					this.sg4.appendData([this.cb_titip.getText(),dcUp3,this.sg2.cells(12,i),Math.abs(slsUp3),this.sg2.cells(24,i),"PDDPIU"]);										
					this.sg4.appendData([this.sg2.cells(23,i),dcPiu,this.sg2.cells(12,i),Math.abs(slsUp3),this.sg2.cells(24,i),"PIUUP3"]);										
				}

				//pdd dan piutang(sks)
				if (nilaiToFloat(this.sg2.cells(7,i)) != nilaiToFloat(this.sg2.cells(18,i))) {		
					var akun = this.dataProd.get("SKS");
					if (akun) this.sg2.cells(23,i,akun);
					else this.sg2.cells(23,i,"-");
							
					slsSks = nilaiToFloat(this.sg2.cells(7,i)) - nilaiToFloat(this.sg2.cells(18,i));
					totSks += slsSks;

					if (slsSks < 0) {
						var dcSks = "C"; 
						var dcPiu = "D"; 
					}
					else {
						var dcSks = "D";
						var dcPiu = "C"; 
					}

					this.sg4.appendData([this.cb_titip.getText(),dcSks,this.sg2.cells(12,i),Math.abs(slsSks),this.sg2.cells(24,i),"PDDPIU"]);										
					this.sg4.appendData([this.sg2.cells(23,i),dcPiu,this.sg2.cells(12,i),Math.abs(slsSks),this.sg2.cells(24,i),"PIUSKS"]);										
				}

				//pdd dan piutang(asur)
				if (nilaiToFloat(this.sg2.cells(8,i)) != nilaiToFloat(this.sg2.cells(19,i))) {			
					var akun = this.dataProd.get("ASUR");
					if (akun) this.sg2.cells(23,i,akun);
					else this.sg2.cells(23,i,"-");
						
					slsAsur = nilaiToFloat(this.sg2.cells(8,i)) - nilaiToFloat(this.sg2.cells(19,i));
					totAsur += slsAsur;

					if (slsAsur < 0) {
						var dcAsur = "C"; 
						var dcPiu = "D"; 
					}
					else {
						var dcAsur = "D";
						var dcPiu = "C"; 
					}

					this.sg4.appendData([this.cb_titip.getText(),dcAsur,this.sg2.cells(12,i),Math.abs(slsAsur),this.sg2.cells(24,i),"PDDPIU"]);										
					this.sg4.appendData([this.sg2.cells(23,i),dcPiu,this.sg2.cells(12,i),Math.abs(slsAsur),this.sg2.cells(24,i),"PIUASUR"]);										
				}

				//pdd dan piutang(perpus)
				if (nilaiToFloat(this.sg2.cells(9,i)) != nilaiToFloat(this.sg2.cells(20,i))) {		
					var akun = this.dataProd.get("PERPUS");
					if (akun) this.sg2.cells(23,i,akun);
					else this.sg2.cells(23,i,"-");
							
					slsPerpus = nilaiToFloat(this.sg2.cells(9,i)) - nilaiToFloat(this.sg2.cells(20,i));
					totPerpus += slsPerpus;

					if (slsAsur < 0) {
						var dcPerpus = "C"; 
						var dcPiu = "D"; 
					}
					else {
						var dcPerpus = "D";
						var dcPiu = "C"; 
					}

					this.sg4.appendData([this.cb_titip.getText(),dcPerpus,this.sg2.cells(12,i),Math.abs(slsPerpus),this.sg2.cells(24,i),"PDDPIU"]);										
					this.sg4.appendData([this.sg2.cells(23,i),dcPiu,this.sg2.cells(12,i),Math.abs(slsPerpus),this.sg2.cells(24,i),"PIUPRPUS"]);										
				}

				//pdd dan piutang(denda)
				if (nilaiToFloat(this.sg2.cells(10,i)) != nilaiToFloat(this.sg2.cells(21,i))) {				
					var akun = this.dataProd.get("DENDA");
					if (akun) this.sg2.cells(23,i,akun);
					else this.sg2.cells(23,i,"-");
					
					slsDenda = nilaiToFloat(this.sg2.cells(10,i)) - nilaiToFloat(this.sg2.cells(21,i));
					totDenda += slsDenda;

					if (slsDenda < 0) {
						var dcDenda = "C"; 
						var dcPiu = "D"; 
					}
					else {
						var dcDenda = "D";
						var dcPiu = "C"; 
					}

					this.sg4.appendData([this.cb_titip.getText(),dcDenda,this.sg2.cells(12,i),Math.abs(slsDenda),this.sg2.cells(24,i),"PDDPIU"]);										
					this.sg4.appendData([this.sg2.cells(23,i),dcPiu,this.sg2.cells(12,i),Math.abs(slsDenda),this.sg2.cells(24,i),"PIUDENDA"]);										
				}

				//pdd dan piutang(ustatus)
				if (nilaiToFloat(this.sg2.cells(11,i)) != nilaiToFloat(this.sg2.cells(22,i))) {			
					var akun = this.dataProd.get("USTATUS");
					if (akun) this.sg2.cells(23,i,akun);
					else this.sg2.cells(23,i,"-");
						
					slsStatus = nilaiToFloat(this.sg2.cells(11,i)) - nilaiToFloat(this.sg2.cells(22,i));
					totStatus += slsStatus;

					if (slsStatus < 0) {
						var dcStatus = "C"; 
						var dcPiu = "D"; 
					}
					else {
						var dcStatus = "D";
						var dcPiu = "C"; 
					}

					this.sg4.appendData([this.cb_titip.getText(),dcStatus,this.sg2.cells(12,i),Math.abs(slsStatus),this.sg2.cells(24,i),"PDDPIU"]);										
					this.sg4.appendData([this.sg2.cells(23,i),dcPiu,this.sg2.cells(12,i),Math.abs(slsStatus),this.sg2.cells(24,i),"PIUSTS"]);										
				}

				//beasiswa dan tak
				if (nilaiToFloat(this.sg2.cells(2,i)) != nilaiToFloat(this.sg2.cells(14,i))) {
					slsBea = nilaiToFloat(this.sg2.cells(2,i)) - nilaiToFloat(this.sg2.cells(14,i));
					totBea += slsBea;

					if (slsBea < 0) {
						var dcPdd = "D"; 
						var dcTak = "C"; 
					}
					else {
						var dcPdd = "C";
						var dcTak = "D"; 
					}
					this.sg4.appendData([this.cb_titip.getText(),dcPdd,this.sg2.cells(12,i),Math.abs(slsBea),this.sg2.cells(24,i),"TAKPDD"]);										
					this.sg4.appendData([this.cb_tak.getText(),dcTak,this.sg2.cells(12,i),Math.abs(slsBea),this.sg2.cells(24,i),"TAK"]);										
				}
			}
		}
		this.e_bpp.setText(floatToNilai(totBpp));
		this.e_sdp2.setText(floatToNilai(totSdp2));
		this.e_up3.setText(floatToNilai(totUp3));
		this.e_sks.setText(floatToNilai(totSks));
		this.e_asur.setText(floatToNilai(totAsur));
		this.e_perpus.setText(floatToNilai(totPerpus));
		this.e_denda.setText(floatToNilai(totDenda));
		this.e_status.setText(floatToNilai(totStatus));

		this.e_bea.setText(floatToNilai(totBea));

		this.doRekap();
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
	doRekap : function() {
		//"Kode Akun","DC","Nilai","Kode PP"]
		//rekap jurnal non TAK
		
		this.sg5.clear();
		var totnilai = nilai = 0; 

		for (var i=0;i < this.sg4.rows.getLength();i++){						
			if (this.sg4.rowValid(i) && this.sg4.cells(5,i).substr(0,3) != "TAK") {				
				nilai = nilaiToFloat(this.sg4.cells(3,i));				
				
				var isAda = false;				
				for (var j=0;j < this.sg5.getRowCount();j++){
					if ((this.sg4.cells(0,i) == this.sg5.cells(0,j))  &&  (this.sg4.cells(1,i) == this.sg5.cells(1,j))  && (this.sg4.cells(4,i) == this.sg5.cells(3,j)) ) {
						isAda = true;
						idx = j;
						break;
					}
				}		
				
				
				if (!isAda) {
					this.sg5.appendData([this.sg4.cells(0,i),this.sg4.cells(1,i),floatToNilai(nilai),this.sg4.cells(4,i)]);
				} 
				else { 					
					totnilai = nilaiToFloat(this.sg5.cells(2,idx));
					totnilai = totnilai + nilai;
					this.sg5.setCell(2,idx,totnilai);
				}								
			}
		}	
	},
	simpan: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{													
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();					
					
					//rekon bayar
					this.nbRekon = "-";
					var totPDD = nilaiToFloat(this.e_bpp.getText()) + nilaiToFloat(this.e_sdp2.getText()) + nilaiToFloat(this.e_up3.getText()) + nilaiToFloat(this.e_sks.getText()) +
								 nilaiToFloat(this.e_asur.getText()) + nilaiToFloat(this.e_perpus.getText()) + nilaiToFloat(this.e_denda.getText()) + nilaiToFloat(this.e_status.getText());

					if (totPDD != 0) {
						this.nbRekon = this.e_nb.getText();						
						sql.add("insert into aka_rekon_m(no_rekon,no_dokumen,tanggal,keterangan,nilai,posted,modul,akun_titip,nim,nik_buat,nik_app,kode_lokasi,periode,nik_user,tgl_input) values "+
										"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"',"+totPDD+",'F','BTLREKON','"+this.cb_titip.getText()+"','-','"+this.cb_buat.getText()+"','"+this.cb_app.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate())");
						
						for (var i=0;i < this.sg5.getRowCount();i++){
							if (this.sg5.rowValid(i)){								
								sql.add("insert into aka_rekon_j(no_rekon,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
										"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',"+i+",'"+this.sg5.cells(0,i)+"','"+this.e_ket.getText()+"','"+this.sg5.cells(1,i)+"',"+nilaiToFloat(this.sg5.cells(2,i))+",'"+this.sg5.cells(3,i)+"','-','"+this.app._lokasi+"','BTLREKON','NONTAK','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");															
							}
						}				
					}

					//beasiswa
					if (this.e_bea.getText() != "0") {
						if (nilaiToFloat(this.e_bea.getText()) < 0) {
							var dcPDD = "D";
							var dcTAK = "C";
						}
						else {
							var dcPDD = "C";
							var dcTAK = "D";
						}
						//jurnal tak gelondongan saja
						sql.add("insert into takkirim_m(no_kirim,kode_lokasi,periode,tanggal,no_dokumen,keterangan,kode_pp,modul,jenis,kode_curr,kurs,nilai,nik_buat,nik_setuju,posted,no_del,no_link,ref1,tgl_input,nik_user,kode_loktuj,progress,no_terima,due_date) values "+
										"('"+this.e_nbtak.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.nbRekon+"','"+this.e_ket.getText()+"','"+this.app._kodePP+"','TAKBEA','KIRIM','IDR',1,"+Math.abs(nilaiToFloat(this.e_bea.getText()))+",'"+this.cb_buat.getText()+"','"+this.cb_app.getText()+"','F','-','"+this.cb_titip.getText()+"','"+this.cb_tak.getText()+"',getdate(),'"+this.app._userLog+"','"+this.cb_lokasi.getText()+"','0','-','"+this.dp_d1.getDateString()+"')");		

						sql.add("insert into takkirim_j(no_kirim,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
										"('"+this.e_nbtak.getText()+"','"+this.e_nb.getText()+"','"+this.dp_d1.getDateString()+"',0,'"+this.cb_tak.getText()+"','"+this.e_ket.getText()+"','"+dcTAK+"',"+Math.abs(nilaiToFloat(this.e_bea.getText()))+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','TAKBEA','TAK','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");															
						sql.add("insert into takkirim_j(no_kirim,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
										"('"+this.e_nbtak.getText()+"','"+this.e_nb.getText()+"','"+this.dp_d1.getDateString()+"',1,'"+this.cb_titip.getText()+"','"+this.e_ket.getText()+"','"+dcPDD+"',"+Math.abs(nilaiToFloat(this.e_bea.getText()))+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','TAKBEA','PDD','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");																							
					}


					//--------------------- detail
					for (var i=0;i < this.sg2.getRowCount();i++){						
						//pdd dan piutang(BPP)
						if (nilaiToFloat(this.sg2.cells(4,i)) != nilaiToFloat(this.sg2.cells(15,i))) {				
							var slsBpp = nilaiToFloat(this.sg2.cells(4,i)) - nilaiToFloat(this.sg2.cells(15,i));
							if (slsBpp < 0) var dc = "C"; //kelebihan bayar saat rekon sebelumnya (nilai rekon baru < nilai rekon lama)
							else var dc = "D";            //kekurangan bayar saat rekon sebelumnya (nilai rekon baru > nilai rekon lama)
							sql.add("insert into aka_rekon_d(no_rekon,nim,no_inv,periode,nilai,kode_lokasi,akun_titip,akun_piutang,kode_produk,dc,modul,id_bank)  "+
									"select top 1 '"+this.e_nb.getText()+"',nim,no_inv,'"+this.e_periode.getText()+"',"+Math.abs(slsBpp)+",kode_lokasi,'"+this.cb_titip.getText()+"',akun_piutang,kode_produk,'"+dc+"','BTLREKON','-' "+
									"from aka_bill_d where kode_produk like 'BPP%' and no_inv='"+this.sg2.cells(12,i)+"' and kode_lokasi='"+this.app._lokasi+"' and dc ='D'");
						}

						//pdd dan piutang(sdp2)
						if (nilaiToFloat(this.sg2.cells(5,i)) != nilaiToFloat(this.sg2.cells(16,i))) {				
							var slsSdp2 = nilaiToFloat(this.sg2.cells(5,i)) - nilaiToFloat(this.sg2.cells(16,i));
							if (slsSdp2 < 0) var dc = "C"; //kelebihan bayar saat rekon sebelumnya (nilai rekon baru < nilai rekon lama)
							else var dc = "D";             //kekurangan bayar saat rekon sebelumnya (nilai rekon baru > nilai rekon lama)
							sql.add("insert into aka_rekon_d(no_rekon,nim,no_inv,periode,nilai,kode_lokasi,akun_titip,akun_piutang,kode_produk,dc,modul,id_bank)  "+
										"select top 1 '"+this.e_nb.getText()+"',nim,no_inv,'"+this.e_periode.getText()+"',"+Math.abs(slsSdp2)+",kode_lokasi,'"+this.cb_titip.getText()+"',akun_piutang,kode_produk,'"+dc+"','BTLREKON','-' "+
										"from aka_bill_d where kode_produk = 'SDP2' and no_inv='"+this.sg2.cells(12,i)+"' and kode_lokasi='"+this.app._lokasi+"' and dc ='D'");													
						}

						//pdd dan piutang(up3)
						if (nilaiToFloat(this.sg2.cells(6,i)) != nilaiToFloat(this.sg2.cells(17,i))) {				
							var slsUp3 = nilaiToFloat(this.sg2.cells(6,i)) - nilaiToFloat(this.sg2.cells(17,i));
							if (slsUp3 < 0) var dc = "C"; //kelebihan bayar saat rekon sebelumnya (nilai rekon baru < nilai rekon lama)
							else var dc = "D";            //kekurangan bayar saat rekon sebelumnya (nilai rekon baru > nilai rekon lama)
							sql.add("insert into aka_rekon_d(no_rekon,nim,no_inv,periode,nilai,kode_lokasi,akun_titip,akun_piutang,kode_produk,dc,modul,id_bank)  "+
										"select top 1 '"+this.e_nb.getText()+"',nim,no_inv,'"+this.e_periode.getText()+"',"+Math.abs(slsUp3)+",kode_lokasi,'"+this.cb_titip.getText()+"',akun_piutang,kode_produk,'"+dc+"','BTLREKON','-' "+
										"from aka_bill_d where kode_produk = 'UP3' and no_inv='"+this.sg2.cells(12,i)+"' and kode_lokasi='"+this.app._lokasi+"' and dc ='D'");													
						}

						//pdd dan piutang(sks)
						if (nilaiToFloat(this.sg2.cells(7,i)) != nilaiToFloat(this.sg2.cells(18,i))) {				
							var slsSks = nilaiToFloat(this.sg2.cells(7,i)) - nilaiToFloat(this.sg2.cells(18,i));
							if (slsSks < 0) var dc = "C"; //kelebihan bayar saat rekon sebelumnya (nilai rekon baru < nilai rekon lama)
							else var dc = "D";            //kekurangan bayar saat rekon sebelumnya (nilai rekon baru > nilai rekon lama)
							sql.add("insert into aka_rekon_d(no_rekon,nim,no_inv,periode,nilai,kode_lokasi,akun_titip,akun_piutang,kode_produk,dc,modul,id_bank)  "+
										"select top 1 '"+this.e_nb.getText()+"',nim,no_inv,'"+this.e_periode.getText()+"',"+Math.abs(slsSks)+",kode_lokasi,'"+this.cb_titip.getText()+"',akun_piutang,kode_produk,'"+dc+"','BTLREKON','-' "+
										"from aka_bill_d where kode_produk = 'SKS' and no_inv='"+this.sg2.cells(12,i)+"' and kode_lokasi='"+this.app._lokasi+"' and dc ='D'");													
						}

						//pdd dan piutang(asur)
						if (nilaiToFloat(this.sg2.cells(8,i)) != nilaiToFloat(this.sg2.cells(19,i))) {				
							var slsAsur = nilaiToFloat(this.sg2.cells(8,i)) - nilaiToFloat(this.sg2.cells(19,i));
							if (slsAsur < 0) var dc = "C"; //kelebihan bayar saat rekon sebelumnya (nilai rekon baru < nilai rekon lama)
							else var dc = "D";             //kekurangan bayar saat rekon sebelumnya (nilai rekon baru > nilai rekon lama)
							sql.add("insert into aka_rekon_d(no_rekon,nim,no_inv,periode,nilai,kode_lokasi,akun_titip,akun_piutang,kode_produk,dc,modul,id_bank)  "+
										"select top 1 '"+this.e_nb.getText()+"',nim,no_inv,'"+this.e_periode.getText()+"',"+Math.abs(slsAsur)+",kode_lokasi,'"+this.cb_titip.getText()+"',akun_piutang,kode_produk,'"+dc+"','BTLREKON','-' "+
										"from aka_bill_d where kode_produk = 'ASUR' and no_inv='"+this.sg2.cells(12,i)+"' and kode_lokasi='"+this.app._lokasi+"' and dc ='D'");													
						}

						//pdd dan piutang(perpus)
						if (nilaiToFloat(this.sg2.cells(9,i)) != nilaiToFloat(this.sg2.cells(20,i))) {				
							var slsPerpus = nilaiToFloat(this.sg2.cells(9,i)) - nilaiToFloat(this.sg2.cells(20,i));
							if (slsPerpus < 0) var dc = "C"; //kelebihan bayar saat rekon sebelumnya (nilai rekon baru < nilai rekon lama)
							else var dc = "D";               //kekurangan bayar saat rekon sebelumnya (nilai rekon baru > nilai rekon lama)
							sql.add("insert into aka_rekon_d(no_rekon,nim,no_inv,periode,nilai,kode_lokasi,akun_titip,akun_piutang,kode_produk,dc,modul,id_bank)  "+
										"select top 1 '"+this.e_nb.getText()+"',nim,no_inv,'"+this.e_periode.getText()+"',"+Math.abs(slsPerpus)+",kode_lokasi,'"+this.cb_titip.getText()+"',akun_piutang,kode_produk,'"+dc+"','BTLREKON','-' "+
										"from aka_bill_d where kode_produk = 'PERPUS' and no_inv='"+this.sg2.cells(12,i)+"' and kode_lokasi='"+this.app._lokasi+"' and dc ='D'");													
						}

						//pdd dan piutang(denda)
						if (nilaiToFloat(this.sg2.cells(10,i)) != nilaiToFloat(this.sg2.cells(21,i))) {				
							var slsDenda = nilaiToFloat(this.sg2.cells(10,i)) - nilaiToFloat(this.sg2.cells(21,i));
							if (slsDenda < 0) var dc = "C"; //kelebihan bayar saat rekon sebelumnya (nilai rekon baru < nilai rekon lama)
							else var dc = "D";              //kekurangan bayar saat rekon sebelumnya (nilai rekon baru > nilai rekon lama)
							sql.add("insert into aka_rekon_d(no_rekon,nim,no_inv,periode,nilai,kode_lokasi,akun_titip,akun_piutang,kode_produk,dc,modul,id_bank)  "+
										"select top 1 '"+this.e_nb.getText()+"',nim,no_inv,'"+this.e_periode.getText()+"',"+Math.abs(slsDenda)+",kode_lokasi,'"+this.cb_titip.getText()+"',akun_piutang,kode_produk,'"+dc+"','BTLREKON','-' "+
										"from aka_bill_d where kode_produk = 'DENDA' and no_inv='"+this.sg2.cells(12,i)+"' and kode_lokasi='"+this.app._lokasi+"' and dc ='D'");													
						}

						//pdd dan piutang(ustatus)
						if (nilaiToFloat(this.sg2.cells(11,i)) != nilaiToFloat(this.sg2.cells(22,i))) {				
							var slsStatus = nilaiToFloat(this.sg2.cells(11,i)) - nilaiToFloat(this.sg2.cells(22,i));
							if (slsStatus < 0) var dc = "C"; //kelebihan bayar saat rekon sebelumnya (nilai rekon baru < nilai rekon lama)
							else var dc = "D";              //kekurangan bayar saat rekon sebelumnya (nilai rekon baru > nilai rekon lama)
							sql.add("insert into aka_rekon_d(no_rekon,nim,no_inv,periode,nilai,kode_lokasi,akun_titip,akun_piutang,kode_produk,dc,modul,id_bank)  "+
										"select top 1 '"+this.e_nb.getText()+"',nim,no_inv,'"+this.e_periode.getText()+"',"+Math.abs(slsStatus)+",kode_lokasi,'"+this.cb_titip.getText()+"',akun_piutang,kode_produk,'"+dc+"','BTLREKON','-' "+
										"from aka_bill_d where kode_produk = 'USTATUS' and no_inv='"+this.sg2.cells(12,i)+"' and kode_lokasi='"+this.app._lokasi+"' and dc ='D'");													
						}

						//---------- beasiswa			
						if (nilaiToFloat(this.sg2.cells(2,i)) != nilaiToFloat(this.sg2.cells(14,i))) {											
							if (nilaiToFloat(this.sg2.cells(14,i)) != 0) {
								sql.add("insert into aka_bill_bea_h (no_batal,no_bill,kode_lokasi,no_inv,nim,flag_status,periode,kode_produk,nilai,no_rekon,no_tak,pakai) "+
												"select '"+this.e_nbtak.getText()+"',no_bill,kode_lokasi,no_inv,nim,flag_status,periode,kode_produk,nilai,no_rekon,no_tak,pakai "+
												"from aka_bill_bea where no_inv='"+this.sg2.cells(12,i)+"' and kode_lokasi='"+this.app._lokasi+"'");		
							
								sql.add("update aka_bill_bea set no_rekon='"+this.e_nbtak.getText()+"',pakai="+nilaiToFloat(this.sg2.cells(2,i))+",no_tak='"+this.e_nbtak.getText()+"' where no_inv='"+this.sg2.cells(12,i)+"' and kode_lokasi='"+this.app._lokasi+"'");			
							}
							else {
								//bea baru (di data lama tidak dapat bea)								
								var perBill = "20"+this.sg2.cells(12,i).substr(6,4);
								sql.add("insert into aka_bill_bea (no_bill,kode_lokasi,no_inv,nim,flag_status,periode,kode_produk,nilai,no_rekon,no_tak,pakai) values "+
									    "('"+this.sg2.cells(12,i).substr(0,15)+"','"+this.app._lokasi+"','"+this.sg2.cells(12,i)+"','"+this.sg2.cells(0,i)+"','AKTIF','"+perBill+"','BEA',"+nilaiToFloat(this.sg2.cells(2,i))+",'"+this.e_nbtak.getText()+"','"+this.e_nbtak.getText()+"',"+nilaiToFloat(this.sg2.cells(2,i))+")");
							}
						}						
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
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event){
			case "clear" :
				if (modalResult == mrOk)
					this.standarLib.clearByTag(this, new Array("0","1"),undefined);
					this.sg2.clear(1); this.sg3.clear(1); this.sg4.clear(1); this.sg5.clear(1); 
					setTipeButton(tbSimpan);
					this.pc2.setActivePage(this.pc2.childPage[0]);			
				break;
			case "simpan" :	
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);		
				this.doRekap();		
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}
				if (parseFloat(this.app._periode) < parseFloat(this.e_periode.getText())){
					if (this.app._pernext == "1")
					  system.confirm(this, "simpancek", "Periode transaksi melebihi periode aktif sistem.["+this.app._periode+"]","Data akan disimpan?");
					else{
						system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh melebihi periode aktif sistem.["+this.app._periode+"]");
						return false;
					}
				}
				else this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;			
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.e_periode.setText(y+""+m);		
		this.e_nb.setText("");
	},
	doClick:function(sender){
		if (sender == this.i_gen) {
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"aka_rekon_m","no_rekon",this.app._lokasi+"-BRN"+this.e_periode.getText().substr(2,4)+".","0000"));
			this.e_nbtak.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"takkirim_m","no_kirim",this.app._lokasi+"-TK"+this.e_periode.getText().substr(2,4)+".","0000"));						
			this.e_ket.setFocus();
		}
	},	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
				/*
				case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							system.info(this,"Transaksi telah sukses tersimpan.","");
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
					break;
				*/
				
					case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
						  if (this.nbRekon != "-") {
						  	this.nama_report="server_report_saku2_kopeg_aka_rptAkRekonJurnal";
							  this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_rekon='"+this.nbRekon+"' ";
						  }
						  else {
							this.nama_report="server_report_saku3_tm_rptTakKirim";
							this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_kirim='"+this.e_nbtak.getText()+"' ";
						  }
						  this.filter = this.filter2;
						  this.viewer.prepare();
						  this.viewer.setVisible(true);
						  this.app._mainForm.pButton.setVisible(false);
						  this.app._mainForm.reportNavigator.setVisible(true);
						  this.viewer.setTotalPage(this.report.getTotalPage(this.nama_report,this.filter,1,this.filter2));
						  this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
						  this.app._mainForm.reportNavigator.rearrange();
						  this.showFilter = undefined;
						  this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter, 1,  1, this.showFilter, this.app._namalokasi,this.filter2));
						  this.page = 1;
						  this.allBtn = false;
						  this.pc2.hide();							
						}else system.info(this,result,"");
					break;
					
					case "getMultiDataProvider":
						eval("result = "+result+";");
						if (typeof result != "string"){
							this.dataProd = new portalui_arrayMap();							
							if (result.result[0]){	    			        
								var line;
								for (var i in result.result[0].rs.rows){
									line = result.result[0].rs.rows[i];									
									this.dataProd.set(line.kode_produk, line.akun_piutang);										
								}								
							}							

						}else throw result;
					break;

	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
		}	    
	},
	doCloseReportClick: function(sender){
		switch(sender.getName()){
			case "PreviewBtn" :        
				window.open(this.report.previewWithHeader(this.nama_report,this.filter,1,1, this.showFilter,this.app._namalokasi,this.filter2));
			break;
			case "PrintBtn" :
				this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter,1,1, this.showFilter,this.app._namalokasi,this.filter2));
				try
				{
					window.frames[this.viewer.getFullId() +"_iframe"].focus();
					window.frames[this.viewer.getFullId() +"_iframe"].print();
				}catch(e)
				{alert(e);}
			break;
			default :
				this.pc2.show();   
				this.viewer.setVisible(false);
				this.app._mainForm.pButton.setVisible(true);
				this.app._mainForm.reportNavigator.setVisible(false);  
				this.clearLayar();			
			break;
		}
	},
	clearLayar : function(){
		try {
			this.standarLib.clearByTag(this, new Array("0","1"),undefined);
			this.sg2.clear(1); this.sg3.clear(1); this.sg4.clear(1); this.sg5.clear(1); 
			setTipeButton(tbSimpan);
			this.pc2.setActivePage(this.pc2.childPage[0]);			
		} catch(e) {
			alert(e);
		}
	}
});
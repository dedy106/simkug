window.app_saku3_transaksi_tu_ntf21_fHonorPeg = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_tu_ntf21_fHonorPeg.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_tu_ntf21_fHonorPeg";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Pengajuan Honor Pegawai", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,13,202,20],caption:"Periode",tag:2,readOnly:true, visible:false,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,13,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,13,100,18],selectDate:[this,"doSelectDate"]}); 

		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["Data Pengajuan","List Pengajuan"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-30],colCount:4,tag:9,
		            colTitle:["No Agenda","Tanggal","Deskripsi","Nilai"],
					colWidth:[[3,2,1,0],[100,400,80,100]],
					colFormat:[[3],[cfNilai]],												
					readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data by PP",click:[this,"doLoad3"]});				
		
		this.c_jenis = new saiCB(this.pc2.childPage[0],{bound:[20,11,200,20],caption:"Kode Transaksi",items:["UMUM"], readOnly:true,tag:2, visible:false});
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,11,200,20],caption:"No Bukti",maxLength:30,readOnly:true,visible:true});		
		this.cb_app = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,14,220,20],caption:"NIK Approve",tag:1,multiSelection:false});         				
		this.cb_pp = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,11,220,20],caption:"Bagian / Unit",tag:2,multiSelection:false,change:[this,"doChange"]}); 		
		
		this.cb_id = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,19,220,20],caption:"ID Proyek",tag:1,multiSelection:false,change:[this,"doChange"]}); 				
		this.c_bayar = new saiCB(this.pc2.childPage[0],{bound:[790,19,200,20],caption:"Jenis Bayar",items:["TRANSFER"], readOnly:true,tag:2,change:[this,"doChange"]});
		this.e_uraian = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,16,550,20],caption:"Deskripsi Proyek", readOnly:true});				
		this.e_tgladm = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,16,200,20],caption:"TglMax Adminstrsi", tag:1, readOnly:true});								
		this.cb_akun = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,14,220,20],caption:"Akun BDD",tag:1,readOnly:true});         										
		this.e_nsaldo = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,14,200,20],caption:"Saldo OR", tag:1, tipeText:ttNilai, text:"0",readOnly:true});						
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,16,450,20],caption:"Uraian", maxLength:150});				
		this.e_bruto = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,16,200,20],caption:"Bruto", tag:1, tipeText:ttNilai, text:"0",readOnly:true});				
		this.e_user = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,17,450,20],caption:"User input", maxLength:50});								
		this.e_netto = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,17,200,20],caption:"Netto", tag:1, tipeText:ttNilai, text:"0",readOnly:true});		
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[5,20,990,210], childPage:["Detail Gaji","Error Data"]});		
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[0,5,this.pc1.width-5,this.pc1.height-35],colCount:9,tag:0,
				colTitle:["NIK","Bruto","Pot. Pajak","Netto","Berita","Nama Pegawai","NPWP","Rekening","Kode Jenis"],
				colWidth:[[8,7,6,5,4,3,2,1,0],[80,150,80,150,150,80,80,80,80]],
				columnReadOnly:[true,[0,1,2,3,4,5,6,7,8],[]],				
				colFormat:[[1,2,3],[cfNilai,cfNilai,cfNilai]],												
				afterPaste:[this,"doAfterPaste"],
				pasteEnable:true,autoPaging:true,rowPerPage:200,
				nilaiChange:[this,"doNilaiChange"],change:[this,"doChangeCell"],
				defaultRow:1,autoAppend:false});
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPage1"]});
		
		this.e_memo = new saiMemo(this.pc1.childPage[1],{bound:[5,5,980,220],labelWidth:0,tag:9});
		this.e_memo.setReadOnly(true);

		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);
		
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();				
		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan = 1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);

			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('PPH21') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																	
					if (line.kode_spro == "PPH21") this.akunPPH21 = line.flag;																				
				}				
			}
			
			this.cb_akun.setSQL("select a.kode_akun, a.nama from masakun a where a.kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Akun Beban",true);															
			this.cb_pp.setSQL("select a.kode_pp, a.nama from pp a inner join karyawan_pp d on a.kode_pp = d.kode_pp and a.kode_lokasi=d.kode_lokasi and d.nik='"+this.app._userLog+"' "+
							"where a.flag_aktif ='1' and a.tipe = 'Posting' and a.kode_lokasi='"+this.app._lokasi+"'",["a.kode_pp","a.nama"],false,["Kode","Nama"],"and","Data Prodi/Unit",true);						
			
			this.cb_pp.setText(this.app._kodePP);
			
			this.e_user.setText(this.app._namaUser);
			this.cb_app.setSQL("select a.nik, a.nama from karyawan a "+
							   "where a.flag_aktif='1' and a.kode_lokasi='"+this.app._lokasi+"'",["a.nik","a.nama"],false,["Kode","Nama"],"and","Data Karyawan",true);					
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_tu_ntf21_fHonorPeg.extend(window.childForm);
window.app_saku3_transaksi_tu_ntf21_fHonorPeg.implement({	
	doAfterPaste: function(sender,totalRow){
		try {						
			var totBruto = totNetto = 0;			
			var err = 0;
			var msg  = ""; this.e_memo.setText("");
			for (var i=0;i < this.sg1.getRowCount();i++){			
				if (this.sg1.rowValid(i)){
					var data = this.dbLib.getDataProvider("select nama,npwp,bank+' - '+cabang+' - '+no_rek+' - '+nama_rek as rekening from it_pegawai where flag_aktif='AKTIF' and nik='"+this.sg1.cells(0,i)+"' and kode_lokasi='"+this.app._lokasi+"'",true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined) {
							
							this.sg1.cells(6,i,line.npwp);
							if (line.npwp == "0") {
								var persen = 0.06;
								this.sg1.cells(8,i,"7B");
							}
							else {
								var persen = 0.05;
								this.sg1.cells(8,i,"7A");
							}

							this.sg1.cells(2,i,Math.round(nilaiToFloat(this.sg1.cells(1,i)) * persen));
							
							var neto = nilaiToFloat(this.sg1.cells(1,i)) - nilaiToFloat(this.sg1.cells(2,i));
							this.sg1.cells(3,i,neto);
							
							this.sg1.cells(5,i,line.nama);
							
							if (this.c_bayar.getText() == "TRANSFER") this.sg1.cells(7,i,line.rekening);
							else this.sg1.cells(7,i,"-");
							
							totBruto += nilaiToFloat(this.sg1.cells(1,i));
							totNetto += nilaiToFloat(this.sg1.cells(3,i));
						}
						else {							
							err = 1;
							msg+= this.sg1.cells(0,i)+"\n";											
						}
					}				
				}
			}
			this.e_memo.setText(msg);			
			
			if (err == 1) {			
				var j = i+1;
				system.alert(this,"Data Pegawai tidak valid.","Lihat Tab Error.");
				this.sg1.clear(1);
				this.e_bruto.setText("0");
				this.e_netto.setText("0");			
				return false;
			}
			
			this.e_bruto.setText(floatToNilai(totBruto));
			this.e_netto.setText(floatToNilai(totNetto));			
			this.sgn1.setTotalPage(sender.getTotalPage());
			this.sgn1.rearrange();			
		} catch(e) {alert(e);}
	},
	doPage1: function(sender,page){
		this.sg1.doSelectPage(page);
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
			if (this.stsSimpan == 1) this.doClick();
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					if (this.stsSimpan == 0) {
						sql.add("delete from it_aju_m where no_aju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");										
						sql.add("delete from it_aju_d where no_aju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");										
						sql.add("delete from it_aju_rek where no_aju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");										
						sql.add("delete from prb_prbdd_d where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");																
						sql.add("delete from prb_prbeban_d where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");																
						sql.add("delete from angg_r where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");																
					}
					
					var vPajak = nilaiToFloat(this.e_bruto.getText()) - nilaiToFloat(this.e_netto.getText());
					sql.add("insert into it_aju_m(no_aju,kode_lokasi,periode,tanggal,modul,kode_akun,kode_pp,kode_drk,keterangan,nilai,tgl_input,nik_user,no_kpa,no_app,no_ver,no_fiat,no_kas,progress,nik_panjar,no_ptg,user_input,form,sts_pajak,npajak,nik_app,jenis_bayar) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.c_jenis.getText()+"','"+this.cb_akun.getText()+"','"+this.cb_pp.getText()+"','-','"+this.e_ket.getText()+"',"+nilaiToFloat(this.e_netto.getText())+",getdate(),'"+this.app._userLog+"','-','-','-','-','-','A','-','-','"+this.e_user.getText()+"','NTF23','P21',"+vPajak+",'"+this.cb_app.getText()+"','"+this.c_bayar.getText()+"')");					
					
					sql.add("insert into it_aju_d (no_aju,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,kode_curr,kurs,nilai_curr,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,akun_seb) values "+
							"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',0,'"+this.cb_akun.getText()+"','"+this.cb_id.getText()+" | "+this.e_ket.getText()+"','D','IDR',1,"+nilaiToFloat(this.e_bruto.getText())+","+nilaiToFloat(this.e_bruto.getText())+",'"+this.ppKelola+"','-','"+this.app._lokasi+"','NTF23','BEBAN','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'-')");		
					sql.add("insert into it_aju_d (no_aju, no_dokumen, tanggal, no_urut, kode_akun, keterangan, dc, kode_curr, kurs, nilai_curr, nilai, kode_pp, kode_drk, kode_lokasi, modul, jenis, periode, nik_user, tgl_input, akun_seb ) values "+
							"('"+this.e_nb.getText()+"', '"+this.cb_id.getText()+"', '"+this.dp_d1.getDateString()+"', 1, '"+this.akunPPH21+"', '"+this.e_ket.getText()+"', 'C', 'IDR', 1, "+vPajak+", "+vPajak+", '"+this.ppKelola+"', '-', '"+this.app._lokasi+"', 'NTF23', 'P21', '"+this.e_periode.getText()+"', '"+this.app._userLog+"', getdate(), '-' )");														

					if (this.sg1.getRowValidCount() > 0){
						for (var i=0;i < this.sg1.getRowCount();i++){
							if (this.sg1.rowValid(i)){
								sql.add("insert into it_aju_rek(no_aju,kode_lokasi,bank,no_rek,nama_rek,bank_trans,nilai,keterangan,pajak,berita,kode_pajak) values "+
								        "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','-','-','-','-',"+nilaiToFloat(this.sg1.cells(3,i))+",'"+this.sg1.cells(0,i)+"',"+nilaiToFloat(this.sg1.cells(2,i))+",'"+this.sg1.cells(4,i)+"','"+this.sg1.cells(8,i)+"')");
							}
						}
					}			
					
					if (this.c_bayar.getText() == "TRANSFER") {
						sql.add("update a set a.bank=b.bank,a.no_rek=b.no_rek,a.nama_rek=b.nama_rek,a.bank_trans=b.cabang,a.npwp=b.npwp "+
					        	"from it_aju_rek a inner join it_pegawai b on a.keterangan=b.nik and a.kode_lokasi=b.kode_lokasi "+
								"where a.no_aju='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'");
					}
					else {
						sql.add("update a set a.bank='-',a.no_rek='-',a.nama_rek='-',a.bank_trans='-',a.npwp=b.npwp "+
					        	"from it_aju_rek a inner join it_pegawai b on a.keterangan=b.nik and a.kode_lokasi=b.kode_lokasi "+
								"where a.no_aju='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'");
					}
							
					sql.add("insert into prb_prbdd_d(no_bukti,kode_lokasi,periode,tanggal,kode_akun,kode_pp,keterangan,dc,nilai,tgl_input,nik_user,kode_proyek,form) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.cb_akun.getText()+"','"+this.ppKelola+"','"+this.e_ket.getText()+"','D',"+nilaiToFloat(this.e_bruto.getText())+",getdate(),'"+this.app._userLog+"','"+this.cb_id.getText()+"','NTF23')");
					sql.add("insert into prb_prbeban_d(no_bukti,kode_lokasi,periode,periode_sch,tanggal,kode_akun,kode_pp,kode_drk,keterangan,dc,nilai,tgl_input,kode_proyek,modul,no_ref1,jenis) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.cb_akun.getText()+"','"+this.ppKelola+"','-','"+this.cb_id.getText()+" | "+this.e_ket.getText()+"','D',"+nilaiToFloat(this.e_bruto.getText())+",getdate(),'"+this.cb_id.getText()+"','AJUBEBAN','-','ITAJU')");												
					sql.add("insert into angg_r(no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) values "+
							"('"+this.e_nb.getText()+"','NTF23','"+this.app._lokasi+"','"+this.cb_akun.getText()+"','"+this.ppKelola+"','-','"+this.e_periode.getText()+"','"+this.e_periode.getText()+"','D',0,"+nilaiToFloat(this.e_bruto.getText())+")");
				
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
					this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);										
					setTipeButton(tbSimpan);
					this.sg1.clear(1);
					this.sg3.clear(1);
				break;
			case "simpan" :									
			case "ubah" :																						
				if (nilaiToFloat(this.e_netto.getText()) <= 0) {
					system.alert(this,"Nilai transaksi tidak valid.","Nilai tidak boleh nol atau kurang.");
					return false;
				}
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
				else 
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;	
			case "hapus" :	
				this.preView = "0";
				uses("server_util_arrayList");
				var sql = new server_util_arrayList();
				sql.add("delete from it_aju_m where no_aju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");										
				sql.add("delete from it_aju_d where no_aju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");										
				sql.add("delete from it_aju_rek where no_aju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");										
				sql.add("delete from prb_prbdd_d where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");																
				sql.add("delete from prb_prbeban_d where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");																
				sql.add("delete from angg_r where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");																
				setTipeButton(tbAllFalse);	
				this.dbLib.execArraySQL(sql);				
				break;		
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
		else {
			if (m == "12") this.e_periode.setText(this.app._periode);
			else this.e_periode.setText(y+""+m);
		}
		if (this.stsSimpan == 1) this.doClick();
	},
	doClick:function(sender){
		if (this.stsSimpan == 0) {
			this.sg1.clear(1);				
			this.sg3.clear(1); 
		}
		this.stsSimpan = 1;			
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"it_aju_m","no_aju",this.app._lokasi+"-"+this.e_periode.getText().substr(2,2)+".","00000"));
		this.cb_pp.setFocus();
		setTipeButton(tbSimpan);
	},	
	doChange:function(sender){
		if (sender == this.c_bayar && this.c_bayar.getText()=="TUNAI") {
			for (var i=0;i < this.sg1.getRowCount();i++){			
				if (this.sg1.rowValid(i)){
					this.sg1.cells(7,i,"-");
				}
			}
		}	
		if ((sender==this.cb_pp || this.e_periode.getText()) && this.cb_pp.getText()!="" && this.e_periode.getText()!="" && this.stsSimpan == 1) {						
			this.cb_id.setSQL("select kode_proyek, nama from prb_proyek where versi='NTF21' and substring(convert(varchar,tgl_mulai,112),1,6) <= '"+this.e_periode.getText()+"' and progress in ('1','2') and modul='PROYEK' and pp_rab='"+this.cb_pp.getText()+"' and flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["kode_proyek","nama"],false,["ID Proyek","Keterangan"],"and","Data Proyek",true);												
		}
		if (sender==this.cb_id && this.cb_id.getText()!="") {				
			var strSQL =  "select a.kode_pp,convert(varchar,a.tgl_admin,103) as tgl_admin,a.nama,b.akun_bdd,a.nilai_or - isnull(c.beban,0) as saldo_or "+
			              "from prb_proyek a "+			             
			              "   inner join prb_proyek_jenis b on a.kode_jenis=b.kode_jenis and a.kode_lokasi=b.kode_lokasi "+			            						 
						  "   left join ( "+			             
						  "			select kode_proyek,kode_lokasi,sum(case dc when 'D' then nilai else -nilai end) as beban "+
						  "			from prb_prbeban_d where kode_lokasi='"+this.app._lokasi+"' and "+
						  "			no_bukti <> '"+this.e_nb.getText()+"' "+
						  "			group by kode_proyek,kode_lokasi "+			             
						  "   ) c on a.kode_proyek=c.kode_proyek and a.kode_lokasi=c.kode_lokasi "+		
						  "where a.kode_proyek = '"+this.cb_id.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' ";
			 			
			var data = this.dbLib.getDataProvider(strSQL,true);	
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];		
				this.ppKelola = line.kode_pp;		
				this.e_nsaldo.setText(floatToNilai(line.saldo_or));								
				this.e_uraian.setText(line.nama);	
				this.cb_akun.setText(line.akun_bdd);							
				this.e_tgladm.setText(line.tgl_admin);
				var d = new Date();	
				this.d1 = d.strToDate(line.tgl_admin);				
				if (this.stsSimpan == 1) this.e_ket.setFocus();				
			}
		}	

	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){							
							this.nama_report="server_report_saku3_tu_pajak_rptHonorFormNP";
							this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_aju='"+this.e_nb.getText()+"' ";
							this.filter2 = this.e_periode.getText()+"/";
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
			this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);						
			setTipeButton(tbSimpan);
			this.sg1.clear(1);this.sg3.clear(1);
		} catch(e) {
			alert(e);
		}
	},	
	doLoad3:function(sender){																
		var strSQL = "select no_aju, convert(varchar,tanggal,103) as tgl, keterangan, nilai "+
					 "from it_aju_m "+
					 "where kode_pp='"+this.cb_pp.getText()+"' and form = 'NTF23' and modul='UMUM' and progress in ('0','A','R') and periode='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU3 = data;
			this.sgn3.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn3.rearrange();
			this.doTampilData3(1);
		} else this.sg3.clear(1);			
	},
	doTampilData3: function(page) {
		this.sg3.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU3.rs.rows.length? this.dataJU3.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU3.rs.rows[i];													
			this.sg3.appendData([line.no_aju,line.tgl,line.keterangan,floatToNilai(line.nilai)]); 
		}
		this.sg3.setNoUrut(start);
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
	},
	doDoubleClick3: function(sender, col , row) {
		try{
			if (this.sg3.cells(0,row) != "") {
				this.pc2.setActivePage(this.pc2.childPage[0]);																		
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;				
				this.e_nb.setText(this.sg3.cells(0,row));								
								
				var data = this.dbLib.getDataProvider(
							"select a.nik_app,a.progress,a.modul,a.tanggal,a.periode,a.keterangan,a.nilai,a.kode_pp,a.kode_akun,isnull(x.no_kpa,'-') as no_ver,isnull(x.catatan,'-') as catatan, r.bank,r.no_rek,r.nama_rek,a.user_input,a.sts_pajak,a.npajak,isnull(c.no_gambar,'') as no_gambar,a.jenis_bayar,y.kode_proyek   "+
						    "from it_aju_m a inner join it_aju_rek r on a.no_aju=r.no_aju and a.kode_lokasi=r.kode_lokasi "+
						    "inner join prb_prbdd_d y on a.no_aju=y.no_bukti and a.kode_lokasi=y.kode_lokasi "+
						    "left join (select a.no_kpa,a.no_bukti,a.kode_lokasi,a.catatan "+
						    "          from kpa_d a inner join kpa_m b on a.no_kpa=b.no_kpa and a.kode_lokasi=b.kode_lokasi "+
						    "          where b.no_kpaseb='-' and b.kode_lokasi='"+this.app._lokasi+"') x on a.no_aju=x.no_bukti and a.kode_lokasi=x.kode_lokasi "+					   
						    "left join it_aju_dok c on a.no_aju=c.no_bukti and a.kode_lokasi=c.kode_lokasi "+					   
						    "where a.no_aju='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						this.perLama = line.periode;
						this.dp_d1.setText(line.tanggal);
						this.c_jenis.setText(line.modul);
						this.cb_akun.setText(line.kode_akun);
						this.cb_app.setText(line.nik_app);
						this.cb_pp.setText(line.kode_pp);	
						this.e_ket.setText(line.keterangan);		
						this.c_bayar.setText(line.jenis_bayar);		
						
						this.cb_id.setText(line.kode_proyek);
					} 
				}				
				var strSQL = "select b.nik,a.nilai+a.pajak as bruto,a.pajak,a.nilai,b.nama,b.npwp,b.bank+' - '+b.cabang+' - '+b.no_rek+' - '+b.nama_rek as rek,a.berita,a.kode_pajak "+
				             "from it_aju_rek a inner join it_pegawai b on a.keterangan=b.nik and a.kode_lokasi=b.kode_lokasi "+
							 "where a.no_aju='"+this.e_nb.getText()+"' and a.kode_lokasi ='"+this.app._lokasi+"'";		
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg1.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];												
						this.sg1.appendData([line.nik,floatToNilai(line.bruto),floatToNilai(line.pajak),floatToNilai(line.nilai),line.berita,line.nama,line.npwp,line.rek,line.kode_pajak]);
					}
				} else this.sg1.clear(1);											
				
				var totBruto = totNetto = 0;			
				for (var i=0;i < this.sg1.getRowCount();i++){			
					if (this.sg1.rowValid(i)){
						totBruto += nilaiToFloat(this.sg1.cells(1,i));
						totNetto += nilaiToFloat(this.sg1.cells(3,i));										
					}
				}
				this.e_bruto.setText(floatToNilai(totBruto));
				this.e_netto.setText(floatToNilai(totNetto));			
			}						
		} catch(e) {alert(e);}
	}
	
});
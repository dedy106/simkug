window.app_saku3_transaksi_tu_proyekbaru_fTerimaHonor = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_tu_proyekbaru_fTerimaHonor.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_tu_proyekbaru_fTerimaHonor";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Penerimaan dan Agenda Honor", 0);	
		
		uses("saiCB;saiMemo;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");		
		
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,200,20],caption:"Periode",tag:2,readOnly:true,visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 		

		this.pc2 = new pageControl(this,{bound:[5,18,1000,440], childPage:["Data Pengajuan","Agenda Honor","Pembatalan"]});
		this.sg = new saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:7,tag:0,
		            colTitle:["Pilih","No Bukti","Tanggal","Vendor","Bagian / Unit","Keterangan","Nilai"],
					colWidth:[[6,5,4,3,2,1,0],[100,250,150,200,80,100,70]],
					readOnly:true,colFormat:[[0,6],[cfButton,cfNilai]],
					click:[this,"doSgBtnClick"], colAlign:[[0],[alCenter]],													 
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});
		this.bLoad = new portalui_imageButton(this.sgn,{bound:[this.sgn.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoadHonor"]});				
			
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[1],{bound:[20,11,200,20],caption:"No KasBank",maxLength:30,readOnly:true});		
		this.i_gen = new portalui_imageButton(this.pc2.childPage[1],{bound:[225,11,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_agenda = new portalui_saiLabelEdit(this.pc2.childPage[1],{bound:[20,12,200,20],caption:"No Agenda",maxLength:30,readOnly:true});		
		this.cb_kb = new portalui_saiCBBL(this.pc2.childPage[1],{bound:[20,14,220,20],caption:"Akun KasBank",tag:2,multiSelection:false});         				
		this.e_ket = new saiLabelEdit(this.pc2.childPage[1],{bound:[20,16,450,20],caption:"Deskripsi", maxLength:200});				

		this.pc1 = new pageControl(this.pc2.childPage[1],{bound:[1,20,996,315], childPage:["Data Honor", "Detail Honor","File Dokumen"]});				
		this.e_nobukti = new portalui_saiLabelEdit(this.pc1.childPage[0],{bound:[20,11,200,20],caption:"No Honor",readOnly:true});		
		this.c_pajak = new saiCB(this.pc1.childPage[0],{bound:[770,11,200,20],caption:"Jenis PPH",items:["P21","P23"], readOnly:true,tag:2});
		this.e_tgl = new portalui_saiLabelEdit(this.pc1.childPage[0],{bound:[20,13,200,20],caption:"Tgl Pengajuan",readOnly:true});		
		this.e_bruto = new saiLabelEdit(this.pc1.childPage[0],{bound:[770,13,200,20],caption:"Bruto", tag:1, tipeText:ttNilai, text:"0",readOnly:true});								
		this.e_uraian = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,16,450,20],caption:"Uraian", maxLength:150,readOnly:true});				
		this.e_netto = new saiLabelEdit(this.pc1.childPage[0],{bound:[770,16,200,20],caption:"Netto", tag:1, tipeText:ttNilai, text:"0",readOnly:true});				
		this.e_vendor = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,17,450,20],caption:"Nama Perusahaan", readOnly:true});								
		this.e_alamat = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,15,450,20],caption:"Alamat", readOnly:true});								
		this.e_npwp = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,14,450,20],caption:"NPWP", readOnly:true});										
		this.cb_pp = new portalui_saiCBBL(this.pc1.childPage[0],{bound:[20,11,220,20],caption:"Bagian / Unit",readOnly:true,change:[this,"doChange"]}); 		
		this.cb_pdpt = new portalui_saiCBBL(this.pc1.childPage[0],{bound:[20,15,220,20],caption:"MTA Pendptan", readOnly:true,change:[this,"doChange"]});         		
		this.cb_drkp = new portalui_saiCBBL(this.pc1.childPage[0],{bound:[20,13,220,20],caption:"DRK Pendptan",tag:1, readOnly:true});         				
		this.cb_akun = new portalui_saiCBBL(this.pc1.childPage[0],{bound:[20,12,220,20],caption:"MTA Beban",tag:1, readOnly:true,change:[this,"doChange"]});         		
		this.cb_drk = new portalui_saiCBBL(this.pc1.childPage[0],{bound:[20,13,220,20],caption:"DRK Beban",tag:1, readOnly:true,change:[this,"doChange"]});         				
		this.e_saldo = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,16,200,20],caption:"Saldo Budget TW", tag:1, tipeText:ttNilai, text:"0", readOnly:true});						

		this.sg1 = new saiGrid(this.pc1.childPage[1],{bound:[0,5,this.pc1.width-5,this.pc1.height-33],colCount:8,tag:0,
				colTitle:["ID Dosen","Bruto","Pot. Pajak","Inst. Fee", "Netto","Berita","Nama Dosen","Rekening"],
				colWidth:[[7,6,5,4,3,2,1,0],[250,200,200,100,100,100,100,80]],
				columnReadOnly:[true,[0,1,2,3,4,5,6,7],[]],				
				colFormat:[[1,2,3,4],[cfNilai,cfNilai,cfNilai,cfNilai]],																
				nilaiChange:[this,"doNilaiChange"],
				defaultRow:1,autoAppend:false});
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPage1"]});
		
		this.sgUpld = new saiGrid(this.pc1.childPage[2],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:4, tag:9,
					colTitle:["KdDok","Jenis Dokumen","Path File","DownLoad"],
					colWidth:[[3,2,1,0],[80,480,200,80]], 
					columnReadOnly:[true,[0,1,2,3],[]],					
					colFormat:[[3],[cfButton]], 						
					click:[this,"doSgBtnClickUpload"], colAlign:[[3],[alCenter]],
					readOnly:true,rowCount:1,tag:9});
		this.sgUpld.setUploadParam([3],"uploadTo", "server/media/", "object","server/media/");		
		this.sgnUpld = new sgNavigator(this.pc1.childPage[2],{bound:[1,this.pc1.height - 25,this.pc1.width-1,25],buttonStyle:1, grid:this.sgUpld});
		
		this.cb_bukti2 = new portalui_saiCBBL(this.pc2.childPage[2],{bound:[20,11,220,20],caption:"No KasBank", multiSelection:false, tag:9, readOnly:true,change:[this,"doChange"]});         			
		this.e_agenda2 = new portalui_saiLabelEdit(this.pc2.childPage[2],{bound:[20,12,200,20],caption:"No Agenda",tag:9,readOnly:true});		
		this.e_ket2 = new saiLabelEdit(this.pc2.childPage[2],{bound:[20,16,450,20],caption:"Deskripsi", tag:9,readOnly:true});				
		this.e_honor2 = new portalui_saiLabelEdit(this.pc2.childPage[2],{bound:[20,18,200,20],caption:"No Bukti",tag:9,readOnly:true});		
		this.e_bruto2 = new saiLabelEdit(this.pc2.childPage[2],{bound:[20,14,200,20],caption:"Bruto", tipeText:ttNilai, tag:9, readOnly:true});				
		this.bBatal = new button(this.pc2.childPage[2],{bound:[120,15,98,18],caption:"Batal Transaksi",click:[this,"delData"]});						

		this.rearrangeChild(10, 23);
		this.pc2.childPage[1].rearrangeChild(10, 23);	
		this.pc1.childPage[0].rearrangeChild(10, 23);
		this.pc2.childPage[2].rearrangeChild(10, 23);	
		
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();

			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('PPH21','PPH23') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																	
					if (line.kode_spro == "PPH21") this.akunPPH21 = line.flag;								
					if (line.kode_spro == "PPH23") this.akunPPH23 = line.flag;								
				}				
			}

			this.stsSimpan = 1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);

			this.cb_kb.setSQL("select kode_kb, nama from it_jeniskb where kode_lokasi='"+this.app._lokasi+"'",["kode_kb","nama"],false,["Kode","Nama"],"and","Data Jenis Bayar",true);
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_tu_proyekbaru_fTerimaHonor.extend(window.childForm);
window.app_saku3_transaksi_tu_proyekbaru_fTerimaHonor.implement({
	delData: function() {
		uses("server_util_arrayList");
		var sql = new server_util_arrayList();	
		sql.add("update it_honorntf_m set no_kas='-', no_agenda='-' where no_bukti='"+this.e_honor2.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");

		sql.add("delete from kas_m where no_kas = '"+this.cb_bukti2.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ");
		sql.add("delete from kas_j where no_kas = '"+this.cb_bukti2.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ");
		sql.add("delete from angg_r where no_bukti = '"+this.cb_bukti2.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ");

		sql.add("delete from it_aju_m where no_aju = '"+this.e_agenda2.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ");
		sql.add("delete from it_aju_multi where no_aju = '"+this.e_agenda2.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ");
		sql.add("delete from it_aju_rek where no_aju = '"+this.e_agenda2.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ");
		sql.add("delete from angg_r where no_bukti = '"+this.e_agenda2.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ");

		this.dbLib.execArraySQL(sql);		
	},
	isiKBlama: function() {
		this.cb_bukti2.setSQL("select no_kas,keterangan from kas_m where modul = 'KBNTFHONOR' and posted ='F' and kode_lokasi='"+this.app._lokasi+"'",["no_kas","keterangan"],false,["No Bukti","Deskripsi"],"and","Data KasBank",true);
	},
	doSgBtnClickUpload: function(sender, col, row){
		try{
			if (col === 3) window.open("server/media/"+this.sgUpld.getCell(2,row));
		}catch(e){
			alert(e);
		}
	},	
	doLoadHonor: function() {
		try {
			var strSQL = "select a.no_bukti, convert(varchar,a.tanggal,103) as tgl, a.vendor, b.kode_pp+' | '+b.nama as pp, a.keterangan, a.bruto as nilai "+
						"from it_honorntf_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
						"where a.no_kas ='-' and a.periode<='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn.rearrange();
				this.doTampilData(1);
			} else this.sg.clear(1);
		}
		catch(e) {
			alert(e);
		}			
	},
	doTampilData: function(page) {
		this.sg.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];													
			this.sg.appendData(["Pilih",line.no_bukti,line.tgl,line.vendor,line.pp,line.keterangan,floatToNilai(line.nilai)]); 
		}
		this.sg.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
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
			var data = this.dbLib.getDataProvider("select jenis_in,kode_akun from it_jeniskb where kode_kb ='"+this.cb_kb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){					
					this.jenis = line.jenis_in;											
					this.akunKB = line.kode_akun;
				} 
			}	

			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();										
					
					sql.add("update it_honorntf_m set no_kas='"+this.e_nb.getText()+"', no_agenda='"+this.e_agenda.getText()+"' where no_bukti='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("insert into kas_m (no_kas,kode_lokasi,no_dokumen,no_bg,akun_kb,tanggal,keterangan,kode_pp,modul,jenis,periode,kode_curr,kurs,nilai,nik_buat,nik_app,tgl_input,nik_user,posted,no_del,no_link,ref1,kode_bank) values  "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_nobukti.getText()+"','-','"+this.akunKB+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.app._kodePP+"','KBNTFHONOR','"+this.jenis+"','"+this.e_periode.getText()+"','IDR',1,"+Math.abs(nilaiToFloat(this.e_netto.getText()))+",'"+this.app._userLog+"','"+this.app._userLog+"',getdate(),'"+this.app._userLog+"','F','-','-','"+this.e_agenda.getText()+"','"+this.cb_kb.getText()+"')");					

					sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank) values "+
							"('"+this.e_nb.getText()+"','"+this.e_nobukti.getText()+"','"+this.dp_d1.getDateString()+"',0,'"+this.akunKB+"','"+this.e_ket.getText()+"','D',"+Math.abs(nilaiToFloat(this.e_bruto.getText()))+",'"+this.app._kodePP+"','-','-','-','"+this.app._lokasi+"','KBNTFHONOR','KB','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'"+this.cb_kb.getText()+"')");
					sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank) values "+
							"('"+this.e_nb.getText()+"','"+this.e_nobukti.getText()+"','"+this.dp_d1.getDateString()+"',1,'"+this.cb_pdpt.getText()+"','"+this.e_ket.getText()+"','C',"+Math.abs(nilaiToFloat(this.e_bruto.getText()))+",'"+this.cb_pp.getText()+"','"+this.cb_drkp.getText()+"','-','-','"+this.app._lokasi+"','KBNTFHONOR','PDPT','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-')");


					if (this.c_pajak.getText() == "P21") var akunPajak = this.akunPPH21; else var akunPajak = this.akunPPH23; 
					sql.add("insert into it_aju_m(no_aju,kode_lokasi,periode,tanggal,modul,kode_akun,kode_pp,kode_drk,keterangan,nilai,tgl_input,nik_user,no_kpa,no_app,no_ver,no_fiat,no_kas,progress,nik_panjar,no_ptg,user_input,form,sts_pajak,npajak,nik_app) values "+
							"('"+this.e_agenda.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','UMUM','"+this.cb_akun.getText()+"','"+this.cb_pp.getText()+"','"+this.cb_drk.getText()+"','"+this.e_ket.getText()+"',"+nilaiToFloat(this.e_netto.getText())+",getdate(),'"+this.app._userLog+"','-','-','-','-','-','A','-','-','"+this.app._namaUser+"','BMULTI','NON',0,'"+this.nikApp+"')");					

					var netFee = this.totBruto - this.totFee;		
					sql.add("insert into it_aju_multi(no_aju,no_ref,kode_lokasi,tanggal,nu,periode,kode_akun,kode_pp,kode_drk,dc,keterangan,nilai,jenis) values "+
							"('"+this.e_agenda.getText()+"','-','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"',0,'"+this.e_periode.getText()+"','"+this.cb_akun.getText()+"','"+this.cb_pp.getText()+"','"+this.cb_drk.getText()+"','D','"+this.e_ket.getText()+"',"+netFee+",'BEBAN')");
					sql.add("insert into it_aju_multi(no_aju,no_ref,kode_lokasi,tanggal,nu,periode,kode_akun,kode_pp,kode_drk,dc,keterangan,nilai,jenis) values "+
							"('"+this.e_agenda.getText()+"','-','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"',1,'"+this.e_periode.getText()+"','"+akunPajak+"','"+this.cb_pp.getText()+"','-','C','"+this.e_ket.getText()+"',"+this.totPajak+",'BEBAN')");					

					sql.add("insert into angg_r(no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) values "+
							"('"+this.e_nb.getText()+"','PDPT','"+this.app._lokasi+"','"+this.cb_pdpt.getText()+"','"+this.cb_pp.getText()+"','"+this.cb_drkp.getText()+"','"+this.e_periode.getText()+"','"+this.e_periode.getText()+"','C',0,"+this.totBruto+")");
					sql.add("insert into angg_r(no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) values "+
							"('"+this.e_agenda.getText()+"','ITKBAJUDRK','"+this.app._lokasi+"','"+this.cb_akun.getText()+"','"+this.cb_pp.getText()+"','"+this.cb_drk.getText()+"','"+this.e_periode.getText()+"','"+this.e_periode.getText()+"','D',"+parseNilai(this.e_saldo.getText())+","+netFee+")");
					
					sql.add("insert into it_aju_rek(no_aju,kode_lokasi,bank,no_rek,nama_rek,bank_trans,nilai,pajak,keterangan) "+
							"select '"+this.e_agenda.getText()+"','"+this.app._lokasi+"',b.bank,b.no_rek,b.nama_rek,b.nama,(a.bruto-a.fee-a.pajak),a.pajak,'"+this.e_uraian.getText()+"' "+
							"from it_honorntf_rek a inner join it_dosen b on a.kode_dosen=b.kode_dosen and a.kode_lokasi=b.kode_lokasi "+
							"where a.no_bukti ='"+this.e_nobukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'");

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
					this.sg.clear(1); this.sgUpld.clear(1); this.sg1.clear(1); 					
					this.doLoadHonor();		
					this.isiKBlama();			
					this.pc2.setActivePage(this.pc2.childPage[0]);	
					this.pc1.setActivePage(this.pc1.childPage[0]);	
					setTipeButton(tbSimpan);
				break;
			case "simpan" :					
				this.preView = "1";
				if (this.stsGar == "1") {
					if (this.cb_drk.getText() == "-") {
						system.alert(this,"Transaksi tidak valid.","Akun Anggaran Harus diisi DRK.");
						return false;						
					}
					else {
						var netFee = this.totBruto - this.totFee;
						if (netFee > nilaiToFloat(this.e_saldo.getText())) {
							system.alert(this,"Transaksi tidak valid.","Nilai (Bruto-Fee) transaksi melebihi saldo.");
							return false;						
						}
					}
				}																	
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);								
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
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.e_periode.setText(y+""+m);		
		if (this.stsSimpan == 1) {
			this.doLoadHonor();
			this.doClick();		
			this.isiKBlama();
		}
	},	
	doClick:function(sender){	
		if (this.stsSimpan==0) {
			this.sgUpld.clear(1);
			this.sg1.clear(1);
			this.isiKBlama();
		}	
		this.stsSimpan=1;
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"kas_m","no_kas",this.app._lokasi+"-BM"+this.e_periode.getText().substr(2,4)+".","0000"));		
		this.e_agenda.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"it_aju_m","no_aju",this.app._lokasi+"-"+this.e_periode.getText().substr(2,2)+".","00000"));
		this.e_ket.setFocus();
	},		
	doSgBtnClick: function(sender, col, row){
		try{
			if (col == 0) this.doDoubleClick(this.sg,1,row); 				
		}catch(e){
			alert(e);
		}
	},
	doDoubleClick: function(sender, col , row) {
		this.e_nobukti.setText(this.sg.cells(1,row));
		this.e_tgl.setText(this.sg.cells(2,row));										
		this.e_ket.setText(this.sg.cells(5,row));														

		var strSQL = "select * from it_honorntf_m where no_bukti='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object"){
			var line = data.rs.rows[0];							
			if (line != undefined){		
				this.nikApp = line.nik_app;								
				this.e_uraian.setText(line.keterangan);										
				this.e_vendor.setText(line.vendor);						
				this.e_alamat.setText(line.alamat);						
				this.e_npwp.setText(line.npwp);						
				this.cb_pp.setText(line.kode_pp);
				this.cb_pdpt.setText(line.akun_pdpt);
				this.cb_drkp.setText(line.kode_drkp);	
				this.cb_akun.setText(line.kode_akun);												
				this.cb_drk.setText(line.kode_drk);									
			} 
		}	

		var strSQL = "select * from it_honorntf_rek where no_bukti='"+this.e_nobukti.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'";		
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;
			this.sg1.clear();
			this.totBruto = this.totNetto = this.totPajak = this.totFee = 0;
			for (var i in data.rs.rows){
				line = data.rs.rows[i];												
				this.totBruto += parseFloat(line.bruto);
				this.totNetto += parseFloat(line.neto);
				this.totPajak += parseFloat(line.pajak);
				this.totFee += parseFloat(line.fee);
				this.sg1.appendData([line.kode_dosen,floatToNilai(line.bruto),floatToNilai(line.pajak),floatToNilai(line.fee),floatToNilai(line.neto),line.berita,line.nama_dosen,line.rekening]);
			}
		} else this.sg1.clear(1);											
		this.e_bruto.setText(floatToNilai(this.totBruto));
		this.e_netto.setText(floatToNilai(this.totNetto));

		this.sgUpld.clear(); 
		var data = this.dbLib.getDataProvider(
						"select b.kode_jenis,b.nama,a.no_gambar "+
						"from it_honorntf_dok a inner join dok_jenis b on a.kode_jenis=b.kode_jenis and a.kode_lokasi=b.kode_lokasi "+
						"where a.no_bukti = '"+this.e_nobukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.nu",true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;					
			for (var i in data.rs.rows){
				line = data.rs.rows[i];							
				this.sgUpld.appendData([line.kode_jenis, line.nama, line.no_gambar,"DownLoad"]);						
			}
		} else this.sgUpld.clear(1);

		this.pc2.setActivePage(this.pc2.childPage[1]);		
		this.pc1.setActivePage(this.pc1.childPage[0]);																	
	},
	doChange:function(sender){
		if ((sender == this.cb_pp ||sender == this.e_periode ||sender == this.cb_pdpt)  && this.cb_pp.getText() !="" && this.e_periode.getText() !="" && this.cb_pdpt.getText() !="") {
			this.cb_drkp.setSQL("select distinct a.kode_drk, a.nama from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.e_periode.getText().substr(0,4)+"%' and b.kode_akun='"+this.cb_pdpt.getText()+"' and b.kode_pp = '"+this.cb_pp.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",["kode_drk","nama"],false,["Kode","Nama"],"and","Data DRK",true);					
		}
		if ((sender == this.cb_pp ||sender == this.e_periode)  && this.cb_pp.getText() !="" && this.e_periode.getText() !="") {
				this.cb_akun.setSQL("select distinct a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
									"       inner join anggaran_d c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi and c.kode_pp='"+this.cb_pp.getText()+"' and c.periode like '"+this.e_periode.getText().substr(0,4)+"%' "+ 
									"where b.kode_flag in ('041') and a.kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);													
		}
		if ((sender == this.cb_pp || sender == this.cb_akun || sender == this.e_periode) && this.cb_pp.getText()!="" && this.cb_akun.getText()!="" && this.e_periode.getText()!="") {
			var data = this.dbLib.getDataProvider("select status_gar from masakun where kode_akun='"+this.cb_akun.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
					this.stsGar = line.status_gar;
				} 
			}
			if (this.stsGar == "1") this.cb_drk.setSQL("select distinct a.kode_drk, a.nama from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.e_periode.getText().substr(0,4)+"%' and b.kode_akun='"+this.cb_akun.getText()+"' and b.kode_pp = '"+this.cb_pp.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",["kode_drk","nama"],false,["Kode","Nama"],"and","Data DRK",true);											
			else this.cb_drk.setSQL("select '-' as kode_drk, '-' as nama ",["kode_drk","nama"],false,["Kode","Nama"],"where","Data DRK",true);											
		}
		if ((sender == this.cb_pp || sender == this.cb_akun || sender == this.cb_drk || sender == this.e_periode) && this.cb_pp.getText()!="" && this.cb_akun.getText()!="" && this.cb_drk.getText()!="" && this.e_periode.getText()!="") {
			if (this.stsSimpan == 1) var data = this.dbLib.getDataProvider("select fn_cekagg2('"+this.cb_pp.getText()+"','"+this.app._lokasi+"','"+this.cb_akun.getText()+"','"+this.cb_drk.getText()+"','"+this.e_periode.getText()+"') as gar ",true);
			else var data = this.dbLib.getDataProvider("select fn_cekagg3('"+this.cb_pp.getText()+"','"+this.app._lokasi+"','"+this.cb_akun.getText()+"','"+this.cb_drk.getText()+"','"+this.e_periode.getText()+"','"+this.e_nb.getText()+"') as gar ",true);
			
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];
				data = line.gar.split(";");
				var sls = parseFloat(data[0]) - parseFloat(data[1]);
				this.e_saldo.setText(floatToNilai(sls));				
			}
		}


		if (sender == this.cb_bukti2 && this.cb_bukti2.getText()!="") {
			var data = this.dbLib.getDataProvider("select * from it_honorntf_m where no_kas='"+this.cb_bukti2.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
					this.e_agenda2.setText(line.no_agenda);
					this.e_ket2.setText(line.keterangan);
					this.e_honor2.setText(line.no_bukti);
					this.e_bruto2.setText(floatToNilai(line.bruto));
				} 
			}
		}
	},	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							system.info(this,"Transaksi telah sukses tersimpan (No Bukti : "+ this.e_nb.getText()+")","");
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	}
});
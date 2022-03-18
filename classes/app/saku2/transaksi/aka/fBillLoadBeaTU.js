window.app_saku2_transaksi_aka_fBillLoadBeaTU = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_aka_fBillLoadBeaTU.prototype.parent.constructor.call(this, owner);
		this.className = "app_saku2_transaksi_aka_fBillLoadBeaTU";
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Load Data Tagihan Beasiswa: Proses", 0);	
		
		this.maximize();		
		uses("portalui_uploader;portalui_datePicker;portalui_saiCBBL;portalui_pageControl;portalui_childPage;util_standar;portalui_saiGrid;portalui_sgNavigator;portalui_saiMemo");
		uses("util_dbLib",true);		
		
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,10,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No Load", readOnly:true});					
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_ket = new saiLabelEdit(this,{bound:[20,13,450,20],caption:"Deskripsi", maxLength:150});			
		this.cb_pp = new saiCBBL(this,{bound:[20,14,220,20],caption:"PP", multiSelection:false, maxLength:10, tag:2});
		this.cb_drk = new saiCBBL(this,{bound:[20,16,220,20],caption:"DRK", multiSelection:false, maxLength:10, tag:2});
		this.cb_fak = new saiCBBL(this,{bound:[20,15,220,20],caption:"Fakultas", multiSelection:false, maxLength:10, tag:2});
		this.bUpload = new portalui_uploader(this,{bound:[615,15,100,20],param3:"object",param4:"gridupload",afterUpload:[this,"doAfterUpload"],autoSubmit:true});		
		this.e_total = new saiLabelEdit(this,{bound:[720,15,200,20],caption:"Total", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		
		this.pc1 = new pageControl(this,{bound:[20,20,900,310], childPage:["Data Billing Mahasiswa","Pesan Kesalahan"]});				
		this.sg1 = new portalui_saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:16,
				colTitle:["NIM","Nama","Jalur","Beasiswa","Status","Prodi","Angkatan","BPP","UP3","SDP2","SKS","S2BPP","S2UP3","S2SDP2","S2SKS","Total"],
				colFormat:[[7,8,9,10,11,12,13,14,15],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],
				readOnly:true, defaultRow:1
		});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3, grid:this.sg1, pager:[this,"selectPage"]});		
		this.e_memo = new saiMemo(this.pc1.childPage[1],{bound:[5,14,690,280],labelWidth:0,tag:9,readOnly:true});				
		this.bRefresh = new portalui_imageButton(this.sgn,{bound:[this.sgn.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Clear",click:[this,"doClick"]});
		this.sgn.uploader.setParam3("object");
		this.sg1.setAllowBlank(true);
		
		this.dbLib = new util_dbLib();
		this.dbLib.addListener(this);
		this.standarLib = new util_standar();
		this.rearrangeChild(10,23);
		
		this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
		this.cb_pp.setSQL("select kode_pp, nama from pp where tipe ='posting' and flag_aktif ='1' and kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data Pusat Pertanggungjawaban",true);		
		
		setTipeButton(tbSimpan);				
		
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		this.cb_fak.setSQL("select kode_fakultas, nama from aka_fakultas where kode_lokasi='"+this.app._lokasi+"'",["kode_fakultas","nama"],false,["Kode","Nama"],"and","Daftar Fakultas",true);			
	}
};
window.app_saku2_transaksi_aka_fBillLoadBeaTU.extend(window.portalui_childForm);
window.app_saku2_transaksi_aka_fBillLoadBeaTU.implement({
	doAfterUpload: function(sender, result, data){		
	    try{   			
			this.dataUpload = data;
			if (result) {								
				this.sg1.clear();				
				this.selectPage(undefined, 1);
				this.sgn.setTotalPage(Math.ceil(this.dataUpload.rows.length / 20));				
				this.sgn.rearrange();
				this.sgn.activePage = 0;								
			}else throw(data);	
			
			var line;
			this.bpp=0;this.up3=0;this.sdp2 = 0;this.sks = 0;
			this.s2bpp=0;this.s2up3=0;this.s2sdp2 = 0;this.s2sks = 0;
			for (var i=0; i < this.dataUpload.rows.length;i++){
				line = this.dataUpload.rows[i];
				this.bpp = this.bpp + parseFloat(line.bpp);
				this.up3 = this.up3 + parseFloat(line.up3);
				this.sdp2 = this.sdp2 + parseFloat(line.sdp2);
				this.sks = this.sks + parseFloat(line.sks);
				this.s2bpp = this.s2bpp + parseFloat(line.s2bpp);
				this.s2up3 = this.s2up3 + parseFloat(line.s2up3);
				this.s2sdp2 = this.s2sdp2 + parseFloat(line.s2sdp2);
				this.s2sks = this.s2sks + parseFloat(line.s2sks);
			}
			
			this.doCek();				
   		}catch(e){
   		   this.sg1.hideLoading();
   		   systemAPI.alert(e,"Proses Berhenti.");
        }
	},
	selectPage: function(sender,page){
		var start = (page - 1) * 20;
		var finish = start + 20;
		finish = (finish > this.dataUpload.rows.length ? this.dataUpload.rows.length : finish);
		this.sg1.clear();
		for (var i=start; i < finish;i++){
			line = this.dataUpload.rows[i];
			this.sg1.appendData([
			line.nim,line.nama,line.jalur,line.beasiswa,line.status,line.prodi,line.angkatan,floatToNilai(line.bpp),floatToNilai(line.up3),floatToNilai(line.sdp2),floatToNilai(line.sks),floatToNilai(line.s2bpp),floatToNilai(line.s2up3),floatToNilai(line.s2sdp2),floatToNilai(line.s2sks),floatToNilai(line.total)]);
		}
		this.sg1.setNoUrut(start);
	},
	doCek:function(sender){										
		try {	
			this.stsSimpan = "0";
			var line; var strSQL = "";
			uses("server_util_arrayList");
			var sql = new server_util_arrayList();																																														
			sql.add("delete from aka_bill_load where no_bill = '"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"'");			
			
			var total = 0;
			for (var i=0; i < this.dataUpload.rows.length;i++){
				line = this.dataUpload.rows[i];
				sql.add("insert into aka_bill_load(no_bill,jenis,kode_lokasi,periode,nim,nama,kode_jalur,flag_bea,flag_status,kode_jur,kode_akt,bpp,up3,sdp2,sks,s2bpp,s2up3,s2sdp2,s2sks) values "+
						"('"+this.app._userLog+"','CEK','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+line.nim+"','"+line.nama+"','"+line.jalur+"','"+line.beasiswa+"','"+line.status+"','"+line.prodi+"','"+line.angkatan+"',"+parseNilai(line.bpp)+","+parseNilai(line.up3)+","+parseNilai(line.sdp2)+","+parseNilai(line.sks)+","+parseNilai(line.s2bpp)+","+parseNilai(line.s2up3)+","+parseNilai(line.s2sdp2)+","+parseNilai(line.s2sks)+")");						
				total += parseFloat(line.bpp)+parseFloat(line.up3)+parseFloat(line.sdp2)+parseFloat(line.sks)+parseFloat(line.s2bpp)+parseFloat(line.s2up3)+parseFloat(line.s2sdp2)+parseFloat(line.s2sks);
			}												
			sql.add("update a set a.jenis = isnull(b.nim,'-') "+
			        "from aka_bill_load a left join aka_mahasiswa b on a.nim=b.nim and a.kode_lokasi=b.kode_lokasi "+
					"where a.no_bill = '"+this.app._userLog+"' and a.kode_lokasi='"+this.app._lokasi+"'");			
			this.dbLib.execArraySQL(sql);												
			this.e_total.setText(floatToNilai(total));
			
			var temu = false; var msg  = ""; this.e_memo.setText("");			
			strSQL = "select distinct nim+' - '+nama as nim from aka_bill_load where jenis='-' and no_bill = '"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"'";						
			var data = this.dbLib.getDataProvider(strSQL,true);	
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;				
				for (var i in data.rs.rows){
					line = data.rs.rows[i];
					temu = true;
					msg+= "NIM tidak terdaftar. [kode : "+line.nim+"]\n";
				}
			}						
			if (!temu) {						
				setTipeButton(tbSimpan);
			}
			else {				
				this.e_memo.setText(msg);
				setTipeButton(tbAllFalse);
				system.alert(this,"Transaksi tidak valid.","Lihat daftar kesalahan.");
				this.pc1.setActivePage(this.pc1.childPage[1]);
			}
		} catch(e) { 
			alert(e);
		}
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
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event){
			case "clear" :
				if (modalResult == mrOk){
					this.standarLib.clearByTag(this, [0,1],undefined);				
					this.sg1.clear(1); 
					setTipeButton(tbSimpan);
				}
				break;
			case "simpan" :										
					this.app._periode = this.dbLib.getPeriode(this.app._lokasi);					
					if (nilaiToFloat(this.e_total.getText()) <= 0) {
						system.alert(this,"Transaksi tidak valid.","Total tidak boleh nol atau kurang.");
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
					this.stsSimpan = "1";					
					this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'aka_bill_m','no_bill',this.app._lokasi+"-BIL"+this.e_periode.getText().substr(2,4)+".",'000'));
					if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
						try{
							uses("server_util_arrayList");
							var sql = new server_util_arrayList();	
							
							sql.add("insert into aka_bill_m(no_bill,no_dokumen,kode_lokasi,periode,tanggal,keterangan,kode_pp,kode_drk,jenis,posted,nik_user,tgl_input,kode_fakultas) values "+ 
									"('"+this.e_nb.getText()+"','-','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.cb_pp.getText()+"','"+this.cb_drk.getText()+"','BEA','F','"+this.app._userLog+"',getdate(),'"+this.cb_fak.getText()+"')");						
							
							sql.add("update aka_bill_load set no_bill='"+this.e_nb.getText()+"', jenis='BEA' where jenis <> 'BEA' and no_bill='"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"'");							
							
							sql.add("insert into aka_bill_d (no_bill,kode_lokasi,no_inv,nim,periode,kode_produk,akun_piutang,akun_pdpt,akun_pdd,nilai,periode_susut,periode_sisih,kode_fakultas) "+
									"select b.no_bill,b.kode_lokasi,b.no_bill+'-'+b.nim,b.nim,'"+this.e_periode.getText()+"','BEABPP', a.akun_piutang,a.akun_pdpt,a.akun_pdd,b.bpp as nilai,'"+this.e_periode.getText()+"','"+this.e_periode.getText()+"','"+this.cb_fak.getText()+"' "+
									"from aka_bill_load b inner join aka_produk a on 'BEABPP' = a.kode_produk and b.kode_lokasi=a.kode_lokasi and a.kode_fakultas='"+this.cb_fak.getText()+"' "+
									"where b.no_bill = '"+this.e_nb.getText()+"' and b.kode_lokasi = '"+this.app._lokasi+"' and b.bpp<>0"+
									"union "+
									"select b.no_bill,b.kode_lokasi,b.no_bill+'-'+b.nim,b.nim,'"+this.e_periode.getText()+"','BEAUP3', a.akun_piutang,a.akun_pdpt,a.akun_pdd,b.up3 as nilai,'"+this.e_periode.getText()+"','"+this.e_periode.getText()+"','"+this.cb_fak.getText()+"' "+
									"from aka_bill_load b inner join aka_produk a on 'BEAUP3' = a.kode_produk and b.kode_lokasi=a.kode_lokasi and a.kode_fakultas='"+this.cb_fak.getText()+"' "+
									"where b.no_bill = '"+this.e_nb.getText()+"' and b.kode_lokasi = '"+this.app._lokasi+"' and b.up3<>0"+
									"union "+
									"select b.no_bill,b.kode_lokasi,b.no_bill+'-'+b.nim,b.nim,'"+this.e_periode.getText()+"','BEASDP2', a.akun_piutang,a.akun_pdpt,a.akun_pdd,b.sdp2 as nilai,'"+this.e_periode.getText()+"','"+this.e_periode.getText()+"','"+this.cb_fak.getText()+"' "+
									"from aka_bill_load b inner join aka_produk a on 'BEASDP2' = a.kode_produk and b.kode_lokasi=a.kode_lokasi and a.kode_fakultas='"+this.cb_fak.getText()+"' "+
									"where b.no_bill = '"+this.e_nb.getText()+"' and b.kode_lokasi = '"+this.app._lokasi+"' and b.sdp2<>0"+
									"union "+
									"select b.no_bill,b.kode_lokasi,b.no_bill+'-'+b.nim,b.nim,'"+this.e_periode.getText()+"','BEASKS', a.akun_piutang,a.akun_pdpt,a.akun_pdd,b.sks as nilai,'"+this.e_periode.getText()+"','"+this.e_periode.getText()+"','"+this.cb_fak.getText()+"' "+
									"from aka_bill_load b inner join aka_produk a on 'BEASKS' = a.kode_produk and b.kode_lokasi=a.kode_lokasi and a.kode_fakultas='"+this.cb_fak.getText()+"' "+
									"where b.no_bill = '"+this.e_nb.getText()+"' and b.kode_lokasi = '"+this.app._lokasi+"' and b.sks<>0"+
									"union "+
									"select b.no_bill,b.kode_lokasi,b.no_bill+'-'+b.nim,b.nim,'"+this.e_periode.getText()+"','BEAS2BPP', a.akun_piutang,a.akun_pdpt,a.akun_pdd,b.s2bpp as nilai,'"+this.e_periode.getText()+"','"+this.e_periode.getText()+"','"+this.cb_fak.getText()+"' "+
									"from aka_bill_load b inner join aka_produk a on 'BEAS2BPP' = a.kode_produk and b.kode_lokasi=a.kode_lokasi and a.kode_fakultas='"+this.cb_fak.getText()+"' "+
									"where b.no_bill = '"+this.e_nb.getText()+"' and b.kode_lokasi = '"+this.app._lokasi+"' and b.s2bpp<>0"+
									"union "+
									"select b.no_bill,b.kode_lokasi,b.no_bill+'-'+b.nim,b.nim,'"+this.e_periode.getText()+"','BEAS2UP3', a.akun_piutang,a.akun_pdpt,a.akun_pdd,b.s2up3 as nilai,'"+this.e_periode.getText()+"','"+this.e_periode.getText()+"','"+this.cb_fak.getText()+"' "+
									"from aka_bill_load b inner join aka_produk a on 'BEAS2UP3' = a.kode_produk and b.kode_lokasi=a.kode_lokasi and a.kode_fakultas='"+this.cb_fak.getText()+"' "+
									"where b.no_bill = '"+this.e_nb.getText()+"' and b.kode_lokasi = '"+this.app._lokasi+"' and b.s2up3<>0"+
									"union "+
									"select b.no_bill,b.kode_lokasi,b.no_bill+'-'+b.nim,b.nim,'"+this.e_periode.getText()+"','BEAS2SDP2', a.akun_piutang,a.akun_pdpt,a.akun_pdd,b.s2sdp2 as nilai,'"+this.e_periode.getText()+"','"+this.e_periode.getText()+"','"+this.cb_fak.getText()+"' "+
									"from aka_bill_load b inner join aka_produk a on 'BEAS2SDP2' = a.kode_produk and b.kode_lokasi=a.kode_lokasi and a.kode_fakultas='"+this.cb_fak.getText()+"' "+
									"where b.no_bill = '"+this.e_nb.getText()+"' and b.kode_lokasi = '"+this.app._lokasi+"' and b.s2sdp2<>0"+
									"union "+
									"select b.no_bill,b.kode_lokasi,b.no_bill+'-'+b.nim,b.nim,'"+this.e_periode.getText()+"','BEAS2SKS', a.akun_piutang,a.akun_pdpt,a.akun_pdd,b.s2sks as nilai,'"+this.e_periode.getText()+"','"+this.e_periode.getText()+"','"+this.cb_fak.getText()+"' "+
									"from aka_bill_load b inner join aka_produk a on 'BEAS2SKS' = a.kode_produk and b.kode_lokasi=a.kode_lokasi and a.kode_fakultas='"+this.cb_fak.getText()+"' "+
									"where b.no_bill = '"+this.e_nb.getText()+"' and b.kode_lokasi = '"+this.app._lokasi+"' and b.s2sks<>0");
							
							
							sql.add("insert into aka_bill_j(no_bill,kode_lokasi,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,modul,jenis,periode,no_dokumen,kode_curr,kurs,nik_user,tgl_input) "+
									"select '"+this.e_nb.getText()+"',kode_lokasi,'"+this.dp_d1.getDateString()+"',0,akun_piutang,'"+this.e_ket.getText()+"','D',sum(nilai),'"+this.cb_pp.getText()+"','"+this.cb_drk.getText()+"','BEA',kode_produk,'"+this.e_periode.getText()+"','-','IDR',1,'"+this.app._userLog+"',getdate() "+
									"from aka_bill_d where no_bill='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' group by kode_lokasi,akun_piutang,kode_produk");
							sql.add("insert into aka_bill_j(no_bill,kode_lokasi,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,modul,jenis,periode,no_dokumen,kode_curr,kurs,nik_user,tgl_input) "+
									"select '"+this.e_nb.getText()+"',kode_lokasi,'"+this.dp_d1.getDateString()+"',1,akun_pdpt,'"+this.e_ket.getText()+"','C',sum(nilai),'"+this.cb_pp.getText()+"','"+this.cb_drk.getText()+"','BEA',kode_produk,'"+this.e_periode.getText()+"','-','IDR',1,'"+this.app._userLog+"',getdate() "+
									"from aka_bill_d where kode_produk not like '%BPP' and no_bill='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' group by kode_lokasi,akun_pdpt,kode_produk");
							sql.add("insert into aka_bill_j(no_bill,kode_lokasi,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,modul,jenis,periode,no_dokumen,kode_curr,kurs,nik_user,tgl_input) "+
									"select '"+this.e_nb.getText()+"',kode_lokasi,'"+this.dp_d1.getDateString()+"',1,akun_pdd,'"+this.e_ket.getText()+"','C',sum(nilai),'"+this.cb_pp.getText()+"','"+this.cb_drk.getText()+"','BEA',kode_produk,'"+this.e_periode.getText()+"','-','IDR',1,'"+this.app._userLog+"',getdate() "+
									"from aka_bill_d where kode_produk like '%BPP' and no_bill='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' group by kode_lokasi,akun_pdd,kode_produk");
							
							//no_bill,kode_lokasi,no_inv,nim,periode,kode_produk,akun_piutang,akun_pdpt,akun_pdd,nilai,periode_susut,periode_sisih
							/*
							sql.add("insert into aka_rekon_d(no_rekon,nim,no_inv,periode,nilai,kode_lokasi,akun_titip,akun_piutang,kode_produk,dc,modul,id_bank) "+
									"select '"+this.e_nb.getText()+"',nim,no_inv,'"+this.e_periode.getText()+"',nilai,kode_lokasi,akun_piutang,'BEA',kode_produk,'D','BEA','-' "+
									"from aka_bill_d where no_bill='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
							*/
							setTipeButton(tbAllFalse);
							this.dbLib.execArraySQL(sql);
						}catch(e){
							systemAPI.alert(e);
						}
					}
				break;
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
		else this.e_periode.setText(this.app._periode);
		this.e_nb.setText("");
	},	
	doChange: function(sender){
		if (sender == this.e_periode && this.e_periode.getText()!="")
			this.cb_drk.setSQL("select kode_drk, nama from drk where tipe ='posting' and kode_lokasi='"+this.app._lokasi+"' and tahun = '"+this.e_periode.getText().substr(0,4)+"' ",["kode_drk","nama"],false,["Kode","Nama"],"and","Data DRK",true);
	},
	doClick: function(sender){
		if (sender == this.i_gen) {
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'aka_bill_m','no_bill',this.app._lokasi+"-BIL"+this.e_periode.getText().substr(2,4)+".",'000'));
			this.e_ket.setFocus();
		}
		if (sender == this.bRefresh) this.sg1.clear(1);
	},		
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			switch(methodName){
				case "execArraySQL":
					if (result.toLowerCase().search("error") == -1){						
						if (this.stsSimpan=="1") {							
							this.nama_report="server_report_saku2_aka_rptBillJurnal";
							this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_bill='"+this.e_nb.getText()+"' ";
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
							this.pc1.hide();							
						}
					}else
						system.info(this, result,"");											
				break;
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
				this.pc1.show();   
				this.viewer.setVisible(false);
				this.app._mainForm.pButton.setVisible(true);
				this.app._mainForm.reportNavigator.setVisible(false);  
				this.clearLayar();			
			break;
		}
	},
	clearLayar : function(){
		try {
			this.standarLib.clearByTag(this, [0,1],undefined);				
			this.sg1.clear(1); 
			setTipeButton(tbAllFalse);
			this.pc1.setActivePage(this.pc1.childPage[0]);
		} catch(e) {
			alert(e);
		}
	}
});

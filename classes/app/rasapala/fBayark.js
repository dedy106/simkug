window.app_rasapala_fBayark = function(owner)
{
	if (owner)
	{
		window.app_rasapala_fBayark.prototype.parent.constructor.call(this,owner);
		this.className  = "app_rasapala_fBayark";
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Pembayaran Hutang Apotek: Koreksi", 0);	
		
		uses("portalui_saiCBB;portalui_saiCBBL;portalui_saiEdit;portalui_datePicker;portalui_saiGrid;portalui_checkBox;portalui_reportViewer");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,10,200,20],caption:"Periode",readOnly:true,tag:2});
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()});
		this.cJenis = new portalui_saiCB(this,{bound:[20,22,200,20],caption:"Jenis",items:["KAS","BANK"],tag:2,change:[this,"doChange"]});
		this.cb_perLama = new portalui_saiCB(this,{bound:[720,22,200,20],caption:"Periode Bukti",mustCheck: false, tag:2});
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,13,250,20],caption:"No KasBank",maxLength:30,readOnly:true});
		this.b_gen = new portalui_button(this,{bound:[280,13,80,18],caption:"Gen",click:[this,"doClick"],icon:"icon/"+system.getThemes()+"/process.png"});		
		this.cb_nbLama = new portalui_saiCBB(this,{bound:[720,13,200,20],caption:"No KasBank",readOnly:true,btnClick:[this,"doBtnClick"],btnRefreshClick:[this,"doLoadData"]});
		this.e_dok = new portalui_saiLabelEdit(this,{bound:[20,14,343,20],caption:"No Dokumen", maxLength:100, tag:1});		
		this.e_desc = new portalui_saiLabelEdit(this,{bound:[20,15,343,20],caption:"Keterangan", maxLength:150, tag:1});						
		//this.cb_preview = new portalui_checkBox(this,{bound:[820,15,100,20],caption:"Preview", checked:true});
		this.cb_akun = new portalui_saiCBBL(this,{bound:[20,17,200,20],caption:"Akun KasBank",tag:1, multiSelection:false,
			sql:["select kode_akun, nama from masakun where kode_lokasi ='"+this.app._lokasi+"' ", ["kode_akun","nama"],false,["Kode","Nama"],"and","Daftar Akun",true]
		});
		this.e_pph = new portalui_saiLabelEdit(this,{bound:[720,17,200,20],caption:"Total PPh",tipeText:ttNilai,readOnly: true, tag:1,text:"0"});
		this.cb_pph = new portalui_saiCBBL(this,{bound:[20,16,200,20],caption:"Akun PPh",tag:1, multiSelection:false,
			sql:["select kode_akun, nama from masakun where kode_lokasi ='"+this.app._lokasi+"' ", ["kode_akun","nama"],false,["Kode","Nama"],"and","Daftar Akun",true]
		});		
		this.e_kb = new portalui_saiLabelEdit(this,{bound:[720,16,200,20],caption:"Nilai KasBank",tipeText:ttNilai,readOnly: true, tag:1,text:"0"});
		this.p1 = new portalui_panel(this,{bound:[20,30,900,330],caption:"Daftar SPB Hutang Apotek"});
		this.sg = new portalui_saiGrid(this.p1,{bound:[0,20,895,305],colCount:8,tag:2,
					colTitle:["Status","No SPB","Tanggal","Penerima","Keterangan","Akun Hutang","Nilai SPB","Nilai Pot PPh"],
					colWidth:[[0,1,2,3,4,5,6,7],[70,100,70,130,200,80,100,100]],
					colFormat:[[6,7],[cfNilai,cfNilai]],buttonStyle:[[0],[bsAuto]], 
					picklist:[[0],[new portalui_arrayMap({items:["BAYAR","BELUM"]})]],checkItem:true,
					columnReadOnly:[true,[0,1,2,3,4,5,6],[7]],change:[this,"doChangeCell"],autoAppend:false,
					defaultRow:1,nilaiChange:[this,"doSgChange"]});
		this.p2  = new portalui_panel(this,{bound:[20,480,900,170],caption:"Jurnal Tambahan"});
		this.sg2 = new portalui_saiGrid(this.p2,{bound:[0,20,895,120],colCount:7,tag:3,
			    colTitle:["Kode Akun","Nama Akun","Keterangan","DC","Nilai","Kode PP","Nama PP"],
				colWidth:[[6,5,4,3,2,1,0],[120,80,140,60,280,100,80]],colFormat:[[4],[cfNilai]],
				columnReadOnly:[true,[1],[0,2,3,4,5,6]],ellipsClick:[this,"doEllipseClick2"],
				change:[this,"doChangeCell2"],buttonStyle:[[0,3,5],[bsEllips,bsAuto,bsEllips]],
				picklist:[[3],[new portalui_arrayMap({items:["D","C"]})]],selectCell:[this,"doSelectCell2"],checkItem:true,
				defaultRow:1,nilaiChange:[this, "doSgChange"],autoAppend:true});				
			this.sgn2 = new portalui_sgNavigator(this.p2,{bound:[0,142,900,25],buttonStyle:2,grid:this.sg2});				
		/*
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});		
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);			
		*/
		this.rearrangeChild(10, 22);
		setTipeButton(tbUbahHapus);
		this.maximize();		
		this.setTabChildIndex();
		
		try{			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			
			var sql = new server_util_arrayList();
			sql.add("select kode_akun, nama from masakun where kode_lokasi ='"+this.app._lokasi+"' and block = '0'");
			sql.add("select kode_pp, nama from pp where tipe ='posting' and kode_lokasi ='"+this.app._lokasi+"'");
			this.dbLib.getMultiDataProviderA(sql);
			
			var prd = this.dbLib.getDataProvider("select distinct periode from kas_m where kode_lokasi = '"+this.app._lokasi+"' and modul='KB_APT' order by periode desc",true);
			if (typeof prd == "object"){						
				var items = [];
				for (var i in prd.rs.rows) items.push(prd.rs.rows[i].periode);			
				this.cb_perLama.setItem(new portalui_arrayMap({items:items}));
			}
			this.cb_perLama.setText(this.app._periode);
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_rasapala_fBayark.extend(window.portalui_childForm);
window.app_rasapala_fBayark.implement({
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
			if (parseFloat(this.perLama) == parseFloat(this.e_periode.getText())) this.e_nb.setTag("9");
			else this.e_nb.setTag("0");
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					if (parseFloat(this.perLama) < parseFloat(this.app._periode)) {
						if (this.cJenis.getText() == "KAS") this.jenis = "KK"; else this.jenis = "BK";
						this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'kas_m','no_kas',this.app._lokasi+"-"+this.jenis+this.e_periode.getText().substr(2,4)+".",'0000'));
						sql.add("update a set a.progress = '2' from spb_m a inner join kas_d b on a.no_spb=b.no_bukti and a.kode_lokasi=b.kode_lokasi where b.kode_lokasi= '"+this.app._lokasi+"' and b.no_kas ='"+this.cb_nbLama.getText()+"'");
						sql.add("update kas_m set no_link='"+this.e_nb.getText()+"',no_del = concat(no_kas,'r') where no_kas ='"+this.cb_nbLama.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
						sql.add("insert into kas_m (no_kas,kode_lokasi,no_dokumen,no_bg,akun_kb,tanggal,keterangan,kode_pp,modul,jenis,"+
								"                   periode,kode_curr,kurs,nilai,nik_buat,nik_app,tgl_input,nik_user,posted,no_del,no_link,ref1,kode_bank)"+
								"      select concat(no_kas,'r'),kode_lokasi,no_dokumen,no_bg,akun_kb,'"+this.dp_d1.getDate()+"',keterangan,kode_pp,modul,jenis,"+
								"             '"+this.e_periode.getText()+"',kode_curr,kurs,nilai,'"+this.app_userLog+"',nik_app,now(),'"+this.app._userLog+"','F',no_kas,'-','-',kode_bank "+
								"      from kas_m where no_kas = '"+this.cb_nbLama.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");											
						sql.add("insert into kas_j (no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,ref1,"+
								"                   kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank) "+	
								"   select concat(no_kas,'r'),no_dokumen,'"+this.dp_d1.getDate()+"',no_urut,kode_akun,keterangan,case dc when 'D' then 'C' else 'D' end as dc,nilai,kode_pp,kode_drk,ref1,"+
								"          kode_lokasi,modul,jenis,'"+this.e_periode.getText()+"',kode_curr,kurs,'"+this.app._userLog+"',now(),kode_bank "+
								"   from kas_j where no_kas = '"+this.cb_nbLama.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");								
						this.nb = this.e_nb.getText();
					}
					else{
						sql.add("update a set a.progress = '2' from spb_m a inner join kas_d b on a.no_spb=b.no_bukti and a.kode_lokasi=b.kode_lokasi where b.kode_lokasi= '"+this.app._lokasi+"' and b.no_kas ='"+this.cb_nbLama.getText()+"'");
						sql.add(" delete from kas_m where no_kas ='"+this.cb_nbLama.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
						sql.add(" delete from kas_d where no_kas ='"+this.cb_nbLama.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
						sql.add(" delete from kas_j where no_kas ='"+this.cb_nbLama.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
						this.nb = this.cb_nbLama.getText();
					}					
					
					sql.add("insert into kas_m (no_kas,kode_lokasi,no_dokumen,no_bg,akun_kb,tanggal,keterangan,kode_pp,modul,jenis,"+
							"             periode,kode_curr,kurs,nilai,nik_buat,nik_app,tgl_input,nik_user,posted,no_del,no_link,ref1,kode_bank) values  "+
							"('"+this.nb+"','"+this.app._lokasi+"','"+this.e_dok.getText()+"','-','"+this.cb_akun.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_desc.getText()+"','"+this.app._kodePP+"','KB_APT','"+this.cJenis.getText()+"','"+this.e_periode.getText()+
							"','IDR',1,"+parseNilai(this.e_kb.getText())+",'"+this.app._userLog+"','-',now(),'"+this.app._userLog+"','F','-','-','-','-')");							
					sql.add("insert into kas_j (no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,ref1,"+
								"kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank) values "+	
								"('"+this.nb+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDate()+"',0,'"+this.cb_akun.getText()+
								"','"+this.e_desc.getText()+"','C',"+parseNilai(this.e_kb.getText())+",'"+this.app._kodePP+"','-','-',"+
								"'"+this.app._lokasi+"','KB_APT','KAS',"+
								"'"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',now(),'-')");
					
					if (this.e_pph.getText() != "0") {
						sql.add("insert into kas_j (no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,ref1,"+
								"kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank) values "+	
								"('"+this.nb+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDate()+"',1,'"+this.cb_pph.getText()+
								"','"+this.e_desc.getText()+"','C',"+parseNilai(this.e_pph.getText())+",'"+this.app._kodePP+"','-','-',"+
								"'"+this.app._lokasi+"','KB_APT','PPH',"+
								"'"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',now(),'-')");
					}
					var idx = 2;
					for (var i=0; i < this.sg.rows.getLength(); i++){
						if (this.sg.cells(0,i)=="BAYAR" && this.sg.rowValid(i)) {
							sql.add("insert into kas_j (no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,ref1,"+
									"kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank) values "+	
									"('"+this.nb+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDate()+"',"+idx+",'"+this.sg.cells(5,i)+
									"','Pembayaran SPB : "+this.sg.cells(1,i)+"','D',"+parseNilai(this.sg.cells(6,i))+",'"+this.app._kodePP+"','-','-',"+
									"'"+this.app._lokasi+"','KB_APT','SPB',"+
									"'"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',now(),'-')");
							sql.add("insert into kas_d(no_kas,no_bukti,modul,catatan,no_del,kode_lokasi,nilai) values "+
							  	    "                 ('"+this.nb+"','"+this.sg.cells(1,i)+"','SPBAPT','-','-','"+this.app._lokasi+"',"+parseNilai(this.sg.cells(6,i))+")");
							sql.add("update spb_m set progress='2' where no_spb='"+this.sg.cells(1,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
							idx++;
						}
					}
					var idx =999;					
					if (this.sg2.getRowValidCount() > 0){
						for (var i=0;i < this.sg2.getRowCount();i++){
							if (this.sg2.rowValid(i)){
								sql.add("insert into kas_j (no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,ref1,"+
										"kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank) values "+	
										"('"+this.nb+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDate()+"',"+idx+",'"+this.sg2.cells(0,i)+
										"','"+this.sg2.cells(2,i)+"','"+this.sg2.cells(3,i)+"',"+parseNilai(this.sg2.cells(4,i))+",'"+this.sg2.cells(5,i)+"','-','-',"+
										"'"+this.app._lokasi+"','KB_APT','ADD',"+
										"'"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',now(),'-')");
								idx++;
							}
						}						
					}
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
					this.sg.clear(1);
					this.sg2.clear(1);
				}
				break;
			case "ubah" :	
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				if ((this.posted == "T") && (parseFloat(this.perLama) >= parseFloat(this.app._periode))){
					system.alert(this,"Transaksi sudah diposting tidak dapat dikoreksi.","Lakukan Unposting dahulu, untuk koreksi.");
					return false;
				}
				if (nilaiToFloat(this.e_kb.getText() <= 0)){
					system.alert(this,"Transaksi tidak valid.","Nilai kasbank tidak boleh kurang atau sama dengan nol.");
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
				else this.simpan();
				break;
			case "simpancek" : this.simpan();			
				break;
			case "hapus" :
				if ((this.posted == "T") && (parseFloat(this.perLama) >= parseFloat(this.app._periode))) {
					system.alert(this,"Transaksi sudah posting.","Lakukan unposting dahulu.");
					return false;
				}
				try{	
					uses("server_util_arrayList");
					sql = new server_util_arrayList();	
					if (parseFloat(this.perLama) < parseFloat(this.app._periode)) {
						sql.add("update a set a.progress = '2' from spb_m a inner join kas_d b on a.no_spb=b.no_bukti and a.kode_lokasi=b.kode_lokasi where b.kode_lokasi= '"+this.app._lokasi+"' and b.no_kas ='"+this.cb_nbLama.getText()+"'");
						sql.add("update kas_m set no_del = concat(no_kas,'r') where no_kas ='"+this.cb_nbLama.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
						sql.add("insert into kas_m (no_kas,kode_lokasi,no_dokumen,no_bg,akun_kb,tanggal,keterangan,kode_pp,modul,jenis,"+
								"                   periode,kode_curr,kurs,nilai,nik_buat,nik_app,tgl_input,nik_user,posted,no_del,no_link,ref1,kode_bank)"+
								"      select concat(no_kas,'r'),kode_lokasi,no_dokumen,no_bg,akun_kb,'"+this.dp_d1.getDate()+"',keterangan,kode_pp,modul,jenis,"+
								"             '"+this.e_periode.getText()+"',kode_curr,kurs,nilai,'"+this.app._userLog+"',nik_app,now(),'"+this.app._userLog+"','F',no_kas,'-','-',kode_bank "+
								"      from kas_m where no_kas = '"+this.cb_nbLama.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");						
						sql.add("insert into kas_j (no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,ref1,"+
								"                   kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank) "+	
								"   select concat(no_kas,'r'),no_dokumen,'"+this.dp_d1.getDate()+"',no_urut,kode_akun,keterangan,case dc when 'D' then 'C' else 'D' end as dc,nilai,kode_pp,kode_drk,ref1,"+
								"          kode_lokasi,modul,jenis,'"+this.e_periode.getText()+"',kode_curr,kurs,'"+this.app._userLog+"',now(),kode_bank "+
								"   from kas_j where no_kas = '"+this.cb_nbLama.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");								
					}
					else{
						sql.add("update a set a.progress = '2' from spb_m a inner join kas_d b on a.no_spb=b.no_bukti and a.kode_lokasi=b.kode_lokasi where b.kode_lokasi= '"+this.app._lokasi+"' and b.no_kas ='"+this.cb_nbLama.getText()+"'");
						sql.add(" delete from kas_m where no_kas ='"+this.cb_nbLama.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
						sql.add(" delete from kas_d where no_kas ='"+this.cb_nbLama.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
						sql.add(" delete from kas_j where no_kas ='"+this.cb_nbLama.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
					}		
					this.dbLib.execArraySQL(sql);	
				} catch(e){
					alert(e)
				}
			break;
		}
	},
	doChange:function(sender){
			this.e_nb.setText("");
	},
	doClick:function(sender){
			if (this.cJenis.getText() == "KAS") this.jenis = "KK"; else this.jenis = "BK";
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'kas_m','no_kas',this.app._lokasi+"-"+this.jenis+this.e_periode.getText().substr(2,4)+".",'0000'));
		    this.e_dok.setFocus();
	},
	doBtnClick: function(sender, event){
		try{
			if (sender == this.cb_nbLama) {   
			    this.standarLib.showListData(this, "Daftar KasBank",sender,undefined, 
											  "select no_kas,no_dokumen from kas_m where kode_lokasi='"+this.app._lokasi+"' and periode='"+this.cb_perLama.getText()+"' and no_del='-' and modul='KB_APT' and posted ='F'", 
											  "select count(no_kas)     from kas_m where kode_lokasi='"+this.app._lokasi+"' and periode='"+this.cb_perLama.getText()+"' and no_del='-' and modul='KB_APT' and posted ='F'", 
											  ["no_kas","no_dokumen"],"and",["No KasBank","No Dokumen"],false);				
				this.standarLib.clearByTag(this, new Array("1","9"),undefined);		
				this.sg.clear(1);
				this.sg2.clear(1);
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doLoadData: function(sender){
		try{					
			if (this.cb_nbLama.getText() != ""){
				var data = this.dbLib.getDataProvider("select a.no_spb,date_format(a.tanggal,'%d/%m/%Y') as tanggal,a.kode_terima+' - '+b.nama as penerima,a.keterangan,a.nilai,a.akun_hutang,y.nilai as pph,y.kode_akun as akun_pph,yy.nama as nama_pph, "+
													  "       z.periode,z.posted,z.tanggal as tgl,z.jenis,z.no_dokumen as no_dok,z.keterangan as ket,z.akun_kb,zz.nama as nama_kb "+
													  "from  spb_m a inner join vendor b on a.kode_terima=b.kode_vendor and a.kode_lokasi=b.kode_lokasi "+
													  "              inner join kas_d x on x.no_bukti = a.no_spb and x.kode_lokasi=a.kode_lokasi "+
													  "              inner join kas_m z on x.no_kas=z.no_kas and x.kode_lokasi=z.kode_lokasi "+
													  "              inner join kas_j y on x.no_kas=y.no_kas and x.kode_lokasi=y.kode_lokasi and y.jenis ='PPH' "+
													  "              inner join masakun yy on y.kode_akun=yy.kode_akun and yy.kode_lokasi=y.kode_lokasi "+
													  "              inner join masakun zz on zz.kode_akun=z.akun_kb and zz.kode_lokasi=z.kode_lokasi "+
													  "where x.no_kas = '"+this.cb_nbLama.getText()+"' and x.kode_lokasi='"+this.app._lokasi+"'");				
				eval("data = "+data+";");
				if (typeof data == "object"){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg.appendData(["BAYAR",line.no_spb,line.tanggal,line.penerima,line.keterangan,line.akun_hutang,floatToNilai(line.nilai),floatToNilai(line.pph)]);
					}
					this.sg.validasi();	
					this.perLama = line.periode;
					this.posted = line.posted;
					this.e_periode.setText(line.periode);
					this.dp_d1.setText(line.tanggal);
					this.cJenis.setText(line.jenis);
					this.e_dok.setText(line.no_dok);
					this.e_desc.setText(line.ket);
					this.cb_akun.setText(line.akun_kb,line.nama_kb);
					this.cb_pph.setText(line.akun_pph,line.nama_pph);
					
				}
				
				var data = this.dbLib.getDataProvider("select a.kode_akun,b.nama as nama_akun,a.keterangan,a.dc,a.nilai,a.kode_pp,c.nama as nama_pp "+
													  "from  kas_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
													  "              inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
													  "where a.no_kas = '"+this.cb_nbLama.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.jenis = 'ADD' ");				
				eval("data = "+data+";");
				if (typeof data == "object"){
					var line;
					this.sg2.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg2.appendData([line.kode_akun,line.nama_akun,line.keterangan,line.dc.toUpperCase(),floatToNilai(line.nilai),line.kode_pp,line.nama_pp]);
					}
					this.sg2.validasi();
				}
			}
			else {
				system.alert(this,"No Bukti KasBank Lama tidak valid.","No Bukti KasBank Lama harus dipilih.");
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
		else this.e_periode.setText(this.app._periode);
		this.e_nb.setText("");
	},
	doChangeCell: function(sender, col, row){
		if ( (col == 0 && this.sg.getCell(0,row) != "")  || (col == 7 && this.sg.getCell(7,row) != "") ){
			this.sg.validasi();
		}
	},
	doSgChange: function(sender, col, row){
		var tot1 = tot2 = tot3 = 0;			
		for (var i = 0;i < this.sg.getRowCount();i++){
			if ((this.sg.cells(0,i) == "BAYAR")&&(this.sg.cells(6,i) != "")&&(this.sg.cells(7,i) != "")) {
				tot1 += nilaiToFloat(this.sg.cells(6,i));
				tot2 += nilaiToFloat(this.sg.cells(7,i));
			}
		}
		for (var i = 0;i < this.sg2.getRowCount();i++){
			if (this.sg2.cells(4,i) != "") {
				if (this.sg2.cells(3,i) == "D") tot3 += nilaiToFloat(this.sg2.cells(4,i));
				else {if (this.sg2.cells(3,i) == "C") tot3 = tot3 - nilaiToFloat(this.sg2.cells(4,i));}
			}
		}
		this.e_pph.setText(floatToNilai(tot2));
		this.e_kb.setText(floatToNilai(tot1 - tot2 + tot3));
	},	
	doEllipseClick2: function(sender, col, row){
		try{						
			if (col == 0){
				this.standarLib.showListData(this, "Daftar Akun Jurnal Tambahan",sender,undefined, 
										  "select kode_akun, nama  from masakun where block= '0' and kode_lokasi = '"+this.app._lokasi+"'",
										  "select count(kode_akun) from masakun where block= '0' and kode_lokasi = '"+this.app._lokasi+"'",
										  ["kode_akun","nama"],"and",["Kode","Nama"],false);				
			}
			if (col == 5){
				this.standarLib.showListData(this, "Daftar PP",sender,undefined, 
										  "select kode_pp, nama  from pp where tipe='posting' and kode_lokasi = '"+this.app._lokasi+"'",
										  "select count(kode_pp)  from pp where tipe='posting' and kode_lokasi = '"+this.app._lokasi+"'",
										  ["kode_pp","nama"],"and",["Kode","Nama"],false);				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doChangeCell2 : function(sender, col, row){
		try{
			sender.onChange.set(undefined,undefined);
			if (col == 0) {
				var akun = this.dataAkun.get(sender.cells(0,row));
				if(akun)
					sender.cells(1,row,akun);
				else {                                    
					if (trim(sender.cells(0,row)) != "") system.alert(this,"Akun "+sender.cells(0,row)+" tidak ditemukan","Coba akun yang lainnya.","checkAkun");                
					sender.cells(0,row,"");
					sender.cells(1,row,"");
				}
			}
			if ((col == 3) || (col == 4)){
				this.sg2.validasi();
			}
			sender.onChange.set(this,"doChangeCell2");
		}catch(e){ sender.onChange.set(this,"doChangeCell2");}
	},
    doSelectCell2 : function(sender, col, row){
		if ((col == 2) && (this.sg2.getCell(2,row) == "")){
			this.sg2.setCell(2,row,this.sg2.cells(1,row));
		}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){							
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (No : "+ this.nb+")");							
							/*
							if (this.cb_preview.isChecked()){
								this.previewReport(this.nb);
							}else 
							*/
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;
		
					case "getMultiDataProvider":
					eval("result = "+result+";");
					if (typeof result != "string"){
						this.dataAkun = new portalui_arrayMap();
						if (result.result[0]){	    			        
							var line;
							for (var i in result.result[0].rs.rows){
								line = result.result[0].rs.rows[i];
								this.dataAkun.set(line.kode_akun, line.nama);
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
	}
	/*
	,
	previewReport: function(nb){
		this.title = new server_util_arrayList({items:["No. Angsuran","Tanggal","Penerima","Keterangan","Jenis","Nilai OE","Kode Agg","Nama Agg","No Kontrak","Nilai Angsuran"]});
		this.widthTable = new server_util_arrayList({items:[80,50,70,150,50,50,100,250,100,100]});
		this.fieldType = new server_util_arrayList({items:["S","S","S","S","S","N","S","S","S","N"]});															
		this.viewer.prepare();
		this.viewer.setVisible(true);
		this.app._mainForm.pButton.setVisible(false);
		this.app._mainForm.reportNavigator.setVisible(true);
		this.viewer.setTotalPage(1);
		this.app._mainForm.reportNavigator.setTotalPage(1);
		this.app._mainForm.reportNavigator.rearrange();
		this.sqlDet = "select a.no_setor,date_format(a.tanggal,'%e/%m/%Y') as tgl,a.no_dokumen,a.keterangan,e.nama as nm,a.nilai as tot, "+
							"b.no_angs,date_format(c.tanggal,'%e/%m/%Y') as tgl2,d.nama as nmapp,c.keterangan as ket,b.jenis,b.nilai_sls,h.kode_agg, g.nama as nm_agg, f.no_simp, sum(f.nilai) as nilai "+
							"from kop_simpsetor_m a inner join kop_simpsetor_d b on a.no_setor=b.no_setor and a.kode_lokasi=b.kode_lokasi and a.no_del='-' and b.dc='D' "+
							"inner join kop_simpangs_m c on b.no_angs=c.no_angs and b.kode_lokasi=c.kode_lokasi "+
							"inner join kop_simpangs_d f on b.no_angs=f.no_angs and b.kode_lokasi=f.kode_lokasi "+
							"inner join kop_simp_m h on h.no_simp=f.no_simp and b.kode_lokasi=h.kode_lokasi "+
							"inner join kop_agg g on h.kode_agg=g.kode_agg and b.kode_lokasi=g.kode_lokasi "+							
							"inner join karyawan d on c.nik_app=d.nik and c.kode_lokasi=d.kode_lokasi "+
							"inner join karyawan e on a.nik_app=e.nik and a.kode_lokasi=e.kode_lokasi ";
		var result  = this.dbLib.getDataProvider(this.sqlDet + " where a.no_setor in ('"+nb+"') "+			
			" and a.kode_lokasi = '"+this.app._lokasi+"' "+
			" group by a.no_setor, a.tanggal, a.no_dokumen, a.keterangan, e.nama, a.nilai, b.no_angs, c.tanggal, d.nama, c.keterangan, b.jenis, b.nilai_sls, h.kode_agg, g.nama, f.no_simp "+
			" order by a.no_setor, b.no_angs ", true);		
		var table = result;
		var htmlHeader="",first = true;
		var no_bill = "";
		var retHtml = "";
		var html = "";
		var table, line, urut=0,total;
		for (var r in table.rs.rows){
			line = table.rs.rows[r];
			if (no_bill != line.no_setor){
				first = true;
				no_bill = line.no_setor;
				if (htmlHeader !== ""){
					html+="<tr align='right' bgcolor='#EEEEEE'><td class='isi_laporan' colspan='10'>Total Setoran</td>"+
						"<td class='isi_laporan'>"+floatToNilai(total)+"</td></tr>";
					html += "</table>";		 
					retHtml += "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>"+
						"<tr><td>"+htmlHeader+"</td></tr>"+
						"<tr><td>"+html+"</td></tr></table></br></br>";				
				}
			}
			if (first){
				urut=0;
				total=0;
				html = "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>"+
					"<tr bgcolor='#cccccc'>"+
							"<td class='header_laporan' align='center' width=25>No</td>";
				for (var i in this.title.objList)
					html += "<td class='header_laporan' align='center' width="+this.widthTable.get(i)+">"+this.title.get(i)+"</td>";
				html += "</tr>";
				htmlHeader = "<table border='0' cellspacing='0' cellpadding='0'>";
				htmlHeader += "<tr>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>No. Setoran</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>:</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>"+line.no_setor+"</td>";
				htmlHeader += "</tr>";
				htmlHeader += "<tr>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>Tanggal</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>:</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>"+line.tgl+"</td>";
				htmlHeader += "</tr>";
				htmlHeader += "<tr>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>No. Dokumen</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>:</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>"+line.no_dokumen+"</td>";
				htmlHeader += "</tr>";
				htmlHeader += "<tr>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>Keterangan</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>:</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>"+line.keterangan+"</td>";
				htmlHeader += "</tr>";
				htmlHeader += "<tr>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>Penyetor</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>:</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>"+line.nm+"</td>";
				htmlHeader += "</tr>";
				htmlHeader += "<tr>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>Total Setoran</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>:</td>";
				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>"+floatToNilai(line.tot)+"</td>";
				htmlHeader += "</tr>";
				htmlHeader += "</table>";
			}
			urut+=1;
			html += "<tr><td height='20' class='isi_laporan' valign='top'>"+urut+".</td>";
			for (var c in line){
				if (c === "no_angs" || c === "tgl2" || c === "nmapp" || c === "ket" || c === "jenis" || c === "nilai_sls" || c === "nilai" || c == "kode_agg" || c == "nm_agg" || c == "no_simp" || c == "nilai_simp"){
					if (c === "nilai_sls" || c === "nilai" || c == "nilai_simp")
						html += "<td height='20' class='isi_laporan' align='right' valign='top' >"+floatToNilai(line[c])+"</td>";
					else html += "<td height='20' class='isi_laporan' valign='top' >"+line[c]+"</td>";
				}
			}
			total+= parseFloat(line.nilai);
			html += "</tr>";
			first = false;
		}		
		html+="<tr align='right' bgcolor='#EEEEEE'><td class='isi_laporan' colspan='10'>Total Setoran</td>"+
				"<td class='isi_laporan'>"+floatToNilai(total)+"</td></tr>";
		if (htmlHeader !== ""){
			retHtml += "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>"+
				"<tr><td>"+htmlHeader+"</td></tr>"+
				"<tr><td>"+html+"</td></tr></table>";				
		}
		this.previewHtml(retHtml);
	},
	doCloseReportClick: function(sender)
	{
		switch(sender.getName())
		{			
			default :
				this.viewer.setVisible(false);
				this.app._mainForm.pButton.setVisible(true);
				this.app._mainForm.reportNavigator.setVisible(false);  
				this.standarLib.clearByTag(this, new Array("0","1","9"),this.e_nb);						
			break;
		}
	},
	previewHtml: function(dthtml){
		var header = "DAFTAR DETAIL SETORAN KB ANGSURAN";		
		var html = "<div align='center' class='judul_laporan' style='{width:100%;font-size:14;font-weight:bold;}'><br><br>"+this.app._namalokasi.toUpperCase()+"<br>"+header+"<br>";
		var d = new Date();
		html += "<br><span style='{font-size:9;}'>Dicetak "+ d.toLocaleString()+"</span>";
		html += "</div>";
		html += "<center>"+dthtml+"</center>";
		this.viewer.preview(html);
		this.allHtml = html;
	}
*/	
});

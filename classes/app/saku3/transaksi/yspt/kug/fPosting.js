window.app_saku3_transaksi_yspt_kug_fPosting = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_yspt_kug_fPosting.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_yspt_kug_fPosting";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Posting Transaksi", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No Posting",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_ket = new saiLabelEdit(this,{bound:[20,18,450,20],caption:"Deskripsi", maxLength:150});				
		this.cb_pp = new saiCBBL(this,{bound:[20,17,220,20],caption:"PP", readOnly:true, multiSelection:false, tag:2});			
		this.bLoad = new button(this,{bound:[830,17,80,18],caption:"Load Data",click:[this,"doLoad"]});			
		this.bPost = new button(this,{bound:[930,17,80,18],caption:"Posting All",click:[this,"doClick"]});			
		
		this.pc1 = new pageControl(this,{bound:[20,12,1000,357], childPage:["Modul","Data Transaksi Modul","Detail Transaksi","Filter Data","Pesan Error"]});
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:3,tag:9,				
				colTitle:["Status","Modul","Nama Modul"],
				colWidth:[[2,1,0],[300,100,80]],
				columnReadOnly:[true,[1,2],[0]],				
				buttonStyle:[[0],[bsAuto]], picklist:[[0],[new portalui_arrayMap({items:["TRUE","FALSE"]})]],checkItem:true,
				defaultRow:1,autoAppend:false});
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1});				
		
		this.sg = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:6,tag:0,
		            colTitle:["Status","No Bukti","No Dokumen","Tanggal","Keterangan","Jenis"],
					colWidth:[[5,4,3,2,1,0],[50,300,70,200,150,80]],
					columnReadOnly:[true,[0,1,2,3,4,5],[]],
					buttonStyle:[[0],[bsAuto]], 
					picklist:[[0],[new portalui_arrayMap({items:["POSTING","INPROG"]})]],
					change:[this,"doChangeCells"],dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});		
		
		this.sg2 = new saiGrid(this.pc1.childPage[2],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:11,tag:9,
		            colTitle:["Kode Akun","Nama Akun","DC","Keterangan","Nilai","Kode PP","Nama PP","Kode DRK","Nama DRK","Kode CF","Nama CF"],
					colWidth:[[10,9,8,7,6,5,4,3,2,1,0],[150,80,150,80,150,80,100,200,50,150,80]],
					colFormat:[[4],[cfNilai]],readOnly: true,autoAppend:false,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg2});	
		
		this.c_modul = new saiCB(this.pc1.childPage[3],{bound:[20,11,202,20],caption:"Modul",items:["JU","KB","AP","TAK","FA"], readOnly:true,tag:9,change:[this,"doChange"]});
		this.cb_bukti = new saiCBBL(this.pc1.childPage[3],{bound:[20,22,220,20],caption:"Cari Bukti",readOnly:true,multiSelection:false,rightLabelVisible:false,tag:9,change:[this,"doChange"]});
		
		this.e_memo = new saiMemo(this.pc1.childPage[4],{bound:[1,24,590,330],labelWidth:0,tag:9,readOnly:true});
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[3].rearrangeChild(10, 23);	
		this.pc1.childPage[4].rearrangeChild(10, 23);	
		
		setTipeButton(tbSimpan);
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
			 			
			this.sg1.clear();				
			this.sg1.appendData(["TRUE","JU","Jurnal Umum"]);
			this.sg1.appendData(["TRUE","KB","Kas Bank"]);				
			this.sg1.appendData(["TRUE","AP","Hutang"]);
			this.sg1.appendData(["TRUE","TAK","Transaksi Antar Kantor"]);	
			this.sg1.appendData(["TRUE","FA","Fixed Asset"]);	
			this.sg1.appendData(["TRUE","SI","Kesiswaan"]);		
			
			this.c_modul.setText("");
			this.dataJU = {rs:{rows:[]}};

			if (this.app._userStatus == "A") {
				this.cb_pp.setSQL("select a.kode_pp, a.nama from pp a where a.flag_aktif='1' and a.kode_lokasi='"+this.app._lokasi+"' union select '-','-' ",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);												
				this.cb_pp.setText("-");
			}
			else {
				this.cb_pp.setSQL("select kode_pp, nama from pp where kode_pp='"+this.app._kodePP+"' and flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);												
				this.cb_pp.setText(this.app._kodePP);
			}
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_yspt_kug_fPosting.extend(window.childForm);
window.app_saku3_transaksi_yspt_kug_fPosting.implement({
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
			this.doClick(this.i_gen);		
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{													
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from gldt where no_bukti in ("+this.nobukti+") and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("insert into posting_m(no_post,kode_lokasi,periode,tanggal,modul,keterangan,nik_buat,nik_app,no_del,tgl_input,nik_user,nilai) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','-','"+this.e_ket.getText()+"','"+this.app._userLog+"','"+this.app._userLog+"','-',getdate(),'"+this.app._userLog+"',0)");
					
					var line;
					for (var i=0;i < this.dataJU.rs.rows.length;i++){
						line = this.dataJU.rs.rows[i];
						if (line.status.toUpperCase() == "POSTING"){
							sql.add("insert into posting_d(no_post,modul,no_bukti,status,catatan,no_del,kode_lokasi,periode) values "+
									"	('"+this.e_nb.getText()+"','"+line.jenis.toUpperCase()+"','"+line.no_bukti+"','"+line.status.toUpperCase()+"','-','-','"+this.app._lokasi+"','"+this.e_periode.getText()+"')");
							sql.add("call sp_post_modul ('"+line.jenis.toUpperCase()+"','"+this.app._lokasi+"','"+line.no_bukti+"')");
						}
					}				
					sql.add("call sp_exs_proses_ypt ('"+this.app._lokasi+"','"+this.e_periode.getText()+"','FS1')");
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
					this.c_modul.setText("");
					this.cb_bukti.setText("","");
					this.sg.setTag("0");
					this.dataJU.rs.rows = [];
					this.sg.clear(1); this.sg2.clear(1);
					this.pc1.setActivePage(this.pc1.childPage[0]);
					setTipeButton(tbSimpan);
				break;
			case "simpan" :	
				var msg  = "";
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				
				var isAda = false;
				this.nobukti = "";
				for (var i=0;i < this.dataJU.rs.rows.length;i++){
					if (this.dataJU.rs.rows[i].status == "POSTING") {
						isAda = true;
						this.nobukti += ",'"+this.dataJU.rs.rows[i].no_bukti+"'";
					}
				}							
				if (!isAda){
					system.alert(this,"Transaksi tidak valid.","Tidak ada transaksi dengan status POSTING.");
					return false;
				}				
				this.nobukti = this.nobukti.substr(1);											
				var strSQL = "select no_bukti+' - '+periode as bukper from ("+
						 "select a.no_ju as no_bukti,a.periode,sum(case a.dc when 'D' then a.nilai else -a.nilai end) as total "+
						 "from ju_j a inner join ju_m b on a.no_ju=b.no_ju and a.kode_lokasi=b.kode_lokasi and b.posted='F' "+
						 "where a.no_ju in ("+this.nobukti+") and a.kode_lokasi='"+this.app._lokasi+"' group by a.no_ju,a.periode "+
						 "union "+
						 "select a.no_kas as no_bukti,a.periode,sum(case a.dc when 'D' then a.nilai else -a.nilai end) as total  "+
						 "from kas_j a inner join kas_m b on a.no_kas=b.no_kas and a.kode_lokasi=b.kode_lokasi and b.posted='F' "+
						 "where a.no_kas in ("+this.nobukti+") and a.kode_lokasi='"+this.app._lokasi+"' group by a.no_kas,a.periode "+						 
						 "union "+
						 "select a.no_kirim as no_bukti,a.periode,sum(case a.dc when 'D' then a.nilai else -a.nilai end) as total  "+
						 "from takkirim_j a inner join takkirim_m b on a.no_kirim=b.no_kirim and a.kode_lokasi=b.kode_lokasi and b.posted='F' "+
						 "where a.no_kirim in ("+this.nobukti+") and a.kode_lokasi='"+this.app._lokasi+"' group by a.no_kirim,a.periode "+					
						 "union "+
						 "select a.no_terima as no_bukti,a.periode,sum(case a.dc when 'D' then a.nilai else -a.nilai end) as total  "+
						 "from takterima_j a inner join takterima_m b on a.no_terima=b.no_terima and a.kode_lokasi=b.kode_lokasi and b.posted='F' "+
						 "where a.no_terima in ("+this.nobukti+") and a.kode_lokasi='"+this.app._lokasi+"' group by a.no_terima,a.periode "+											 
						 "union "+
						 "select a.no_hutang as no_bukti,a.periode,sum(case a.dc when 'D' then a.nilai else -a.nilai end) as total  "+
						 "from hutang_j a inner join hutang_m b on a.no_hutang=b.no_hutang and a.kode_lokasi=b.kode_lokasi and b.posted='F' "+
						 "where a.no_hutang in ("+this.nobukti+") and a.kode_lokasi='"+this.app._lokasi+"' group by a.no_hutang,a.periode "+						 
						 
						 "union "+
						 "select a.no_fasusut as no_bukti,a.periode,sum(case a.dc when 'D' then a.nilai else -a.nilai end) as total "+
						 "from fasusut_j a inner join fasusut_m b on a.no_fasusut=b.no_fasusut and a.kode_lokasi=b.kode_lokasi and b.posted='F' "+
						 "where a.no_fasusut in ("+this.nobukti+") and a.kode_lokasi='"+this.app._lokasi+"' group by a.no_fasusut,a.periode "+
						 "union "+
						 "select a.no_woapp as no_bukti,a.periode,sum(case a.dc when 'D' then a.nilai else -a.nilai end) as total "+
						 "from fawoapp_j a inner join fawoapp_m b on a.no_woapp=b.no_woapp and a.kode_lokasi=b.kode_lokasi and b.posted='F' "+
						 "where a.no_woapp in ("+this.nobukti+") and a.kode_lokasi='"+this.app._lokasi+"' group by a.no_woapp,a.periode "+
						 
						 "union "+
						 "select a.no_bill as no_bukti,a.periode,sum(case a.dc when 'D' then a.nilai else -a.nilai end) as total  "+
						 "from sis_bill_j a inner join sis_bill_m b on a.no_bill=b.no_bill and a.kode_lokasi=b.kode_lokasi and b.posted='F' "+
						 "where a.no_bill in ("+this.nobukti+") and a.kode_lokasi='"+this.app._lokasi+"' group by a.no_bill,a.periode "+						 
						 "union "+
						 "select a.no_rekon as no_bukti,a.periode,sum(case a.dc when 'D' then a.nilai else -a.nilai end) as total  "+
						 "from sis_rekon_j a inner join sis_rekon_m b on a.no_rekon=b.no_rekon and a.kode_lokasi=b.kode_lokasi and b.posted='F' "+
						 "where a.no_rekon in ("+this.nobukti+") and a.kode_lokasi='"+this.app._lokasi+"' group by a.no_rekon,a.periode "+						 

						 ") x where x.total <> 0 ";						 
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;			
					for (var i in data.rs.rows){						
						line = data.rs.rows[i];													
						msg+= "Data Bukti Tidak Balance.(Bukti - Periode : "+line.bukper+")\n";
					}
				}				
				this.e_memo.setText(msg);
				if (msg != "") {
					system.alert(this,"Posting tidak valid.","Terdapat Bukti Jurnal tidak Balanace Lihat Pesan Error.");
					return false;
				}
			
				if (parseFloat(this.app._periode) != parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode posting harus sama dengan periode aktif sistem.["+this.app._periode+"]");
					return false;
				}
				else this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;			
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
		else this.e_periode.setText(this.app._periode);		
		this.doClick(this.i_gen);
	},
	doClick:function(sender){
		if (sender == this.i_gen) {
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"posting_m","no_post",this.app._lokasi+"-PT"+this.e_periode.getText().substr(2,4)+".","0000"));
			this.e_ket.setFocus();
			setTipeButton(tbSimpan);
		}
		if (sender == this.bPost) {
			for (var i=0;i < this.dataJU.rs.rows.length;i++){
				this.dataJU.rs.rows[i].status = "POSTING";
			}
			this.doTampilData(this.page);
		}	
	},
	doLoad:function(sender){
		var strSQL = "";
		for (var i=0;i < this.sg1.getRowCount();i++){
			if (this.sg1.rowValid(i) && this.sg1.cells(0,i)=="TRUE") {
				if (this.sg1.cells(1,i) == "JU") 
					strSQL += "union all "+
					          "select 'INPROG' as status,no_ju as no_bukti,no_dokumen,convert(varchar,tanggal,103) as tanggal,keterangan,'JU' as jenis "+
							  "from ju_m where posted='F' and periode='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ";					
				if (this.sg1.cells(1,i) == "KB") 
					strSQL += "union all "+
							  "select 'INPROG' as status,no_kas as no_bukti,no_dokumen,convert(varchar,tanggal,103) as tanggal,keterangan,'KB' as jenis "+
							  "from kas_m where posted='F' and periode='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ";				
				if (this.sg1.cells(1,i) == "TAK") 
					strSQL += "union all "+
							  "select 'INPROG' as status,no_kirim as no_bukti,no_dokumen,convert(varchar,tanggal,103) as tanggal,keterangan,'TK' as jenis "+
							  "from takkirim_m where posted='F' and periode='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' "+
							  "union all "+
							  "select 'INPROG' as status,no_terima as no_bukti,no_dokumen,convert(varchar,tanggal,103) as tanggal,keterangan,'TT' as jenis "+
							  "from takterima_m where posted='F' and periode='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ";
				if (this.sg1.cells(1,i) == "AP") 
					strSQL += "union all "+
							  "select 'INPROG' as status,no_hutang as no_bukti,no_dokumen,convert(varchar,tanggal,103) as tanggal,keterangan,'HU' as jenis "+
							  "from hutang_m where posted='F' and periode='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ";				
				if (this.sg1.cells(1,i) == "FA") 
					strSQL += "union all "+
							  "select 'INPROG' as status,no_fasusut as no_bukti,no_dokumen,convert(varchar,tanggal,103) as tanggal,keterangan,'FASST' as jenis "+
							  "from fasusut_m "+
							  "where posted='F' and periode='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'" +
							  "union "+
							  "select 'INPROG' as status,no_woapp as no_bukti,no_dokumen,convert(varchar,tanggal,103) as tanggal,keterangan,'FAWO' as jenis "+
							  "from fawoapp_m "+
							  "where posted='F' and periode='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ";	
				if (this.sg1.cells(1,i) == "SI") {
					if (this.cb_pp.getText()!="-") var strPP = " and kode_pp='"+this.cb_pp.getText()+"' ";
					else var strPP = " ";
					strSQL += "union all "+
							  "select 'INPROG' as status,no_bill as no_bukti,'-' as no_dokumen,convert(varchar,tanggal,103) as tanggal,keterangan,'BILL' as jenis "+
							  "from sis_bill_m "+
							  "where posted='F' and periode='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'"+strPP +
							  "union "+
							  "select 'INPROG' as status,no_rekon as no_bukti,no_dokumen,convert(varchar,tanggal,103) as tanggal,keterangan,'RKN' as jenis "+
							  "from sis_rekon_m "+
							  "where posted='F' and periode='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' "+strPP;		
				}
			}						
		}		
		strSQL = strSQL.substr(9);		
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn.rearrange();
			this.doTampilData(1);
		} else this.sg.clear(1);						
		this.pc1.setActivePage(this.pc1.childPage[1]);
	},
	doChange:function(sender){
		if (sender == this.e_periode || sender == this.c_jenis) this.doClick(this.i_gen);
		if (sender == this.e_periode) {
			this.dataJU.rs.rows = [];
			this.sg.clear(1); this.sg2.clear(1);
		}		
		if (sender == this.c_modul && this.c_modul.getText()!="") {
			if (this.c_modul.getText()=="JU") this.cb_bukti.setSQL("select no_ju as no_bukti,no_dokumen,convert(varchar,tanggal,103) as tanggal,keterangan,'JU' as jenis from ju_m where posted='F' and periode='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["no_bukti","no_dokumen","tanggal","keterangan","jenis"],false,["No Bukti","No Dokumen","Tanggal","Keterangan","Jenis"],"and","Data Bukti JU",true);			
			if (this.c_modul.getText()=="KB") this.cb_bukti.setSQL("select no_kas as no_bukti,no_dokumen,convert(varchar,tanggal,103) as tanggal,keterangan,'KB' as jenis from kas_m where posted='F' and periode='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["no_bukti","no_dokumen","tanggal","keterangan","jenis"],false,["No Bukti","No Dokumen","Tanggal","Keterangan","jenis"],"and","Data Bukti KB",true);			
			if (this.c_modul.getText()=="TAK") this.cb_bukti.setSQL(
							"select no_kirim as no_bukti,no_dokumen,convert(varchar,tanggal,103) as tanggal,keterangan,'TK' as jenis from takkirim_m where posted='F' and periode='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' "+
							"union all "+
							"select no_terima as no_bukti,no_dokumen,convert(varchar,tanggal,103) as tanggal,keterangan,'TT' as jenis from takterima_m where posted='F' and periode='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' "
							,["no_bukti","no_dokumen","tanggal","keterangan","jenis"],false,["No Bukti","No Dokumen","Tanggal","Keterangan","jenis"],"and","Data Bukti TAK",true);			
			if (this.c_modul.getText()=="AP") this.cb_bukti.setSQL("select no_hutang as no_bukti,no_dokumen,convert(varchar,tanggal,103) as tanggal,keterangan,'HU' as jenis from hutang_m where posted='F' and periode='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["no_bukti","no_dokumen","tanggal","keterangan","jenis"],false,["No Bukti","No Dokumen","Tanggal","Keterangan","jenis"],"and","Data Bukti",true);			
			if (this.c_modul.getText()=="FA") 
				this.cb_bukti.setSQL("select no_fasusut as no_bukti,no_dokumen,convert(varchar,tanggal,103) as tanggal,keterangan,'FASST' as jenis from fasusut_m where posted='F' and periode='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' "+
									 "union "+
									 "select no_woapp as no_bukti,no_dokumen,convert(varchar,tanggal,103) as tanggal,keterangan,'FAWO' as jenis from fawoapp_m where posted='F' and periode='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' "
									,["no_bukti","no_dokumen","tanggal","keterangan","jenis"],false,["No Bukti","No Dokumen","Tanggal","Keterangan","Jenis"],"and","Data Bukti FA",true);
			if (this.c_modul.getText()=="SI") 
				this.cb_bukti.setSQL("select no_bill as no_bukti,'-' as no_dokumen,convert(varchar,tanggal,103) as tanggal,keterangan,'BILL' as jenis from sis_bill_m where posted='F' and periode='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' "+
									 "union "+
									 "select no_rekon as no_bukti,no_dokumen,convert(varchar,tanggal,103) as tanggal,keterangan,'RKN' as jenis from sis_rekon_m where posted='F' and periode='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' "
									,["no_bukti","no_dokumen","tanggal","keterangan","jenis"],false,["No Bukti","No Dokumen","Tanggal","Keterangan","Jenis"],"and","Data Bukti SISWA",true);
		}		
		if (sender == this.cb_bukti && this.cb_bukti.getText()!="") {
			try {
				this.dataJU.rs.rows = [];
				this.dataJU.rs.rows[0] = {status:"INPROG",no_bukti:this.cb_bukti.dataFromList[0],no_dokumen:this.cb_bukti.dataFromList[1],tanggal:this.cb_bukti.dataFromList[2],keterangan:this.cb_bukti.dataFromList[3],jenis:this.cb_bukti.dataFromList[4].toUpperCase()}; 
				this.sgn.setTotalPage(1);
				this.sgn.rearrange();
				this.doTampilData(1);
				this.pc1.setActivePage(this.pc1.childPage[1]);								
			}
			catch(e) {alert(e);}
		}
	},
	doTampilData: function(page) {		
		this.sg.clear(); this.sg2.clear(1);
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];							
			this.sg.appendData([line.status.toUpperCase(),line.no_bukti,line.no_dokumen,line.tanggal,line.keterangan,line.jenis.toUpperCase()]);
		}
		this.sg.setNoUrut(start);		
	},
	doChangeCells: function(sender, col , row) {
		if (col == 0) {
			this.dataJU.rs.rows[((this.page-1)*20) + row].status = this.sg.cells(0,row);
		}
	},
	doDoubleClick: function(sender, col , row) {
		if (this.sg.cells(1,row) != "" && this.sg.cells(5,row) != "") {
			var strSQL = "";
			switch(this.sg.cells(5,row)){
				case "JU" :
							strSQL = "select a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp,a.kode_drk,isnull(d.nama,'-') as nama_drk,'-' as kode_cf,'-' as nama_cf "+
									 "from ju_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
									 "            inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
									 "            left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun=substring(a.periode,1,4) "+
									 "where a.no_ju = '"+this.sg.cells(1,row)+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.dc desc";
					break;
				case "KB" :
							strSQL = "select a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp,a.kode_drk,isnull(d.nama,'-') as nama_drk,isnull(a.kode_cf,'-') as kode_cf,isnull(e.nama,'-') as nama_cf "+
									 "from kas_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
									 "             inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
									 "             left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun=substring(a.periode,1,4) "+
									 "             left join neracacf e on a.kode_cf=e.kode_cf and a.kode_lokasi=e.kode_lokasi "+
									 "where a.no_kas = '"+this.sg.cells(1,row)+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.dc desc";
					break;								
				case "TK" :
							strSQL = "select a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp,a.kode_drk,isnull(d.nama,'-') as nama_drk,'-' as kode_cf,'-' as nama_cf "+
									 "from takkirim_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
									 "             inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
									 "             left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun=substring(a.periode,1,4) "+
									 "where a.no_kirim = '"+this.sg.cells(1,row)+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.dc desc";
					break;								
				case "TT" :
							strSQL = "select a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp,a.kode_drk,isnull(d.nama,'-') as nama_drk,'-' as kode_cf,'-' as nama_cf "+
									 "from takterima_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
									 "             inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
									 "             left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun=substring(a.periode,1,4) "+
									 "where a.no_terima = '"+this.sg.cells(1,row)+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.dc desc";
					break;								
				case "HU" :
							strSQL = "select a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp,a.kode_drk,isnull(d.nama,'-') as nama_drk,'-' as kode_cf,'-' as nama_cf "+
									 "from hutang_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
									 "             inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
									 "             left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun=substring(a.periode,1,4) "+
									 "where a.no_hutang = '"+this.sg.cells(1,row)+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.dc desc";
					break;
					
				case "FASST" :
							strSQL = "select a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp,a.kode_drk,isnull(d.nama,'-') as nama_drk,'-' as kode_cf,'-' as nama_cf "+
									 "from fasusut_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
									 "                 inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
									 "                 left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun=substring(a.periode,1,4) "+
									 "where a.no_fasusut = '"+this.sg.cells(1,row)+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.dc desc";
					break;					
				case "FAWO" :
							strSQL = "select a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp,a.kode_drk,isnull(d.nama,'-') as nama_drk,'-' as kode_cf,'-' as nama_cf "+
									 "from fawoapp_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
									 "                 inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
									 "                 left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun=substring(a.periode,1,4) "+
									 "where a.no_woapp = '"+this.sg.cells(1,row)+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.dc desc";
					break;		
				case "BILL" :
							strSQL = "select a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp,a.kode_drk,isnull(d.nama,'-') as nama_drk,'-' as kode_cf,'-' as nama_cf "+
									"from sis_bill_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
									"                 inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
									"                 left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun=substring(a.periode,1,4) "+
									"where a.no_bill = '"+this.sg.cells(1,row)+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.dc desc";
					break;		
				case "RKN" :
							strSQL = "select a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp,a.kode_drk,isnull(d.nama,'-') as nama_drk,'-' as kode_cf,'-' as nama_cf "+
									"from sis_rekon_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
									"                 inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
									"                 left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun=substring(a.periode,1,4) "+
									"where a.no_rekon = '"+this.sg.cells(1,row)+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.dc desc";
					break;
			}
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg2.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg2.appendData([line.kode_akun,line.nama_akun,line.dc,line.keterangan,floatToNilai(line.nilai),line.kode_pp,line.nama_pp,line.kode_drk,line.nama_drk,line.kode_cf,line.nama_cf]);
				}
			} else this.sg2.clear(1);
			this.pc1.setActivePage(this.pc1.childPage[2]);
		}
	},	
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							this.nama_report="server_report_saku2_gl_rptBuktiJurnal";
							this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_ju='"+this.e_nb.getText()+"' ";
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
			this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
			this.c_modul.setText("");
			this.cb_bukti.setText("","");
			this.sg.setTag("0");
			this.dataJU.rs.rows = [];
			this.sg.clear(1); this.sg2.clear(1);
			this.pc1.setActivePage(this.pc1.childPage[0]);
			setTipeButton(tbSimpan);
		} catch(e) {
			alert(e);
		}
	}
});

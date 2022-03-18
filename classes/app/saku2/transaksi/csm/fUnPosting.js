window.app_saku2_transaksi_csm_fUnPosting = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_csm_fUnPosting.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_csm_fUnPosting";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form UnPosting Transaksi", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No UnPosting",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_ket = new saiLabelEdit(this,{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});		
		this.cb_buat = new saiCBBL(this,{bound:[20,16,200,20],caption:"NIK Pembuat", multiSelection:false, maxLength:10, tag:2 });
		this.cb_app = new saiCBBL(this,{bound:[20,17,200,20],caption:"NIK Approve", multiSelection:false, maxLength:10, tag:2});
		this.c_proses = new saiCB(this,{bound:[20,21,200,20],caption:"Jenis Proses",items:["FRONTEND","BACKEND"], readOnly:true,tag:2});		
		this.c_modul = new saiCB(this,{bound:[20,22,200,20],caption:"Modul",items:["JU","KB","AR","AP","PTG","FA"], readOnly:true,tag:2,change:[this,"doChange"]});
		this.i_postAll = new portalui_imageButton(this,{bound:[225,22,20,20],hint:"UnPosting All",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.cb_bukti = new saiCBBL(this,{bound:[700,22,220,20],caption:"Cari Bukti",readOnly:true,multiSelection:false,rightLabelVisible:false,tag:9,change:[this,"doChange"]});
		
		this.pc1 = new pageControl(this,{bound:[20,12,900,337], childPage:["Data Transaksi Modul","Detail Transaksi"]});
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,10,this.pc1.width-5,this.pc1.height-40],colCount:6,tag:0,
		            colTitle:["Status","No Bukti","No Dokumen","Tanggal","Keterangan","Jenis"],
					colWidth:[[5,4,3,2,1,0],[50,300,70,200,150,80]],
					columnReadOnly:[true,[0,1,2,3,4,5],[]],
					buttonStyle:[[0],[bsAuto]], 
					picklist:[[0],[new portalui_arrayMap({items:["UNPOSTING","INPROG"]})]],
					change:[this,"doChangeCells"],dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});		
		this.sg2 = new saiGrid(this.pc1.childPage[1],{bound:[1,10,this.pc1.width-5,this.pc1.height-40],colCount:11,tag:9,
		            colTitle:["Kode Akun","Nama Akun","DC","Keterangan","Nilai","Kode PP","Nama PP","Kode DRK","Nama DRK","Kode CF","Nama CF"],
					colWidth:[[10,9,8,7,6,5,4,3,2,1,0],[150,80,150,80,150,80,100,200,50,150,80]],
					colMaxLength:[[9,7,5,3,2,0],[10,10,10,150,1,20]],
					colFormat:[[4],[cfNilai]],readOnly: true,autoAppend:false,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg2});	
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);
		
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			this.c_modul.setText("");
			this.cb_buat.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Pembuat",true);
			this.cb_app.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Approval",true);
			var data = this.dbLib.getDataProvider("select nik,nama from karyawan where nik='"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_buat.setText(line.nik,line.nama);
			} else this.cb_buat.setText("","");
			var data = this.dbLib.getDataProvider("select a.flag,b.nama from spro a inner join karyawan b on a.flag=b.nik and a.kode_lokasi=b.kode_lokasi where kode_spro='JUAPP' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_app.setText(line.flag,line.nama);
			} else this.cb_app.setText("","");
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_csm_fUnPosting.extend(window.childForm);
window.app_saku2_transaksi_csm_fUnPosting.implement({
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
			if (this.c_proses.getText() == "FRONTEND") this.sg.setTag("0"); else this.sg.setTag("9");
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"unposting_m","no_unpost",this.app._lokasi+"-UNPS"+this.e_periode.getText().substr(2,4)+".","000"));
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("insert into unposting_m(no_unpost,kode_lokasi,periode,tanggal,modul,keterangan,nik_buat,nik_app,no_del,tgl_input,nik_user) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.c_modul.getText()+"','"+this.e_ket.getText()+"','"+this.cb_buat.getText()+"','"+this.cb_app.getText()+"','-',getdate(),'"+this.app._userLog+"')");
					if (this.c_proses.getText() == "FRONTEND"){
						var line;
						for (var i=0;i < this.dataJU.rs.rows.length;i++){
							line = this.dataJU.rs.rows[i];
							if (line.status.toUpperCase() == "UNPOSTING"){
								sql.add("call sp_unpost_modul ('"+line.jenis.toUpperCase()+"','"+this.app._lokasi+"','"+line.no_bukti+"','"+this.e_nb.getText()+"')");
							}
						}
					}
					if (this.c_proses.getText() == "BACKEND") {
						sql.add("call sp_unpost_modul_backend ('"+this.c_modul.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.e_nb.getText()+"')");
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
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				if (this.c_proses.getText() == "FRONTEND") {
					var isAda = false;
					for (var i=0;i < this.dataJU.rs.rows.length;i++){
						if (this.dataJU.rs.rows[i].status == "UNPOSTING") isAda = true;
					}
					if (!isAda){
						system.alert(this,"Transaksi tidak valid.","Tidak ada transaksi dengan status UNPOSTING.");
						return false;
					}
				}
				if (parseFloat(this.app._periode) != parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode unposting harus sama dengan periode aktif sistem.["+this.app._periode+"]");
					return false;
				}
				else this.simpan();
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
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
		else this.e_periode.setText(this.app._periode);
		this.e_nb.setText("");
	},
	doClick:function(sender){
		if (sender == this.i_gen) {
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"unposting_m","no_unpost",this.app._lokasi+"-UNPS"+this.e_periode.getText().substr(2,4)+".","000"));
			this.e_ket.setFocus();
		}
		if (sender == this.i_postAll) {
			for (var i=0;i < this.dataJU.rs.rows.length;i++){
				this.dataJU.rs.rows[i].status = "UNPOSTING";
			}
			this.doTampilData(this.page);
		}
	},
	doChange:function(sender){
		if (sender == this.e_periode) {
			this.dataJU.rs.rows = [];
			this.sg.clear(1); this.sg2.clear(1);
		}
		if (sender == this.c_modul) {
			if (this.c_modul.getText() != "") {
				var strSQL = "";
				switch(this.c_modul.getText()){
					case "JU" :
								strSQL = "select 'INPROG' as status,no_ju as no_bukti,no_dokumen,convert(varchar,tanggal,103) as tanggal,keterangan,'JU' as jenis "+
										 "from ju_m "+
										 "where posted='T' and periode='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";
								this.cb_bukti.setSQL("select no_ju as no_bukti,no_dokumen,convert(varchar,tanggal,103) as tanggal,keterangan,'JU' as jenis from ju_m where posted='T' and periode='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["no_bukti","no_dokumen","tanggal","keterangan","jenis"],false,["No Bukti","No Dokumen","Tanggal","Keterangan","Jenis"],"and","Data Bukti JU",true);
						break;
					case "KB" :
								strSQL = "select 'INPROG' as status,no_kas as no_bukti,no_dokumen,convert(varchar,tanggal,103) as tanggal,keterangan,'KB' as jenis "+
										 "from kas_m "+
										 "where posted='T' and periode='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";
								this.cb_bukti.setSQL("select no_kas as no_bukti,no_dokumen,convert(varchar,tanggal,103) as tanggal,keterangan,'KB' as jenis from kas_m where posted='T' and periode='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["no_bukti","no_dokumen","tanggal","keterangan","jenis"],false,["No Bukti","No Dokumen","Tanggal","Keterangan","Jenis"],"and","Data Bukti KB",true);
						break;																						
					case "AR" :
								strSQL = "select 'INPROG' as status,no_piutang as no_bukti,no_dokumen,convert(varchar,tanggal,103) as tanggal,keterangan,'PIUUM' as jenis "+
										 "from csm_piutang_m "+
										 "where posted='T' and periode='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ";
								this.cb_bukti.setSQL("select no_piutang as no_bukti,no_dokumen,convert(varchar,tanggal,103) as tanggal,keterangan,'PIUUM' as jenis from csm_piutang_m where posted='T' and periode='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ",												     
								                    ["no_bukti","no_dokumen","tanggal","keterangan","jenis"],false,["No Bukti","No Dokumen","Tanggal","Keterangan","Jenis"],"and","Data Bukti Piutang",true);
						break;						
					case "AP" :
								strSQL = "select 'INPROG' as status,no_hutang as no_bukti,no_dokumen,convert(varchar,tanggal,103) as tanggal,keterangan,'HUTUM' as jenis "+
										 "from csm_hutang_m "+
										 "where posted='T' and periode='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ";										 
								this.cb_bukti.setSQL("select no_hutang as no_bukti,no_dokumen,convert(varchar,tanggal,103) as tanggal,keterangan,'HUTKES' as jenis from csm_hutang_m where posted='T' and periode='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ",									                 
													 ["no_bukti","no_dokumen","tanggal","keterangan","jenis"],false,["No Bukti","No Dokumen","Tanggal","Keterangan","Jenis"],"and","Data Bukti Hutang",true);
						break;																	
					case "PTG" :
								strSQL = "select 'INPROG' as status,no_ptg as no_bukti,no_dokumen,convert(varchar,tanggal,103) as tanggal,keterangan,'PJPTG' as jenis "+
										 "from ptg_m "+
										 "where posted='T' and periode='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ";
								this.cb_bukti.setSQL("select no_ptg as no_bukti,no_dokumen,convert(varchar,tanggal,103) as tanggal,keterangan,'PJPTG' as jenis from ptg_m where posted='T' and periode='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ",
													 ["no_bukti","no_dokumen","tanggal","keterangan","jenis"],false,["No Bukti","No Dokumen","Tanggal","Keterangan","Jenis"],"and","Data Bukti PJPTG",true);
						break;												
					case "FA" :
								strSQL = "select 'INPROG' as status,no_fasusut as no_bukti,no_dokumen,convert(varchar,tanggal,103) as tanggal,keterangan,'FASST' as jenis "+
										 "from fasusut_m "+
										 "where posted='T' and periode='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' "+
										 "union "+
										 "select 'INPROG' as status,no_woapp as no_bukti,no_dokumen,convert(varchar,tanggal,103) as tanggal,keterangan,'FAWO' as jenis "+
										 "from fawoapp_m "+
										 "where posted='T' and periode='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";
								this.cb_bukti.setSQL("select no_fasusut as no_bukti,no_dokumen,convert(varchar,tanggal,103) as tanggal,keterangan,'FASST' as jenis from fasusut_m where posted='T' and periode='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' "+
									                 "union "+
													 "select no_woapp as no_bukti,no_dokumen,convert(varchar,tanggal,103) as tanggal,keterangan,'FAWO' as jenis from fawoapp_m where posted='T' and periode='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",
													 ["no_bukti","no_dokumen","tanggal","keterangan","jenis"],false,["No Bukti","No Dokumen","Tanggal","Keterangan","Jenis"],"and","Data Bukti FA SUSUT",true);
						break;																	
				}
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU = data;
					this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
					this.sgn.rearrange();
					this.doTampilData(1);
				} else this.sg.clear(1);
			}
		}
		if (sender == this.cb_bukti) {
			if (this.cb_bukti.getText()!="") {
				this.dataJU.rs.rows = [];
				this.dataJU.rs.rows[0] = {status:"INPROG",no_bukti:this.cb_bukti.dataFromList[0],no_dokumen:this.cb_bukti.dataFromList[1],tanggal:this.cb_bukti.dataFromList[2],keterangan:this.cb_bukti.dataFromList[3],jenis:this.cb_bukti.dataFromList[4]}; 
				this.sgn.setTotalPage(1);
				this.sgn.rearrange();
				this.doTampilData(1);
			}
		}
	},
	doTampilData: function(page) {
		if (this.c_proses.getText() == "FRONTEND") {
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
		}
		else {this.sg.clear(1); this.sg2.clear(1);}
	},
	doChangeCells: function(sender, col , row) {
		if (col == 0) {
			this.dataJU.rs.rows[((this.page-1)*20) + row].status = this.sg.cells(0,row);
		}
	},
	doDoubleClick: function(sender, col , row) {
		if (this.sg.cells(1,row) != "") {
			var strSQL = "";
			switch(this.sg.cells(5,row)){
				case "JU" :
							strSQL = "select a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp,a.kode_drk,isnull(d.nama,'-') as nama_drk,'-' as kode_cf,'-' as nama_cf "+
									 "from ju_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
									 "            inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
									 "            left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun='"+this.e_periode.getText().substr(0,4)+"' "+
									 "where a.no_ju = '"+this.sg.cells(1,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'";
					break;
				case "KB" :
							strSQL = "select a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp,a.kode_drk,isnull(d.nama,'-') as nama_drk,isnull(a.kode_cf,'-') as kode_cf,isnull(e.nama,'-') as nama_cf "+
									 "from kas_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
									 "             inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
									 "             left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun='"+this.e_periode.getText().substr(0,4)+"' "+
									 "             left join neracacf e on a.kode_cf=e.kode_cf and a.kode_lokasi=e.kode_lokasi "+
									 "where a.no_kas = '"+this.sg.cells(1,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'";
					break;				
				case "PIUUM" :
							strSQL = "select a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp,a.kode_drk,isnull(d.nama,'-') as nama_drk,'-' as kode_cf,'-' as nama_cf "+
									 "from csm_piutang_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
									 "                  inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
									 "                  left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun='"+this.e_periode.getText().substr(0,4)+"' "+
									 "where a.no_piutang = '"+this.sg.cells(1,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'";
					break;														
				case "HUTUM" :
							strSQL = "select a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp,a.kode_drk,isnull(d.nama,'-') as nama_drk,'-' as kode_cf,'-' as nama_cf "+
									 "from csm_hutang_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
									 "                    inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
									 "                    left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun='"+this.e_periode.getText().substr(0,4)+"' "+
									 "where a.no_hutang = '"+this.sg.cells(1,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'";
					break;				
				case "PJPTG" :
							strSQL = "select a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp,a.kode_drk,isnull(d.nama,'-') as nama_drk,'-' as kode_cf,'-' as nama_cf "+
									 "from ptg_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
									 "             inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
									 "             left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun='"+this.e_periode.getText().substr(0,4)+"' "+
									 "where a.no_ptg = '"+this.sg.cells(1,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'";
					break;						
				case "FASST" :
							strSQL = "select a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp,a.kode_drk,isnull(d.nama,'-') as nama_drk,'-' as kode_cf,'-' as nama_cf "+
									 "from fasusut_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
									 "                 inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
									 "                 left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun='"+this.e_periode.getText().substr(0,4)+"' "+
									 "where a.no_fasusut = '"+this.sg.cells(1,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'";
					break;															
				case "FAWO" :
							strSQL = "select a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp,a.kode_drk,isnull(d.nama,'-') as nama_drk,'-' as kode_cf,'-' as nama_cf "+
									 "from fawoapp_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
									 "                 inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
									 "                 left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun='"+this.e_periode.getText().substr(0,4)+"' "+
									 "where a.no_woapp = '"+this.sg.cells(1,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'";
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
			this.pc1.setActivePage(this.pc1.childPage[1]);
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
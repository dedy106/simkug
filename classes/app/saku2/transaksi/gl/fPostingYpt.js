window.app_saku2_transaksi_gl_fPostingYpt = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_gl_fPostingYpt.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_gl_fPostingYpt";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Posting Transaksi", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No Posting",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_ket = new saiLabelEdit(this,{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});		
		this.cb_buat = new saiCBBL(this,{bound:[20,16,200,20],caption:"NIK Pembuat", multiSelection:false, maxLength:10, tag:2 });
		this.cb_app = new saiCBBL(this,{bound:[20,17,200,20],caption:"NIK Approve", multiSelection:false, maxLength:10, tag:2});
		this.c_proses = new saiCB(this,{bound:[20,21,200,20],caption:"Jenis Proses",items:["FRONTEND","BACKEND"], readOnly:true,tag:2});		
		this.c_modul = new saiCB(this,{bound:[20,22,200,20],caption:"Modul",items:["JU","KB","PTG","FA","AR","AP","TAK","GAJI","PR","TR"], readOnly:true,tag:2,change:[this,"doChange"]});		
		this.i_postAll = new portalui_imageButton(this,{bound:[225,22,20,20],hint:"Posting All",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.cb_bukti = new saiCBBL(this,{bound:[700,22,220,20],caption:"Cari Bukti",readOnly:true,multiSelection:false,rightLabelVisible:false,tag:9,change:[this,"doChange"]});
		
		this.pc1 = new pageControl(this,{bound:[20,12,900,337], childPage:["Data Transaksi Modul","Detail Transaksi","Err Msg"]});
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,10,this.pc1.width-5,this.pc1.height-40],colCount:6,tag:0,
		            colTitle:["Status","No Bukti","No Dokumen","Tanggal","Keterangan","Jenis"],
					colWidth:[[5,4,3,2,1,0],[50,300,70,200,150,80]],
					columnReadOnly:[true,[0,1,2,3,4,5],[]],
					buttonStyle:[[0],[bsAuto]], 
					picklist:[[0],[new portalui_arrayMap({items:["POSTING","INPROG"]})]],
					change:[this,"doChangeCells"],dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});		
		this.sg2 = new saiGrid(this.pc1.childPage[1],{bound:[1,10,this.pc1.width-5,this.pc1.height-40],colCount:11,tag:9,
		            colTitle:["Kode Akun","Nama Akun","DC","Keterangan","Nilai","Kode PP","Nama PP","Kode DRK","Nama DRK","Kode CF","Nama CF"],
					colWidth:[[10,9,8,7,6,5,4,3,2,1,0],[150,80,150,80,150,80,100,200,50,150,80]],
					colFormat:[[4],[cfNilai]],readOnly: true,autoAppend:false,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg2});	
		
		this.e_memo = new saiMemo(this.pc1.childPage[2],{bound:[1,24,590,330],labelWidth:0,tag:9,readOnly:true});

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
			
			this.cb_buat.setSQL("select nik, nama from karyawan where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Pembuat",true);
			this.cb_app.setSQL("select nik, nama from karyawan where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Approval",true);
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
window.app_saku2_transaksi_gl_fPostingYpt.extend(window.childForm);
window.app_saku2_transaksi_gl_fPostingYpt.implement({
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
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"posting_m","no_post",this.app._lokasi+"-POST"+this.e_periode.getText().substr(2,4)+".","000"));
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{													
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("insert into posting_m(no_post,kode_lokasi,periode,tanggal,modul,keterangan,nik_buat,nik_app,no_del,tgl_input,nik_user,nilai) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.c_modul.getText()+"','"+this.e_ket.getText()+"','"+this.cb_buat.getText()+"','"+this.cb_app.getText()+"','-',getdate(),'"+this.app._userLog+"',0)");
					if (this.c_proses.getText() == "FRONTEND"){
						var line;
						for (var i=0;i < this.dataJU.rs.rows.length;i++){
							line = this.dataJU.rs.rows[i];
							if (line.status.toUpperCase() == "POSTING"){
								sql.add("insert into posting_d(no_post,modul,no_bukti,status,catatan,no_del,kode_lokasi,periode) values "+
										"	('"+this.e_nb.getText()+"','"+line.jenis.toUpperCase()+"','"+line.no_bukti+"','"+line.status.toUpperCase()+"','-','-','"+this.app._lokasi+"','"+this.e_periode.getText()+"')");
								sql.add("call sp_post_modul ('"+line.jenis.toUpperCase()+"','"+this.app._lokasi+"','"+line.no_bukti+"')");
							}
						}
					}
					if (this.c_proses.getText() == "BACKEND") {
						sql.add("call sp_post_modul_backend ('"+this.c_modul.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.e_nb.getText()+"')");
					}
					
					if (this.app._lokasi=="11")
					{
						//sql.add("call sp_exs_proses ('"+this.app._lokasi+"','"+this.e_periode.getText()+"','FS4')");
					}
					else
					{
						sql.add("call sp_exs_proses_ypt ('"+this.app._lokasi+"','"+this.e_periode.getText()+"','FS1')");
						//sql.add("exec sp_exs_agg_real_bulan '"+this.app._lokasi+"','"+this.e_periode.getText().substr(0,4)+"','"+this.app._userLog+"'");
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
					var msg  = "";
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
						 "select a.no_ptg as no_bukti,a.periode,sum(case a.dc when 'D' then a.nilai else -a.nilai end) as total  "+
						 "from ptg_j a inner join ptg_m b on a.no_ptg=b.no_ptg and a.kode_lokasi=b.kode_lokasi and b.posted='F' "+
						 "where a.no_ptg in ("+this.nobukti+") and a.kode_lokasi='"+this.app._lokasi+"' group by a.no_ptg,a.periode "+						 
						 "union "+
						 "select a.no_bill as no_bukti,a.periode,sum(case a.dc when 'D' then a.nilai else -a.nilai end) as total  "+
						 "from aka_bill_j a inner join aka_bill_m b on a.no_bill=b.no_bill and a.kode_lokasi=b.kode_lokasi and b.posted='F' "+
						 "where a.no_bill in ("+this.nobukti+") and a.kode_lokasi='"+this.app._lokasi+"' group by a.no_bill,a.periode "+						 
						 "union "+
						 "select a.no_amor as no_bukti,a.periode,sum(case a.dc when 'D' then a.nilai else -a.nilai end) as total  "+
						 "from aka_amor_j a inner join aka_amor_m b on a.no_amor=b.no_amor and a.kode_lokasi=b.kode_lokasi and b.posted='F' "+
						 "where a.no_amor in ("+this.nobukti+") and a.kode_lokasi='"+this.app._lokasi+"' group by a.no_amor,a.periode "+						 
						 "union "+
						 "select a.no_rekon as no_bukti,a.periode,sum(case a.dc when 'D' then a.nilai else -a.nilai end) as total  "+
						 "from aka_rekon_j a inner join aka_rekon_m b on a.no_rekon=b.no_rekon and a.kode_lokasi=b.kode_lokasi and b.posted='F' "+
						 "where a.no_rekon in ("+this.nobukti+") and a.kode_lokasi='"+this.app._lokasi+"' group by a.no_rekon,a.periode "+						 
						 "union "+
						 "select a.no_batal as no_bukti,a.periode,sum(case a.dc when 'D' then a.nilai else -a.nilai end) as total  "+
						 "from aka_batal_j a inner join aka_batal_m b on a.no_batal=b.no_batal and a.kode_lokasi=b.kode_lokasi and b.posted='F' "+
						 "where a.no_batal in ("+this.nobukti+") and a.kode_lokasi='"+this.app._lokasi+"' group by a.no_batal,a.periode "+						 
						 "union "+
						 "select a.no_sisih as no_bukti,a.periode,sum(case a.dc when 'D' then a.nilai else -a.nilai end) as total  "+
						 "from aka_sisih_j a inner join aka_sisih_m b on a.no_sisih=b.no_sisih and a.kode_lokasi=b.kode_lokasi and b.posted='F' "+
						 "where a.no_sisih in ("+this.nobukti+") and a.kode_lokasi='"+this.app._lokasi+"' group by a.no_sisih,a.periode "+						 
						 "union "+
						 "select a.no_piutang as no_bukti,a.periode,sum(case a.dc when 'D' then a.nilai else -a.nilai end) as total  "+
						 "from csm_piutang_j a inner join csm_piutang_m b on a.no_piutang=b.no_piutang and a.kode_lokasi=b.kode_lokasi and b.posted='F' "+
						 "where a.no_piutang in ("+this.nobukti+") and a.kode_lokasi='"+this.app._lokasi+"' group by a.no_piutang,a.periode "+						 
						 "union "+
						 "select a.no_ba as no_bukti,a.periode,sum(case a.dc when 'D' then a.nilai else -a.nilai end) as total  "+
						 "from log_ba_j a inner join log_ba_m b on a.no_ba=b.no_ba and a.kode_lokasi=b.kode_lokasi and b.posted='F' "+
						 "where a.no_ba in ("+this.nobukti+") and a.kode_lokasi='"+this.app._lokasi+"' group by a.no_ba,a.periode "+						 
						 "union "+
						 "select a.no_gaji as no_bukti,a.periode,sum(case a.dc when 'D' then a.nilai else -a.nilai end) as total  "+
						 "from hr_gaji_j a inner join hr_gaji_m b on a.no_gaji=b.no_gaji and a.kode_lokasi=b.kode_lokasi and b.posted='F' "+
						 "where a.no_gaji in ("+this.nobukti+") and a.kode_lokasi='"+this.app._lokasi+"' group by a.no_gaji,a.periode "+						 
						 "union "+
						 "select a.no_bmhd as no_bukti,b.periode,sum(case a.dc when 'D' then a.nilai else -a.nilai end) as total  "+
						 "from pr_bmhd_j a inner join pr_bmhd_m b on a.no_bmhd=b.no_bmhd and a.kode_lokasi=b.kode_lokasi and b.posted='F' "+
						 "where a.no_bmhd in ("+this.nobukti+") and a.kode_lokasi='"+this.app._lokasi+"' group by a.no_bmhd,b.periode "+						 
						 "union "+
						 "select a.no_piutang as no_bukti,a.periode,sum(case a.dc when 'D' then a.nilai else -a.nilai end) as total  "+
						 "from pr_piutang_j a inner join pr_piutang_m b on a.no_piutang=b.no_piutang and a.kode_lokasi=b.kode_lokasi and b.posted='F' "+
						 "where a.no_piutang in ("+this.nobukti+") and a.kode_lokasi='"+this.app._lokasi+"' group by a.no_piutang,a.periode "+						 
						 "union "+
						 "select a.no_pdd as no_bukti,a.periode,sum(case a.dc when 'D' then a.nilai else -a.nilai end) as total  "+
						 "from pr_pdd_j a inner join pr_pdd_m b on a.no_pdd=b.no_pdd and a.kode_lokasi=b.kode_lokasi and b.posted='F' "+
						 "where a.no_pdd in ("+this.nobukti+") and a.kode_lokasi='"+this.app._lokasi+"' group by a.no_pdd,a.periode "+						 
						 "union "+
						 "select a.no_bukti as no_bukti,a.periode,sum(case a.dc when 'D' then a.nilai else -a.nilai end) as total  "+
						 "from tu_prpiutang_j a inner join tu_prpiutang_m b on a.no_bukti=b.no_bukti and a.kode_lokasi=b.kode_lokasi and b.posted='F' "+
						 "where a.no_bukti in ("+this.nobukti+") and a.kode_lokasi='"+this.app._lokasi+"' group by a.no_bukti,a.periode "+						 
						 "union "+
						 "select a.no_bukti as no_bukti,a.periode,sum(case a.dc when 'D' then a.nilai else -a.nilai end) as total  "+
						 "from tu_prpyt_j a inner join tu_prpyt_m b on a.no_bukti=b.no_bukti and a.kode_lokasi=b.kode_lokasi and b.posted='F' "+
						 "where a.no_bukti in ("+this.nobukti+") and a.kode_lokasi='"+this.app._lokasi+"' group by a.no_bukti,a.periode "+
						 "union "+
						 "select a.no_bukti as no_bukti,a.periode,sum(case a.dc when 'D' then a.nilai else -a.nilai end) as total  "+
						 "from tu_prbeban_j a inner join tu_prbeban_m b on a.no_bukti=b.no_bukti and a.kode_lokasi=b.kode_lokasi and b.posted='F' "+
						 "where a.no_bukti in ("+this.nobukti+") and a.kode_lokasi='"+this.app._lokasi+"' group by a.no_bukti,a.periode "+
						 "union "+
						 "select a.no_rekon as no_bukti,a.periode,sum(case a.dc when 'D' then a.nilai else -a.nilai end) as total  "+
						 "from sis_rekon_j a inner join sis_rekon_m b on a.no_rekon=b.no_rekon and a.kode_lokasi=b.kode_lokasi and b.posted='F' "+
						 "where a.no_rekon in ("+this.nobukti+") and a.kode_lokasi='"+this.app._lokasi+"' group by a.no_rekon,a.periode "+
						 "union "+
						 "select a.no_bill as no_bukti,a.periode,sum(case a.dc when 'D' then a.nilai else -a.nilai end) as total  "+
						 "from sis_bill_j a inner join sis_bill_m b on a.no_bill=b.no_bill and a.kode_lokasi=b.kode_lokasi and b.posted='F' "+
						 "where a.no_bill in ("+this.nobukti+") and a.kode_lokasi='"+this.app._lokasi+"' group by a.no_bill,a.periode "+
						 "union "+
						 "select a.no_bmhd as no_bukti,a.periode,sum(case a.dc when 'D' then a.nilai else -a.nilai end) as total  "+
						 "from bmhd_j a inner join bmhd_m b on a.no_bmhd=b.no_bmhd and a.kode_lokasi=b.kode_lokasi and b.posted='F' "+
						 "where a.no_bmhd in ("+this.nobukti+") and a.kode_lokasi='"+this.app._lokasi+"' group by a.no_bmhd,a.periode "+
						 "union "+
						 "select a.no_bukti as no_bukti,a.periode,sum(case a.dc when 'D' then a.nilai else -a.nilai end) as total  "+
						 "from trans_j a inner join trans_m b on a.no_bukti=b.no_bukti and a.kode_lokasi=b.kode_lokasi and b.posted='F' "+
						 "where a.no_bukti in ("+this.nobukti+") and a.kode_lokasi='"+this.app._lokasi+"' group by a.no_bukti,a.periode "+



						 "union "+
						 "select a.no_fasusut as no_bukti,a.periode,sum(case a.dc when 'D' then a.nilai else -a.nilai end) as total "+
						 "from fasusut_j a inner join fasusut_m b on a.no_fasusut=b.no_fasusut and a.kode_lokasi=b.kode_lokasi and b.posted='F' "+
						 "where a.no_fasusut in ("+this.nobukti+") and a.kode_lokasi='"+this.app._lokasi+"' group by a.no_fasusut,a.periode "+
						 "union "+
						 "select a.no_woapp as no_bukti,a.periode,sum(case a.dc when 'D' then a.nilai else -a.nilai end) as total "+
						 "from fawoapp_j a inner join fawoapp_m b on a.no_woapp=b.no_woapp and a.kode_lokasi=b.kode_lokasi and b.posted='F' "+
						 "where a.no_woapp in ("+this.nobukti+") and a.kode_lokasi='"+this.app._lokasi+"' group by a.no_woapp,a.periode "+
						 
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
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"posting_m","no_post",this.app._lokasi+"-POST"+this.e_periode.getText().substr(2,4)+".","000"));
			this.e_ket.setFocus();
		}
		if (sender == this.i_postAll) {
			for (var i=0;i < this.dataJU.rs.rows.length;i++){
				this.dataJU.rs.rows[i].status = "POSTING";
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
										 "where posted='F' and periode='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";
								this.cb_bukti.setSQL("select no_ju as no_bukti,no_dokumen,convert(varchar,tanggal,103) as tanggal,keterangan,'JU' as jenis from ju_m where posted='F' and periode='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["no_bukti","no_dokumen","tanggal","keterangan","jenis"],false,["No Bukti","No Dokumen","Tanggal","Keterangan","Jenis"],"and","Data Bukti JU",true);
						break;
					case "KB" :
								strSQL = "select 'INPROG' as status,no_kas as no_bukti,no_dokumen,convert(varchar,tanggal,103) as tanggal,keterangan,'KB' as jenis "+
										 "from kas_m "+
										 "where posted='F' and periode='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";
								this.cb_bukti.setSQL("select no_kas as no_bukti,no_dokumen,convert(varchar,tanggal,103) as tanggal,keterangan,'KB' as jenis from kas_m where posted='F' and periode='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["no_bukti","no_dokumen","tanggal","keterangan","jenis"],false,["No Bukti","No Dokumen","Tanggal","Keterangan","jenis"],"and","Data Bukti KB",true);
						break;
					case "PTG" :
								strSQL = "select 'INPROG' as status,no_ptg as no_bukti,no_dokumen,convert(varchar,tanggal,103) as tanggal,keterangan,'PJPTG' as jenis "+
										 "from ptg_m "+
										 "where posted='F' and periode='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ";                    
								this.cb_bukti.setSQL("select no_ptg as no_bukti,no_dokumen,convert(varchar,tanggal,103) as tanggal,keterangan,'PJPTG' as jenis from ptg_m where posted='F' and periode='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ",
													 ["no_bukti","no_dokumen","tanggal","keterangan","jenis"],false,["No Bukti","No Dokumen","Tanggal","Keterangan","Jenis"],"and","Data Bukti",true);
						break;						
					case "FA" :
								strSQL = "select 'INPROG' as status,no_fasusut as no_bukti,no_dokumen,convert(varchar,tanggal,103) as tanggal,keterangan,'FASST' as jenis "+
										 "from fasusut_m "+
										 "where posted='F' and periode='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'" +
										 "union "+
										 "select 'INPROG' as status,no_woapp as no_bukti,no_dokumen,convert(varchar,tanggal,103) as tanggal,keterangan,'FAWO' as jenis "+
										 "from fawoapp_m "+
										 "where posted='F' and periode='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' "+
										 "union "+
										 "select 'INPROG' as status,no_ba as no_bukti,no_dokumen,convert(varchar,tanggal,103) as tanggal,keterangan,'LOGBA' as jenis "+
										 "from log_ba_m "+
										 "where posted='F' and periode='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ";										 
								this.cb_bukti.setSQL("select no_fasusut as no_bukti,no_dokumen,convert(varchar,tanggal,103) as tanggal,keterangan,'FASST' as jenis from fasusut_m where posted='F' and periode='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' "+
													 "union "+
													 "select no_woapp as no_bukti,no_dokumen,convert(varchar,tanggal,103) as tanggal,keterangan,'FAWO' as jenis from fawoapp_m where posted='F' and periode='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' "+
													 "union "+
													 "select no_ba as no_bukti,no_dokumen,convert(varchar,tanggal,103) as tanggal,keterangan,'LOGBA' as jenis from log_ba_m where posted='F' and periode='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ",
													 ["no_bukti","no_dokumen","tanggal","keterangan","jenis"],false,["No Bukti","No Dokumen","Tanggal","Keterangan","Jenis"],"and","Data Bukti FA",true);
						break;
					case "AR" :
								strSQL = "select 'INPROG' as status,no_bill as no_bukti,no_dokumen,convert(varchar,tanggal,103) as tanggal,keterangan,'AKBIL' as jenis "+
										 "from aka_bill_m "+
										 "where posted='F' and periode='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' "+
										 "union "+
										 "select 'INPROG' as status,no_amor as no_bukti,no_dokumen,convert(varchar,tanggal,103) as tanggal,keterangan,'AMOR' as jenis "+
										 "from aka_amor_m "+
										 "where posted='F' and periode='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' "+
										 "union "+
										 "select 'INPROG' as status,no_rekon as no_bukti,no_dokumen,convert(varchar,tanggal,103) as tanggal,keterangan,'REKON' as jenis "+
										 "from aka_rekon_m "+
										 "where posted='F' and periode='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' "+
										 "union "+
										 "select 'INPROG' as status,no_batal as no_bukti,no_dokumen,convert(varchar,tanggal,103) as tanggal,keterangan,'BATAL' as jenis "+
										 "from aka_batal_m "+
										 "where posted='F' and periode='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' "+
										 "union "+
										 "select 'INPROG' as status,no_sisih as no_bukti,no_dokumen,convert(varchar,tanggal,103) as tanggal,keterangan,'SISIH' as jenis "+
										 "from aka_sisih_m "+
										 "where posted='F' and periode='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' "+										 																				 
										 "union "+
										 "select 'INPROG' as status,no_piutang as no_bukti,no_dokumen,convert(varchar,tanggal,103) as tanggal,keterangan,'PIUUM' as jenis "+
										 "from csm_piutang_m "+
										 "where posted='F' and periode='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' "+
										 "union "+
										 "select 'INPROG' as status,no_piutang as no_bukti,no_dokumen,convert(varchar,tanggal,103) as tanggal,keterangan,'PIU' as jenis "+
										 "from piutang_m "+
										 "where posted='F' and periode='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' "+
										 "union "+
										 "select 'INPROG' as status,no_piutang as no_bukti,no_dokumen,convert(varchar,tanggal,103) as tanggal,keterangan,'PIUPR' as jenis "+
										 "from pr_piutang_m "+
										 "where posted='F' and periode='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' "+
										 "union "+
										 "select 'INPROG' as status,no_pdd as no_bukti,no_dokumen,convert(varchar,tanggal,103) as tanggal,keterangan,'PDDPR' as jenis "+
										 "from pr_pdd_m "+
										 "where posted='F' and periode='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ";    
								
								this.cb_bukti.setSQL("select no_bill as no_bukti,no_dokumen,convert(varchar,tanggal,103) as tanggal,keterangan,'AKBIL' as jenis from aka_bill_m where posted='F' and periode='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' "+
													"union "+
													"select no_amor as no_bukti,no_dokumen,convert(varchar,tanggal,103) as tanggal,keterangan,'AMOR' as jenis from aka_amor_m where posted='F' and periode='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' "+
													"union "+
													"select no_rekon as no_bukti,no_dokumen,convert(varchar,tanggal,103) as tanggal,keterangan,'REKON' as jenis from aka_rekon_m where posted='F' and periode='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' "+
													"union "+
													"select no_batal as no_bukti,no_dokumen,convert(varchar,tanggal,103) as tanggal,keterangan,'BATAL' as jenis from aka_batal_m where posted='F' and periode='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' "+
													"union "+
													"select no_sisih as no_bukti,no_dokumen,convert(varchar,tanggal,103) as tanggal,keterangan,'SISIH' as jenis from aka_sisih_m where posted='F' and periode='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' "+
													"union "+													
													"select no_piutang as no_bukti,no_dokumen,convert(varchar,tanggal,103) as tanggal,keterangan,'PIUUM' as jenis from csm_piutang_m where posted='F' and periode='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' "+
													"union "+													
													"select no_piutang as no_bukti,no_dokumen,convert(varchar,tanggal,103) as tanggal,keterangan,'PIU' as jenis from piutang_m where posted='F' and periode='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' "+
													"union "+													
													"select no_piutang as no_bukti,no_dokumen,convert(varchar,tanggal,103) as tanggal,keterangan,'PIUPR' as jenis from pr_piutang_m where posted='F' and periode='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' "+
													"union "+													
													"select no_pdd as no_bukti,no_dokumen,convert(varchar,tanggal,103) as tanggal,keterangan,'PDDPR' as jenis from pr_piutang_m where posted='F' and periode='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ",
													["no_bukti","no_dokumen","tanggal","keterangan","jenis"],false,["No Bukti","No Dokumen","Tanggal","Keterangan","Jenis"],"and","Data Bukti Piutang",true);
						break;					
					case "TAK" :
								strSQL = "select 'INPROG' as status,no_kirim as no_bukti,no_dokumen,convert(varchar,tanggal,103) as tanggal,keterangan,'TAKKIRIM' as jenis "+
										 "from takkirim_m "+
										 "where posted='F' and periode='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'" +
										 "union "+
										 "select 'INPROG' as status,no_terima as no_bukti,no_dokumen,convert(varchar,tanggal,103) as tanggal,keterangan,'TAKTERIMA' as jenis "+
										 "from takterima_m "+
										 "where posted='F' and periode='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";
								this.cb_bukti.setSQL("select no_kirim as no_bukti,no_dokumen,convert(varchar,tanggal,103) as tanggal,keterangan,'TAKKIRIM' as jenis from takkirim_m where posted='F' and periode='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' "+
													 "union "+
													 "select no_terima as no_bukti,no_dokumen,convert(varchar,tanggal,103) as tanggal,keterangan,'TAKTERIMA' as jenis from takterima_m where posted='F' and periode='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ",
													 ["no_bukti","no_dokumen","tanggal","keterangan","jenis"],false,["No Bukti","No Dokumen","Tanggal","Keterangan","Jenis"],"and","Data Bukti TAK",true);
						break;												
					case "GAJI" :
								strSQL = "select 'INPROG' as status,no_gaji as no_bukti,no_dokumen,convert(varchar,tanggal,103) as tanggal,keterangan,'GAJI' as jenis "+
										 "from hr_gaji_m "+
										 "where posted='F' and periode='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'" +
										 " ";
								this.cb_bukti.setSQL("select no_gaji as no_bukti,no_dokumen,convert(varchar,tanggal,103) as tanggal,keterangan,'GAJI' as jenis from hr_gaji_m where posted='F' and periode='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' "+
													 " ",
													 ["no_bukti","no_dokumen","tanggal","keterangan","jenis"],false,["No Bukti","No Dokumen","Tanggal","Keterangan","Jenis"],"and","Data Bukti",true);
						break;						
					case "AP" :
								strSQL = "select 'INPROG' as status,no_bmhd as no_bukti,no_proyek as no_dokumen,convert(varchar,tanggal,103) as tanggal,keterangan,'BMHD' as jenis "+
										 "from pr_bmhd_m "+
										 "where posted='F' and periode='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' "+
										 
										 "union "+                    
													
										 "select 'INPROG' as status,no_hutang as no_bukti,no_dokumen,convert(varchar,tanggal,103) as tanggal,keterangan,'HUTANG' as jenis "+
										 "from hutang_m "+
										 "where posted='F' and periode='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' "+

										 "union "+                    
										 
										 "select 'INPROG' as status,no_bmhd as no_bukti,no_dokumen,convert(varchar,tanggal,103) as tanggal,keterangan,'HUMHD' as jenis "+
										 "from bmhd_m "+
										 "where posted='F' and periode='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ";
										
								
								this.cb_bukti.setSQL("select no_bmhd as no_bukti,no_proyek as no_dokumen,convert(varchar,tanggal,103) as tanggal,keterangan,'BMHD' as jenis from pr_bmhd_m where posted='F' and periode='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' "+
													 "union  "+
													 "select no_hutang as no_bukti,no_dokumen,convert(varchar,tanggal,103) as tanggal,keterangan,'HUTANG' as jenis from hutang_m where posted='F' and periode='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' "+
													 "union  "+
													 "select no_bmhd as no_bukti,no_dokumen,convert(varchar,tanggal,103) as tanggal,keterangan,'HUMHD' as jenis from bmhd_m where posted='F' and periode='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ",
													 ["no_bukti","no_dokumen","tanggal","keterangan","jenis"],false,["No Bukti","No Dokumen","Tanggal","Keterangan","Jenis"],"and","Data Bukti",true);
						break;
					
					case "PR" :
								strSQL = "select 'INPROG' as status,no_bukti,no_dokumen,convert(varchar,tanggal,103) as tanggal,keterangan,'PRPIU' as jenis "+
										 "from tu_prpiutang_m "+
										 "where posted='F' and periode='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' "+
										 
										 "union "+                    
													
										 "select 'INPROG' as status,no_bukti,no_dokumen,convert(varchar,tanggal,103) as tanggal,keterangan,'PRPYT' as jenis "+
										 "from tu_prpyt_m "+
										 "where posted='F' and periode='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' "+
										 
										 "union "+                    
													
										 "select 'INPROG' as status,no_bukti,no_dokumen,convert(varchar,tanggal,103) as tanggal,keterangan,'PRBBN' as jenis "+
										 "from tu_prbeban_m "+
										 "where posted='F' and periode='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' "
								
								this.cb_bukti.setSQL("select no_bukti,no_dokumen,convert(varchar,tanggal,103) as tanggal,keterangan,'PRPIU' as jenis from tu_prpiutang_m where posted='F' and periode='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' "+
													 "union  "+
													 "select no_bukti,no_dokumen,convert(varchar,tanggal,103) as tanggal,keterangan,'PRPYT' as jenis from tu_prpyt_m where posted='F' and periode='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' "+
													 "union  "+
													 "select no_bukti,no_dokumen,convert(varchar,tanggal,103) as tanggal,keterangan,'PRBBN' as jenis from tu_prbeban_m where posted='F' and periode='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ",
													 ["no_bukti","no_dokumen","tanggal","keterangan","jenis"],false,["No Bukti","No Dokumen","Tanggal","Keterangan","Jenis"],"and","Data Bukti",true);
						break;
						
					case "TR" :
								strSQL = "select 'INPROG' as status,no_bukti,no_dokumen,convert(varchar,tanggal,103) as tanggal,keterangan,'TR' as jenis "+
										 "from trans_m "+
										 "where posted='F' and periode='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";
								this.cb_bukti.setSQL("select no_bukti,no_dokumen,convert(varchar,tanggal,103) as tanggal,keterangan,'TR' as jenis from trans_m where posted='F' and periode='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["no_bukti","no_dokumen","tanggal","keterangan","jenis"],false,["No Bukti","No Dokumen","Tanggal","Keterangan","Jenis"],"and","Data Bukti",true);
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
				this.dataJU.rs.rows[0] = {status:"INPROG",no_bukti:this.cb_bukti.dataFromList[0],no_dokumen:this.cb_bukti.dataFromList[1],tanggal:this.cb_bukti.dataFromList[2],keterangan:this.cb_bukti.dataFromList[3],jenis:this.cb_bukti.dataFromList[4].toUpperCase()}; 
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
		if (this.sg.cells(1,row) != "" && this.sg.cells(5,row) != "") {
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
				case "LOGBA" :
							strSQL = "select a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp,a.kode_drk,isnull(d.nama,'-') as nama_drk,'-' as kode_cf,'-' as nama_cf "+
									 "from log_ba_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
									 "                inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
									 "                left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun='"+this.e_periode.getText().substr(0,4)+"' "+
									 "where a.no_ba = '"+this.sg.cells(1,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'";
					break;					
				case "AKBIL" :
							strSQL = "select a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp,a.kode_drk,isnull(d.nama,'-') as nama_drk,'-' as kode_cf,'-' as nama_cf "+
									 "from aka_bill_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
									 "                  inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
									 "                  left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun='"+this.e_periode.getText().substr(0,4)+"' "+
									 "where a.no_bill = '"+this.sg.cells(1,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'";
					break;										
				case "AMOR" :
							strSQL = "select a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp,a.kode_drk,isnull(d.nama,'-') as nama_drk,'-' as kode_cf,'-' as nama_cf "+
									 "from aka_amor_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
									 "                  inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
									 "                  left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun='"+this.e_periode.getText().substr(0,4)+"' "+
									 "where a.no_amor = '"+this.sg.cells(1,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'";
					break;										
				case "REKON" :
							strSQL = "select a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp,a.kode_drk,isnull(d.nama,'-') as nama_drk,'-' as kode_cf,'-' as nama_cf "+
									 "from aka_rekon_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
									 "                  inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
									 "                  left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun='"+this.e_periode.getText().substr(0,4)+"' "+
									 "where a.no_rekon = '"+this.sg.cells(1,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'";
					break;															
				case "BATAL" :
							strSQL = "select a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp,a.kode_drk,isnull(d.nama,'-') as nama_drk,'-' as kode_cf,'-' as nama_cf "+
									 "from aka_batal_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
									 "                  inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
									 "                  left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun='"+this.e_periode.getText().substr(0,4)+"' "+
									 "where a.no_batal = '"+this.sg.cells(1,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'";
					break;															
				case "SISIH" :
							strSQL = "select a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp,a.kode_drk,isnull(d.nama,'-') as nama_drk,'-' as kode_cf,'-' as nama_cf "+
									 "from aka_sisih_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
									 "                   inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
									 "                   left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun='"+this.e_periode.getText().substr(0,4)+"' "+
									 "where a.no_sisih = '"+this.sg.cells(1,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'";
					break;
				case "PIUUM" :
							strSQL = "select a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp,a.kode_drk,isnull(d.nama,'-') as nama_drk,'-' as kode_cf,'-' as nama_cf "+
									 "from csm_piutang_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
									 "                  inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
									 "                  left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun='"+this.e_periode.getText().substr(0,4)+"' "+
									 "where a.no_piutang = '"+this.sg.cells(1,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'";
					break;		
				case "PIU" :
							strSQL = "select a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp,a.kode_drk,isnull(d.nama,'-') as nama_drk,'-' as kode_cf,'-' as nama_cf "+
									 "from piutang_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
									 "                  inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
									 "                  left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun='"+this.e_periode.getText().substr(0,4)+"' "+
									 "where a.no_piutang = '"+this.sg.cells(1,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'";
					break;		
				case "TAKKIRIM" :
							strSQL = "select a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp,a.kode_drk,isnull(d.nama,'-') as nama_drk,'-' as kode_cf,'-' as nama_cf "+
									 "from takkirim_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
									 "                  inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
									 "                  left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun='"+this.e_periode.getText().substr(0,4)+"' "+
									 "where a.no_kirim = '"+this.sg.cells(1,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'";
					break;																
				case "TAKTERIMA" :
							strSQL = "select a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp,a.kode_drk,isnull(d.nama,'-') as nama_drk,'-' as kode_cf,'-' as nama_cf "+
									 "from takterima_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
									 "                   inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
									 "                   left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun='"+this.e_periode.getText().substr(0,4)+"' "+
									 "where a.no_terima = '"+this.sg.cells(1,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'";
					break;																
				case "GAJI" :
							strSQL = "select a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp,a.kode_drk,isnull(d.nama,'-') as nama_drk,'-' as kode_cf,'-' as nama_cf "+
									 "from hr_gaji_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
									 "                 inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
									 "                 left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun='"+this.e_periode.getText().substr(0,4)+"' "+
									 "where a.no_gaji = '"+this.sg.cells(1,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'";
					break;																
				case "BMHD" :
							strSQL = "select a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp,a.kode_drk,isnull(d.nama,'-') as nama_drk,'-' as kode_cf,'-' as nama_cf "+
									 "from pr_bmhd_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
									 "                 inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
									 "                 left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun='"+this.e_periode.getText().substr(0,4)+"' "+
									 "where a.no_bmhd = '"+this.sg.cells(1,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'";
					break;
				case "PIUPR" :
							strSQL = "select a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp,a.kode_drk,isnull(d.nama,'-') as nama_drk,'-' as kode_cf,'-' as nama_cf "+
									 "from pr_piutang_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
									 "                  inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
									 "                  left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun='"+this.e_periode.getText().substr(0,4)+"' "+
									 "where a.no_piutang = '"+this.sg.cells(1,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'";
					break;
				case "PDDPR" :
							strSQL = "select a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp,a.kode_drk,isnull(d.nama,'-') as nama_drk,'-' as kode_cf,'-' as nama_cf "+
									 "from pr_pdd_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
									 "                inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
									 "                left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun='"+this.e_periode.getText().substr(0,4)+"' "+
									 "where a.no_pdd = '"+this.sg.cells(1,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'";
					break;
				case "HUTANG" :
							strSQL = "select a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp,a.kode_drk,isnull(d.nama,'-') as nama_drk,'-' as kode_cf,'-' as nama_cf "+
									 "from hutang_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
									 "                 inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
									 "                 left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun='"+this.e_periode.getText().substr(0,4)+"' "+
									 "where a.no_hutang = '"+this.sg.cells(1,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'";
					break;
					
				case "HUMHD" :
							strSQL = "select a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp,a.kode_drk,isnull(d.nama,'-') as nama_drk,'-' as kode_cf,'-' as nama_cf "+
									"from bmhd_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
									"                 inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
									"                 left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun='"+this.e_periode.getText().substr(0,4)+"' "+
									"where a.no_bmhd = '"+this.sg.cells(1,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'";
					break;
					
				
				
				
				case "PRPIU" :
							strSQL = "select a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp,a.kode_drk,isnull(d.nama,'-') as nama_drk,'-' as kode_cf,'-' as nama_cf "+
									 "from tu_prpiutang_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
									 "                  inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
									 "                  left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun='"+this.e_periode.getText().substr(0,4)+"' "+
									 "where a.no_bukti = '"+this.sg.cells(1,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'";
					break;
				case "PRPYT" :
							strSQL = "select a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp,a.kode_drk,isnull(d.nama,'-') as nama_drk,'-' as kode_cf,'-' as nama_cf "+
									 "from tu_prpyt_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
									 "                  inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
									 "                  left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun='"+this.e_periode.getText().substr(0,4)+"' "+
									 "where a.no_bukti = '"+this.sg.cells(1,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'";
					break;
				case "PRBBN" :
							strSQL = "select a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp,a.kode_drk,isnull(d.nama,'-') as nama_drk,'-' as kode_cf,'-' as nama_cf "+
									 "from tu_prbeban_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
									 "                  inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
									 "                  left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun='"+this.e_periode.getText().substr(0,4)+"' "+
									 "where a.no_bukti = '"+this.sg.cells(1,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'";
					break;

				
				case "TR" :
							strSQL = "select a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp,a.kode_drk,isnull(d.nama,'-') as nama_drk,'-' as kode_cf,'-' as nama_cf "+
									 "from trans_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
									 "            inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
									 "            left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun='"+this.e_periode.getText().substr(0,4)+"' "+
									 "where a.no_bukti = '"+this.sg.cells(1,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'";
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
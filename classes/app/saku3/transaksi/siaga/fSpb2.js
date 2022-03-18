window.app_saku3_transaksi_siaga_fSpb2 = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_siaga_fSpb2.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_siaga_fSpb2";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form SPB", 0);	
		
		uses("saiCB;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,440], childPage:["Data SPB","List SPB"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:4,tag:9,
		            colTitle:["No SPB","Tanggal","Nama","Deskripsi"],
					colWidth:[[3,2,1,0],[400,200,80,100]],
					readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});				
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,16,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,16,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});								
		this.cb_bdh = new saiCBBL(this.pc2.childPage[0],{bound:[20,11,220,20],caption:"NIK Mgr Kug", multiSelection:false, maxLength:10, tag:2});							
		this.cb_ver = new saiCBBL(this.pc2.childPage[0],{bound:[20,12,220,20],caption:"NIK VP Kug", multiSelection:false, maxLength:10, tag:2});							
		this.cb_dir = new saiCBBL(this.pc2.childPage[0],{bound:[20,14,220,20],caption:"NIK Dir Kug", multiSelection:false, maxLength:10, tag:2});							
		//this.cb_fiat = new saiCBBL(this.pc2.childPage[0],{bound:[20,13,220,20],caption:"Fiatur", multiSelection:false, maxLength:10, tag:2});							
		this.c_curr = new saiCB(this.pc2.childPage[0],{bound:[20,20,200,20],caption:"Mata Uang",readOnly:true,tag:2,change:[this,"doChange"]});	
		this.e_total = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,20,200,20],caption:"Total SPB", tag:1, tipeText:ttNilai, text:"0",readOnly:true});			
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[5,30,970,293], childPage:["Peruntukan","Data Pengajuan"]});

		this.e_nopo = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,11,450,20],caption:"No PO", maxLength:50,tag:1});
		this.l_tglpo = new portalui_label(this.pc1.childPage[0],{bound:[20,12,100,18],caption:"Tanggal PO", underline:true});
		this.dp_dpo = new portalui_datePicker(this.pc1.childPage[0],{bound:[120,12,100,18]}); 	
		this.e_nodok = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,11,450,20],caption:"No Dokumen", maxLength:50,tag:1});	
		this.l_tgldok = new portalui_label(this.pc1.childPage[0],{bound:[20,12,100,18],caption:"Tanggal Dokumen", underline:true});
		this.dp_ddok = new portalui_datePicker(this.pc1.childPage[0],{bound:[120,12,100,18]}); 	
		this.e_pajak = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,14,450,20],caption:"Cattn. Pajak", maxLength:250,tag:1});	
		this.e_jtran = new saiLabelEdit(this.pc1.childPage[0],{bound:[490,14,450,20],caption:"Jenis Transaksi", maxLength:150,tag:1});										
		this.e_bdh = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,15,450,20],caption:"Cattn. Perbendhn", maxLength:250,tag:1});
		this.e_bank = new saiLabelEdit(this.pc1.childPage[0],{bound:[490,15,450,20],caption:"Bank", maxLength:150,tag:1});								

		this.e_nama = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,11,450,20],caption:"Kepada", maxLength:50,tag:1});								
		this.e_norek = new saiLabelEdit(this.pc1.childPage[0],{bound:[490,11,450,20],caption:"No Rekening ", maxLength:150,tag:1});								
		this.e_alamat = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,12,450,20],caption:"Alamat", maxLength:150,tag:1});								
		this.e_alrek = new saiLabelEdit(this.pc1.childPage[0],{bound:[490,12,450,20],caption:"Alamat Rekening", maxLength:150,tag:1});								
		this.e_ket = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,13,450,20],caption:"Untuk Pembayaran", maxLength:150,tag:1});					
		this.sg1 = new saiGrid(this.pc1.childPage[1],{bound:[0,5,this.pc1.width-5,this.pc1.height-35],colCount:12,tag:0,
				colTitle:["No Pengajuan","Uraian","Tanggal","Modul","PP / Unit","Nilai KasBank","Catatan Verifikasi","Tgl Input","User","No Bukti","Tgl Ver","Curr"],
				colWidth:[[11,10,9,8,7,6,5,4,3,2,1,0],[70,70,90,150,60,200,100,150,60,70,200,100]],
				columnReadOnly:[true,[1,2,3,4,5,6,7,8,9,10,11],[0]],
				colFormat:[[5],[cfNilai]],					
				buttonStyle:[[0],[bsEllips]], 
				ellipsClick:[this,"doEllipsClick1"],change:[this,"doChangeCell1"],dblClick:[this,"doDoubleClick1"],nilaiChange:[this,"doNilaiChange1"],
				defaultRow:1,autoAppend:true});
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg1});

		
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);
		
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();			
			this.stsSimpan=1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			
			this.cb_bdh.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);
			this.cb_ver.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);
			this.cb_dir.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);

			/*
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('ITBDH','ITVER','ITFIAT') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																	
					if (line.kode_spro == "ITBDH") this.cb_bdh.setText(line.flag);
					if (line.kode_spro == "ITVER") this.cb_ver.setText(line.flag);
					if (line.kode_spro == "ITFIAT") this.cb_fiat.setText(line.flag);
				}
			}	
			*/	
			
			this.c_curr.items.clear();
			var data = this.dbLib.getDataProvider("select kode_curr from curr",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.c_curr.addItem(i,line.kode_curr);
				}
			}
			this.c_curr.setText("");	
			this.c_curr.setText("IDR");	
			this.no_pesan="";
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_siaga_fSpb2.extend(window.childForm);
window.app_saku3_transaksi_siaga_fSpb2.implement({
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
						sql.add("delete from gr_spb2_m where no_spb='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("update gr_beban_m set progress='0',no_spb='-' where no_spb='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						
						sql.add("update gr_pb_m set progress='2',no_spb='-' where no_spb='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						
						sql.add("delete from apv_flow where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					} 
					
					sql.add("insert into gr_spb2_m (no_spb,kode_lokasi,nik_user,tgl_input,periode,tanggal,nama,alamat,keterangan,nik_bdh,nik_ver,nik_fiat,nilai,no_kas,kode_curr,  cat_pajak,jtran,bank,norek,alrek,no_po,tgl_po,no_dok,tgl_dok,cat_bdh,progress,nik_dir,sts_spb2) values  "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.app._userLog+"',getdate(),'"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_nama.getText()+"','"+this.e_alamat.getText()+"','"+this.e_ket.getText()+"','"+this.cb_bdh.getText()+"','"+this.cb_ver.getText()+"','-',"+nilaiToFloat(this.e_total.getText())+",'-','"+this.c_curr.getText()+"','"+this.e_pajak.getText()+"','"+this.e_jtran.getText()+"','"+this.e_bank.getText()+"','"+this.e_norek.getText()+"','"+this.e_alrek.getText()+"','"
							+this.e_nopo.getText()+"','"+this.dp_dpo.getDateString()+"','"+this.e_nodok.getText()+"','"+this.dp_ddok.getDateString()+"','"+this.e_bdh.getText()+"',0,'"+this.cb_dir.getText()+"','SPBv2')");					
					
					for (var i=0;i < this.sg1.getRowCount();i++){
						if (this.sg1.rowValid(i)){
							sql.add("update gr_beban_m set progress='1',no_spb='"+this.e_nb.getText()+"' where no_beban='"+this.sg1.cells(0,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
							sql.add("update gr_pb_m set progress='3',no_spb='"+this.e_nb.getText()+"' where no_pb='"+this.sg1.cells(9,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
						}
					}																										
                    /*sql.add("insert into apv_flow (no_bukti,kode_lokasi,kode_role,kode_jab,no_urut,status,sts_ver,nik) "+
                    "select '"+this.e_nb.getText()+"', '"+this.app._lokasi+"',a.kode_role,b.kode_jab,b.no_urut,0,0,c.nik "+
                    "from apv_role a "+
                    "inner join apv_role_jab b on a.kode_role=b.kode_role and a.kode_lokasi=b.kode_lokasi "+
                    "inner join apv_karyawan c on b.kode_jab=c.kode_jab and b.kode_lokasi=c.kode_lokasi  "+
                    "where a.kode_lokasi='"+this.app._lokasi+"' and b.kode_role='R02' "+
                    "order by b.no_urut ");

                    sql.add("update apv_flow set status = 1 where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and no_urut=(select min(no_urut) as no_urut from apv_flow where kode_lokasi='"+this.app._lokasi+"' and no_bukti='"+this.e_nb.getText()+"') "); 
					*/      

					sql.add("insert into apv_flow (no_bukti,kode_lokasi,kode_role,kode_jab,no_urut,status,tgl_app,sts_ver,nik) "+
					"select a.no_spb as no_bukti,a.kode_lokasi,'-' as kode_role,b.kode_jab,1 as no_urut,1 as status,NULL as tgl_app,0 as sts_ver,a.nik_bdh as nik "+
					"from gr_spb2_m a "+
					"inner join karyawan b on a.nik_bdh=b.nik and a.kode_lokasi=b.kode_lokasi "+
					"where a.no_spb='"+this.e_nb.getText()+"' "+
					"union all "+
					"select a.no_spb as no_bukti,a.kode_lokasi,'-' as kode_role,b.kode_jab,2 as no_urut,0 as status,NULL as tgl_app,0 as sts_ver,a.nik_ver as nik "+
					"from gr_spb2_m a "+
					"inner join karyawan b on a.nik_ver=b.nik and a.kode_lokasi=b.kode_lokasi "+
					"where a.no_spb='"+this.e_nb.getText()+"' "+
					"union all "+
					"select a.no_spb as no_bukti,a.kode_lokasi,'-' as kode_role,b.kode_jab,3 as no_urut,0 as status,NULL as tgl_app,0 as sts_ver,a.nik_dir as nik "+
					"from gr_spb2_m a "+
					"inner join karyawan b on a.nik_dir=b.nik and a.kode_lokasi=b.kode_lokasi "+
					"where a.no_spb='"+this.e_nb.getText()+"'  ");

					this.no_pesan = this.standarLib.noBuktiOtomatis(this.dbLib,"app_notif_m","no_bukti","PSN"+this.e_periode.getText().substr(2,4)+".","000000");

					sql.add("insert into app_notif_m (no_bukti,kode_lokasi,judul,subjudul,pesan,nik,tgl_input,icon,ref1,ref2,ref3,sts_read,sts_kirim) "+
					"select '"+this.no_pesan+"' as no_bukti,a.kode_lokasi,'SPB','Pengajuan SPB','Pengajuan SPB dengan no transaksi '+a.no_bukti+' senilai '+convert(varchar,b.nilai)+', menunggu approval dari anda',a.nik,getdate(),'-',a.no_bukti,'Beban','-',0,0 "+
					"from apv_flow a "+
					"inner join gr_spb2_m b on a.no_bukti=b.no_spb and a.kode_lokasi=b.kode_lokasi "+
					"where a.status=1 and a.no_bukti='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'");

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
					this.sg1.clear(1); this.sg3.clear(1); 
					setTipeButton(tbAllFalse);		
					
					var sql = new server_util_arrayList();
					sql.add("select no_beban,keterangan "+
							"from gr_beban_m "+
							"where modul  in ('PBAJU2') and no_spb='-' and kode_curr='"+this.c_curr.getText()+"' and periode<='"+this.e_periode.getText()+"' and progress = '0' and kode_lokasi='"+this.app._lokasi+"'");			
							//"where modul not in ('PJPTG','PJPTGLOG') and no_spb='-' and kode_curr='"+this.c_curr.getText()+"' and periode<='"+this.e_periode.getText()+"' and progress = '0' and kode_lokasi='"+this.app._lokasi+"'");			
					this.dbLib.getMultiDataProviderA(sql);			
								
				break;
			case "simpan" :														
			case "ubah" :														
				this.preView = "1";
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				this.sg1.validasi();								
				for (var i=0;i < this.sg1.getRowCount();i++){
					if (this.sg1.rowValid(i)){
						for (var j=i;j < this.sg1.getRowCount();j++){
							if (this.sg1.cells(0,j) == this.sg1.cells(0,i) && (i != j)) {
								var k = i+1;
								system.alert(this,"Transaksi tidak valid.","Duplikasi No Pengajuan untuk baris ["+k+"]");
								return false;
							}
						}
					}
				}
				if (nilaiToFloat(this.e_total.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Total SPB tidak boleh nol atau kurang.");
					return false;						
				}
				else this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;	
			case "hapus" :	
				this.preView = "0";
				uses("server_util_arrayList");
				var sql = new server_util_arrayList();
				sql.add("delete from gr_spb2_m where no_spb='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("update gr_beban_m set progress='0',no_spb='-' where no_spb='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				
				sql.add("update gr_pb_m set progress='2',no_spb='-' where no_spb='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");

				sql.add("delete from apv_flow where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");

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
		
		if (this.stsSimpan == 1) {
			this.doClick();				
			var sql = new server_util_arrayList();
			sql.add("select no_beban,keterangan "+
					"from gr_beban_m "+
					"where modul  in ('PBAJU2') and no_spb='-' and kode_curr='"+this.c_curr.getText()+"' and periode<='"+this.e_periode.getText()+"' and progress = '0' and kode_lokasi='"+this.app._lokasi+"'");			
					//"where modul not in ('PJPTG','PJPTGLOG') and no_spb='-' and kode_curr='"+this.c_curr.getText()+"' and periode<='"+this.e_periode.getText()+"' and progress = '0' and kode_lokasi='"+this.app._lokasi+"'");			
			this.dbLib.getMultiDataProviderA(sql);			
		}
	},		
	doClick:function(sender){
		if (this.e_periode.getText()!= "") {
			if (this.stsSimpan == 0) {
				this.sg1.clear(1);	
			}
			this.stsSimpan = 1;			
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"gr_spb2_m","no_spb",this.app._lokasi+"-SPB"+this.e_periode.getText().substr(2,4)+".","0000"));						
			this.cb_bdh.setFocus();
			setTipeButton(tbSimpan);
		}		
	},	
	doChange:function(sender){		
		if (sender == this.c_curr) {
			this.sg1.clear(1);	
			var sql = new server_util_arrayList();
			sql.add("select no_beban,keterangan "+
					"from gr_beban_m "+
					"where modul in ('PBAJU2') and no_spb='-' and kode_curr='"+this.c_curr.getText()+"' and periode<='"+this.e_periode.getText()+"' and progress = '0' and kode_lokasi='"+this.app._lokasi+"'");			
					//"where modul not in ('PJPTG','PJPTGLOG') and no_spb='-' and kode_curr='"+this.c_curr.getText()+"' and periode<='"+this.e_periode.getText()+"' and progress = '0' and kode_lokasi='"+this.app._lokasi+"'");			
			this.dbLib.getMultiDataProviderA(sql);			
				
		}
		if (sender == this.e_kurs) {
			this.sg.validasi();
		}
	},	
	doNilaiChange1: function(){
		try{			
			var total = 0;			
			for (var i = 0; i < this.sg1.getRowCount();i++) {
				if (this.sg1.rowValid(i) && this.sg1.cells(5,i) != "") {
					total += nilaiToFloat(this.sg1.cells(5,i));
				}
			}			
			this.e_total.setText(floatToNilai(Math.round(total * 100)/100));			
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},
	doEllipsClick1: function(sender, col, row){
		try{			
			if (col == 0){				
				strSQL = "select no_beban,keterangan "+
						 "from gr_beban_m "+
						 "where modul in ('PBAJU2') and no_spb='-' and kode_curr='"+this.c_curr.getText()+"' and periode<='"+this.e_periode.getText()+"' and progress = '0' and kode_lokasi='"+this.app._lokasi+"'";
						 // "where modul not in ('AJU','PJPTG','PJPTGLOG') and no_spb='-' and kode_curr='"+this.c_curr.getText()+"' and periode<='"+this.e_periode.getText()+"' and progress = '0' and kode_lokasi='"+this.app._lokasi+"'";
				strROW = "select count(*) "+
						 "from gr_beban_m "+
						 "where modul in ('PBAJU2') and no_spb='-' and kode_curr='"+this.c_curr.getText()+"' and periode<='"+this.e_periode.getText()+"' and progress = '0' and kode_lokasi='"+this.app._lokasi+"'";
						 //"where modul not in ('AJU','PJPTG','PJPTGLOG') and no_spb='-' and kode_curr='"+this.c_curr.getText()+"' and periode<='"+this.e_periode.getText()+"' and progress = '0' and kode_lokasi='"+this.app._lokasi+"'";
				
				this.standarLib.showListData(this, "Daftar Pengajuan",sender,undefined,strSQL,strROW,
						["no_beban","keterangan"],"and",["No Pengajuan","Deskripsi"],false);				
			}				
		}catch(e){
			systemAPI.alert(e);
		}
	},	
	doChangeCell1: function(sender, col, row){						
		sender.onChange.set(undefined,undefined);
		if (col == 0) {
			if (this.sg1.cells(0,row) != "") {				
				var noagenda = this.dataAgenda.get(sender.cells(0,row));				
				if (noagenda) {
					sender.cells(1,row,noagenda);					
					var strSQL = "select a.no_beban,convert(varchar,a.tanggal,103) as tanggal,a.modul,b.kode_pp+' - '+b.nama as pp,a.keterangan,a.nilai_curr as nilai,e.catatan,convert(varchar,a.tgl_input,103) as tgl_input,a.nik_user,e.no_bukti as no_aju,convert(varchar,e.tgl_input,103) as tgl_ver,a.kode_curr "+
								 "from gr_beban_m a "+
								 "inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+					 					 
								 "inner join gr_app_m e on a.no_beban=e.no_app and a.kode_lokasi=e.kode_lokasi and e.no_flag='-' "+								
								 "where a.no_beban='"+sender.cells(0,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'";			
					var data = this.dbLib.getDataProvider(strSQL,true);
					if (typeof data == "object" && data.rs.rows[0] != undefined){
						var line = data.rs.rows[0];												
						sender.cells(2,row,line.tanggal);
						sender.cells(3,row,line.modul);
						sender.cells(4,row,line.pp);
						sender.cells(5,row,floatToNilai(line.nilai));
						sender.cells(6,row,line.catatan);
						sender.cells(7,row,line.tgl_input);
						sender.cells(8,row,line.nik_user);
						sender.cells(9,row,line.no_aju);
						sender.cells(10,row,line.tgl_ver);	
						sender.cells(11,row,line.kode_curr);						
						sender.appendData(["","","","","","","","","","","",""]);
					} 
				}
				else {
					if (trim(sender.cells(0,row)) != "") system.alert(this,"No Pengajuan "+sender.cells(0,row)+" tidak ditemukan","-","checkRek");                
					sender.cells(0,row,"");
					sender.cells(1,row,"");
					sender.cells(2,row,"");
					sender.cells(3,row,"");
					sender.cells(4,row,"");
					sender.cells(5,row,"");
					sender.cells(6,row,"");
					sender.cells(7,row,"");
					sender.cells(8,row,"");
					sender.cells(9,row,"");
					sender.cells(10,row,"");
					sender.cells(11,row,"");
				}				
			}
		}		
		sender.onChange.set(this,"doChangeCell1");		
	},	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							if (this.preView == "1") {								
								this.nama_report="server_report_saku3_siaga_rptSpbFormEmail";
								this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_spb='"+this.e_nb.getText()+"' ";
								this.filter2 = this.e_periode.getText()+"/" + this.app._userLog + "/" + this.app._userPwd + "//"+this.no_pesan;
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
							} 
							else {
								system.info(this,"Transaksi telah sukses tereksekusi (No Bukti : "+ this.e_nb.getText()+")","");							
								this.clearLayar();
							}
						}
						else {													
							if (result.toLowerCase().search("primary key") == -1){
								alert(error);
							}
							else this.simpan();						   						
						}
	    			break;					
					case "getMultiDataProvider":
						eval("result = "+result+";");
						if (typeof result != "string"){
							this.dataAgenda = new portalui_arrayMap();														
							if (result.result[0]){	    			        
								var line;
								for (var i in result.result[0].rs.rows){
									line = result.result[0].rs.rows[i];									
									this.dataAgenda.set(line.no_beban, line.keterangan);										
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
			this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
			this.sg1.clear(1); this.sg3.clear(1); 
			setTipeButton(tbAllFalse);					
			this.pc2.setActivePage(this.pc2.childPage[0]);			
			this.pc1.setActivePage(this.pc1.childPage[0]);			
			
			var sql = new server_util_arrayList();
			sql.add("select no_beban,keterangan "+
					"from gr_beban_m "+
					"where modul  in ('PBAJU2') and no_spb='-' and kode_curr='"+this.c_curr.getText()+"' and periode<='"+this.e_periode.getText()+"' and progress = '0' and kode_lokasi='"+this.app._lokasi+"'");			
					//"where modul not in ('PJPTG','PJPTGLOG') and no_spb='-' and kode_curr='"+this.c_curr.getText()+"' and periode<='"+this.e_periode.getText()+"' and progress = '0' and kode_lokasi='"+this.app._lokasi+"'");			
			this.dbLib.getMultiDataProviderA(sql);			
		} catch(e) {
			alert(e);
		}
	},		
	doLoad3:function(sender){																
		var strSQL = "select a.no_spb,convert(varchar,a.tanggal,103) as tgl,a.nama,a.keterangan "+
		             "from gr_spb2_m a "+
					 "where a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.no_kas ='-' and a.progress in ('R','0') ";
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
			this.sg3.appendData([line.no_spb,line.tgl,line.nama,line.keterangan]); 
		}
		this.sg3.setNoUrut(start);
		//this.page3 = 0;
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
		//this.page3 = page - 1;
	},
	doDoubleClick3: function(sender, col , row) {
		try{
			if (this.sg3.cells(0,row) != "") {
				this.pc2.setActivePage(this.pc2.childPage[0]);																		
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;				
				//var baris = (this.page3 * 20) + row; 
				var baris = row;
				this.e_nb.setText(this.sg3.cells(0,baris));								
								
				var strSQL = "select * from gr_spb2_m "+
							 "where no_spb = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){					
						this.e_nama.setText(line.nama);
						this.e_alamat.setText(line.alamat);
						this.e_ket.setText(line.keterangan);
						this.cb_bdh.setText(line.nik_bdh);				
						this.cb_ver.setText(line.nik_ver);				
						this.cb_dir.setText(line.nik_dir);
						this.c_curr.setText(line.kode_curr);	
						
						this.e_pajak.setText(line.cat_pajak);
						this.e_bdh.setText(line.cat_bdh);
						this.e_jtran.setText(line.jtran);
						this.e_bank.setText(line.bank);
						this.e_norek.setText(line.norek);
						this.e_alrek.setText(line.alrek);
						
						this.e_nopo.setText(line.no_po);
						this.dp_dpo.setText(line.tgl_po);
						this.e_nodok.setText(line.no_dok);
						this.dp_ddok.setText(line.tgl_dok);
						
						
		
					}
				}				
				var strSQL = "select a.no_beban,convert(varchar,a.tanggal,103) as tanggal,a.modul,b.kode_pp+' - '+b.nama as pp,a.keterangan,a.nilai_curr as nilai,e.catatan,convert(varchar,a.tgl_input,103) as tgl_input,a.nik_user,e.no_bukti as no_aju,convert(varchar,e.tgl_input,103) as tgl_ver,a.kode_curr "+
							 "from gr_beban_m a "+
							 "inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+					 					 
							 "inner join gr_app_m e on a.no_beban=e.no_app and a.kode_lokasi=e.kode_lokasi "+
							 "where a.no_spb='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";			
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg1.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];												
						this.sg1.appendData([line.no_beban,line.keterangan,line.tanggal,line.modul,line.pp,floatToNilai(line.nilai),line.catatan,line.tgl_input,line.nik_user,line.no_aju,line.tgl_ver,line.kode_curr]);
					}
				} else this.sg1.clear(1);											
			}						
		} catch(e) {alert(e);}
	}
});
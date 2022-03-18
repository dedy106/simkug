window.app_saku2_transaksi_aka_aka2_fTAKpdpt = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_aka_aka2_fTAKpdpt.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_aka_aka2_fTAKpdpt";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form TAK SDP2 dan UP3", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;pageControl;portalui_saiMemo");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,200,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,98,18],selectDate:[this,"doSelectDate"]}); 
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["Data TAK","List TAK"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-30],colCount:5,tag:9,
		            colTitle:["No Bukti","Tanggal","Deskripsi","Lok Tujuan","Nilai"],
					colWidth:[[4,3,2,1,0],[90,200,300,80,100]],
					colFormat:[[4],[cfNilai]],readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});				
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});				
		this.cb_lokasi = new saiCBBL(this.pc2.childPage[0],{bound:[20,19,220,20],caption:"Lokasi Tujuan", multiSelection:false, maxLength:10, tag:2 });
		this.cb_akun = new saiCBBL(this.pc2.childPage[0],{bound:[20,18,220,20],caption:"Akun TAK", multiSelection:false, maxLength:10, tag:2 });
		this.cb_buat = new saiCBBL(this.pc2.childPage[0],{bound:[20,16,220,20],caption:"NIK Pembuat", multiSelection:false, maxLength:10, tag:2 });
		this.cb_app = new saiCBBL(this.pc2.childPage[0],{bound:[20,18,220,20],caption:"NIK Approve", multiSelection:false, maxLength:10, tag:2});		
		this.e_nilai = new saiLabelEdit(this.pc2.childPage[0],{bound:[770,18,200,20],caption:"Nilai TAK", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});										
		this.bTampil = new button(this.pc2.childPage[0],{bound:[670,18,80,20],caption:"Data Bill", click:[this,"doLoad"]});
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[5,12,990,255], childPage:["Filter","Data Bill"]});
		this.c_jenis = new saiCB(this.pc1.childPage[0],{bound:[20,13,200,20],caption:"Jenis",items:["PERIOD","ALL"], readOnly:true,tag:2}); 		
		this.c_periode2 = new saiCB(this.pc1.childPage[0],{bound:[20,22,200,20],caption:"By Periode",readOnly:true,tag:2});		
		
		this.sg = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:10,tag:0,
		            colTitle:["NIM","Nama","No Invoice","Periode","Kode Produk","Nama Produk","Akun Pdpt","Nilai","Kode PP","Kode DRK"],
					colWidth:[[9,8,7,6,5,4,3,2,1,0],[100,100,100,70,100,80,80,150,150,80]],
					colFormat:[[7],[cfNilai]],
					columnReadOnly:[true,[0,1,2,3,4,5,6,7,8,9],[]],
					nilaiChange:[this,"doNilaiChange"],					
					autoAppend:false,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});	
		
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);	
		this.pc1.childPage[0].rearrangeChild(10, 23);	
		
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
			
			this.cb_lokasi.setSQL("select kode_lokasi, nama from lokasi where kode_lokasi not in ('"+this.app._lokasi+"','"+this.app._kodeLokasiKonsol+"')",["kode_lokasi","nama"],false,["Kode","Nama"],"and","Data Lokasi",true);		
			
			this.cb_akun.setSQL("select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag='016' "+
			                    "where a.kode_lokasi='"+this.app._lokasi+"'",["a.kode_akun","a.nama"],false,["Kode","Nama"],"and","Daftar Akun TAK",true);			
			this.cb_buat.setSQL("select nik, nama from karyawan where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Pembuat",true);
			this.cb_app.setSQL("select nik, nama from karyawan where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Approval",true);
			
			var data = this.dbLib.getDataProvider("select a.flag,b.nama from spro a inner join masakun b on a.flag=b.kode_akun and a.kode_lokasi=b.kode_lokasi where kode_spro='KBTTP' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_akun.setText(line.flag,line.nama);
			} else this.cb_akun.setText("","");									
			
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
			
			this.c_periode2.items.clear();
			var data = this.dbLib.getDataProvider("select distinct periode as periode from aka_bill_m where kode_lokasi='"+this.app._lokasi+"' order by periode desc",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.c_periode2.addItem(i,line.periode);
				}
			}					
			uses("server_report_report;portalui_reportViewer");
			this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
			this.viewer.hide();
			this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
			this.report = new server_report_report();
			this.report.addListener(this);
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_aka_aka2_fTAKpdpt.extend(window.childForm);
window.app_saku2_transaksi_aka_aka2_fTAKpdpt.implement({	
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
						sql.add("delete from takkirim_m where no_kirim = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from takkirim_j where no_kirim = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from aka_tak_d where no_tak = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from angg_r where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					}
					
					sql.add("insert into takkirim_m(no_kirim,kode_lokasi,periode,tanggal,no_dokumen,keterangan,kode_pp,modul,jenis,kode_curr,kurs,nilai,nik_buat,nik_setuju,posted,no_del,no_link,ref1,tgl_input,nik_user,kode_loktuj,progress,no_terima,due_date) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','-','"+this.e_ket.getText()+"','"+this.app._kodePP+"','TAKBILL','KIRIM','IDR',1,"+nilaiToFloat(this.e_nilai.getText())+",'"+this.cb_buat.getText()+"','"+this.cb_app.getText()+"','F','-','-','"+this.cb_akun.getText()+"',getdate(),'"+this.app._userLog+"','"+this.cb_lokasi.getText()+"','0','-','"+this.dp_d1.getDateString()+"')");
															

					sql.add("insert into takkirim_j(no_kirim,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
							"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',999,'"+this.cb_akun.getText()+"','"+this.e_ket.getText()+"','C',"+nilaiToFloat(this.e_nilai.getText())+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','TAKBILL','TAK','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");															
					
					this.doHitungAR();
					var line = undefined;
					for (var i in this.gridAR.objList){
						line = this.gridAR.get(i);
						sql.add("insert into takkirim_j(no_kirim,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
								"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',"+i+",'"+line.get("kode_akun")+"','"+this.e_ket.getText()+"','D',"+parseFloat(line.get("nilai"))+",'"+line.get("kode_pp")+"','"+line.get("kode_drk")+"','"+this.app._lokasi+"','TAKBILL','PDPT','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");
					}
					
					for (var i=0;i < this.dataJU.rs.rows.length;i++){
						line = this.dataJU.rs.rows[i];
						if (parseFloat(line.lunas) != 0){
							sql.add("insert into aka_tak_d(no_tak,nim,no_inv,periode,nilai,kode_lokasi,akun_tak,akun_pdpt,kode_produk,dc,modul,kode_drk) values "+
									"('"+this.e_nb.getText()+"','"+line.nim+"','"+line.no_inv+"','"+this.e_periode.getText()+"',"+line.nilai+",'"+this.app._lokasi+"','"+this.cb_akun.getText()+"','"+line.akun_pdpt+"','"+line.kode_produk+"','D','TAK','"+line.kode_drk+"')");							
						}
					}													
	
					sql.add("insert into angg_r(no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) "+
							"select no_kirim,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode,periode,dc,0,sum(nilai) "+
							"from takkirim_j where no_kirim='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' "+
							"group by no_kirim,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode,dc");
					
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
					this.sg.clear(1); this.sg3.clear(1); 
					setTipeButton(tbSimpan);
					this.pc1.setActivePage(this.pc1.childPage[0]);
				break;
			case "simpan" :	
			case "ubah" :
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				if (nilaiToFloat(this.e_nilai.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai TAK tidak boleh nol atau kurang.");
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
				this.preView = "0";
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}	
				else {	
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from takkirim_m where no_kirim = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from takkirim_j where no_kirim = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from aka_tak_d where no_tak = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from angg_r where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);
				}
				break;				
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
		else this.e_periode.setText(this.app._periode);
		if (this.stsSimpan == 1) this.doClick();		
	},
	doClick:function(sender){		
		if (this.e_periode.getText()!= "") {
			if (this.stsSimpan == 0) {					
				this.sg.clear(1); this.sg3.clear(1); 
			}
			this.stsSimpan = 1;
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"takkirim_m","no_kirim",this.app._lokasi+"-TK"+this.e_periode.getText().substr(2,4)+".","0000"));						
			this.e_ket.setFocus();
			setTipeButton(tbSimpan);			
		}
	},
	doLoad: function(sender){		
		this.pc1.setActivePage(this.pc1.childPage[1]);
		this.e_nilai.setText("0");
		if (this.c_jenis.getText() == "ALL") {
			var strSQL = "select aa.nim,aa.nama as mhs,a.no_inv,a.periode,a.kode_produk,c.nama,a.akun_pdpt,(a.nilai-isnull(b.tot_tak,0)) as nilai,a.kode_pp,a.kode_drk "+						 
						 "from  "+
						 
						 "      ("+						 
						 "		select '20'+substring(no_inv,7,4) as periode,kode_lokasi,no_inv,nim,kode_produk,akun_pdpt,kode_akt,kode_pp,kode_jalur,kode_drk,sum(case dc when 'D' then nilai else -nilai end) as nilai "+
						 "      from aka_bill_d "+
						 "		where kode_lokasi='"+this.app._lokasi+"' and kode_produk in ('UP3','SDP2') "+
						 "      group by kode_lokasi,no_inv,nim,kode_produk,akun_pdpt,kode_akt,kode_pp,kode_jalur,kode_drk "+
						 "      ) a "+
						 
						 "      inner join aka_mahasiswa aa on aa.nim=a.nim and aa.kode_lokasi=a.kode_lokasi "+
						 "      inner join aka_produk c on a.kode_produk=c.kode_produk and a.kode_lokasi=c.kode_lokasi and a.kode_akt=c.kode_akt and a.kode_pp=c.kode_pp and a.kode_jalur=c.kode_jalur "+
						 
						 "      left join (select no_inv,nim,kode_produk,kode_lokasi,sum(case dc when 'D' then nilai else -nilai end) as tot_tak "+
						 "                 from aka_tak_d where kode_lokasi = '"+this.app._lokasi+"' group by nim,no_inv,kode_produk,kode_lokasi) b on a.nim=b.nim and a.no_inv=b.no_inv and a.kode_produk=b.kode_produk and a.kode_lokasi=b.kode_lokasi "+						 
						 
						 "where (a.nilai-isnull(b.tot_tak,0)) > 0 and a.kode_lokasi = '"+this.app._lokasi+"' order by aa.nim,a.periode,c.no_urut";		
		}
		else {
			var strSQL = "select aa.nim,aa.nama as mhs,a.no_inv,a.periode,a.kode_produk,c.nama,a.akun_pdpt,(a.nilai-isnull(b.tot_tak,0)) as nilai,a.kode_pp,a.kode_drk "+						 
						 "from  "+
						 
						 "      ("+						 
						 "		select '20'+substring(no_inv,7,4) as periode,kode_lokasi,no_inv,nim,kode_produk,akun_pdpt,kode_akt,kode_pp,kode_jalur,kode_drk,sum(case dc when 'D' then nilai else -nilai end) as nilai "+
						 "      from aka_bill_d "+
						 "		where kode_lokasi='"+this.app._lokasi+"'  and kode_produk in ('UP3','SDP2') "+
						 "      group by kode_lokasi,no_inv,nim,kode_produk,akun_pdpt,kode_akt,kode_pp,kode_jalur,kode_drk "+
						 "      ) a "+
						 
						 "      inner join aka_mahasiswa aa on aa.nim=a.nim and aa.kode_lokasi=a.kode_lokasi "+
						 "      inner join aka_produk c on a.kode_produk=c.kode_produk and a.kode_lokasi=c.kode_lokasi and a.kode_akt=c.kode_akt and a.kode_pp=c.kode_pp and a.kode_jalur=c.kode_jalur "+
						 
						 "      left join (select no_inv,nim,kode_produk,kode_lokasi,sum(case dc when 'D' then nilai else -nilai end) as tot_tak "+
						 "                 from aka_tak_d where kode_lokasi = '"+this.app._lokasi+"' group by nim,no_inv,kode_produk,kode_lokasi) b on a.nim=b.nim and a.no_inv=b.no_inv and a.kode_produk=b.kode_produk and a.kode_lokasi=b.kode_lokasi "+						 
						 
						 "where a.periode = '"+this.c_periode2.getText()+"' and (a.nilai-isnull(b.tot_tak,0)) > 0 and a.kode_lokasi = '"+this.app._lokasi+"' order by aa.nim,a.periode,c.no_urut";					
		}
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			var line;
			var tot = 0;
			for (var i=0;i < this.dataJU.rs.rows.length;i++){
				line = this.dataJU.rs.rows[i];
				tot = tot + parseFloat(line.nilai);
			}		
			this.e_nilai.setText(floatToNilai(tot));
			this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn.rearrange();
			this.doTampilData(1);
		} else this.sg.clear(1);			
	},
	doTampilData: function(page) {
		var line;
		this.sg.clear();
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];							
			this.sg.appendData([line.nim,line.mhs,line.no_inv,line.periode,line.kode_produk,line.nama,line.akun_pdpt,floatToNilai(line.nilai),line.kode_pp,line.kode_drk]);
		}
		this.sg.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},	
	doHitungAR: function() {
		var row,dtJurnal = new portalui_arrayMap();
		var nemu = false;
		var ix,dtJrnl = 0;
		for (var i=0;i < this.dataJU.rs.rows.length;i++){
			line = this.dataJU.rs.rows[i];
			if (parseFloat(line.nilai) != 0){
				kdAkun = line.akun_pdpt;
				kdPP = line.kode_pp;
				kdDRK = line.kode_drk;
				nemu = false;
				ix = 0;
				for (var j in dtJurnal.objList){		
				  if ((kdAkun == dtJurnal.get(j).get("kode_akun")) && (kdPP == dtJurnal.get(j).get("kode_pp")) && (kdDRK == dtJurnal.get(j).get("kode_drk"))){
					nemu = true;
					row = dtJurnal.get(j);
					ix = j;
					break;
				  }
				}
				if (!nemu){
					row = new portalui_arrayMap();
					row.set("kode_akun",kdAkun);
					row.set("kode_pp",kdPP);
					row.set("kode_drk",kdDRK);
					row.set("nilai",parseFloat(line.nilai));
					dtJrnl++;
					dtJurnal.set(dtJrnl,row);						
				}
				else dtJurnal.get(ix).set("nilai",row.get("nilai") + parseFloat(line.nilai));
			}
		}
		this.gridAR = dtJurnal;
	}, 
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){				
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
						  this.nama_report="server_report_saku3_tm_rptTakKirim";
						  this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_kirim='"+this.e_nb.getText()+"' ";
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
			this.sg.clear(1); this.sg3.clear(1); 
			setTipeButton(tbSimpan);
			this.pc2.setActivePage(this.pc2.childPage[0]);
			this.pc1.setActivePage(this.pc1.childPage[0]);
		} catch(e) {
			alert(e);
		}
	},
	doLoad3:function(sender){																		
		var strSQL = "select a.no_kirim,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.kode_loktuj+' - '+b.nama as lokasi,a.nilai "+
		             "from takkirim_m a inner join lokasi b on a.kode_loktuj=b.kode_lokasi "+					 					 
					 "where a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.modul = 'TAKBILL' and a.posted ='F' and a.no_terima='-' and progress='0' ";		
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
			this.sg3.appendData([line.no_kirim,line.tgl,line.keterangan,line.lokasi,floatToNilai(line.nilai)]); 
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
												
				var strSQL = "select keterangan,tanggal,kode_loktuj,ref1,nik_buat,nik_setuju "+
							 "from takkirim_m "+							 
							 "where no_kirim = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){							
						this.dp_d1.setText(line.tanggal);						
						this.e_ket.setText(line.keterangan);						
						this.cb_lokasi.setText(line.kode_loktuj);												
						this.cb_akun.setText(line.ref1);									
						this.cb_buat.setText(line.nik_buat);
						this.cb_app.setText(line.nik_setuju);
					}
				}								
				
				var strSQL = "select aa.nim,aa.nama as mhs,a.no_inv,a.periode,a.kode_produk,c.nama,a.akun_pdpt,(a.nilai-isnull(b.tot_tak,0)) as nilai,a.kode_pp,a.kode_drk "+						 
							 "from  "+
							 
							 "      ("+						 
							 "		select '20'+substring(no_inv,7,4) as periode,kode_lokasi,no_inv,nim,kode_produk,akun_pdpt,kode_akt,kode_pp,kode_jalur,kode_drk,sum(case dc when 'D' then nilai else -nilai end) as nilai "+
							 "      from aka_bill_d "+
							 "		where kode_lokasi='"+this.app._lokasi+"'  and kode_produk in ('UP3','SDP2') "+
							 "      group by kode_lokasi,no_inv,nim,kode_produk,akun_pdpt,kode_akt,kode_pp,kode_jalur,kode_drk "+
							 "      ) a "+
							 
							 "      inner join aka_mahasiswa aa on aa.nim=a.nim and aa.kode_lokasi=a.kode_lokasi "+
							 "      inner join aka_produk c on a.kode_produk=c.kode_produk and a.kode_lokasi=c.kode_lokasi and a.kode_akt=c.kode_akt and a.kode_pp=c.kode_pp and a.kode_jalur=c.kode_jalur "+
							 
							 "      inner join (select no_tak,no_inv,nim,kode_produk,kode_lokasi,sum(case dc when 'D' then nilai else -nilai end) as tot_tak "+
							 "                  from aka_tak_d where no_tak = '"+this.e_nb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' "+
							 "				    group by no_tak,nim,no_inv,kode_produk,kode_lokasi) bb on a.nim=bb.nim and a.no_inv=bb.no_inv and a.kode_produk=bb.kode_produk and a.kode_lokasi=bb.kode_lokasi "+
							 
							 "      left join (select no_inv,nim,kode_produk,kode_lokasi,sum(case dc when 'D' then nilai else -nilai end) as tot_tak "+
							 "                 from aka_tak_d where no_tak <> '"+this.e_nb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' "+
							 "                 group by nim,no_inv,kode_produk,kode_lokasi) b on a.nim=b.nim and a.no_inv=b.no_inv and a.kode_produk=b.kode_produk and a.kode_lokasi=b.kode_lokasi "+						 
							 
							 "where bb.no_tak='"+this.e_nb.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' order by aa.nim,a.periode,c.no_urut";					

				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU = data;
					var line;
					var tot = 0;
					for (var i=0;i < this.dataJU.rs.rows.length;i++){
						line = this.dataJU.rs.rows[i];
						tot = tot + parseFloat(line.nilai);
					}		
					this.e_nilai.setText(floatToNilai(tot));
					this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
					this.sgn.rearrange();
					this.doTampilData(1);
				} else this.sg.clear(1);			
				
			}									
		} catch(e) {alert(e);}
	}
});
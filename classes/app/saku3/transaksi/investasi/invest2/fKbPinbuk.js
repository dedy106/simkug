window.app_saku3_transaksi_investasi_invest2_fKbPinbuk = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_investasi_invest2_fKbPinbuk.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_investasi_invest2_fKbPinbuk";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form KasBank Pemindahbukuan: Input", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,200,20],caption:"Periode",tag:2,readOnly:true,visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,98,18],selectDate:[this,"doSelectDate"]}); 
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["Data Jurnal","List Jurnal"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-30],colCount:4,tag:9,
		            colTitle:["No Bukti","Tanggal","Deskripsi","Nilai"],
					colWidth:[[3,2,1,0],[100,410,80,100]],colFormat:[[3],[cfNilai]],readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data Jurnal",click:[this,"doLoad3"]});		
		
		this.c_jenis = new saiCB(this.pc2.childPage[0],{bound:[20,12,200,20],caption:"Jenis",items:["BK"], readOnly:true,tag:2,visible:false});
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,200,20],caption:"No Bukti KB",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});		
		this.e_dok = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,17,450,20],caption:"No Dokumen", maxLength:50});								
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,13,450,20],caption:"Deskripsi", maxLength:150});								
		this.bTampil = new button(this.pc2.childPage[0],{bound:[890,13,100,18],caption:"Data Deposito",click:[this,"doLoad"]});			
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,12,995,325], childPage:["Pinbuk Deposito","Bank Sumber","Bank Tujuan"]});		
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:10,tag:9,
		            colTitle:["No SPB","Tanggal","Nomor","Bank Sumber","Bank Tujuan","Perihal","NIK Approve 1","NIk Approve 2","Nilai","Status"],
					colWidth:[[9,8,7,6,5,4,3,2,1,0],[80,100,120,120,200,200,200,120,70,100]],
					colFormat:[[8],[cfNilai]],					
					autoPaging:true, rowPerPage:20,
					readOnly:true,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});		
		
		this.bsumber = new saiCBBL(this.pc1.childPage[1],{bound:[20,11,220,20],caption:"Bank Sumber", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});						
		this.e_fax = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,200,20],caption:"No Faximile", maxLength:50});				
		this.e_nilai = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,15,200,20],caption:"Total Nilai", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});						
		this.cb_app1 = new saiCBBL(this.pc1.childPage[1],{bound:[20,17,220,20],caption:"NIK Approve 1", multiSelection:false, maxLength:10, tag:2});
		this.cb_app2 = new saiCBBL(this.pc1.childPage[1],{bound:[20,18,220,20],caption:"NIK Approve 2", multiSelection:false, maxLength:10, tag:2});		
		this.l_tgl2 = new portalui_label(this.pc1.childPage[1],{bound:[20,11,100,18],caption:"Tgl Kesepakatan", underline:true});
		this.dp_d2 = new portalui_datePicker(this.pc1.childPage[1],{bound:[120,11,98,18]}); 
		this.l_tgl3 = new portalui_label(this.pc1.childPage[1],{bound:[20,12,100,18],caption:"Tgl Pelaksanaan", underline:true});
		this.dp_d3 = new portalui_datePicker(this.pc1.childPage[1],{bound:[120,12,98,18]}); 		
		this.e_pyakes = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,300,20],caption:"PIC Pihak Yakes", maxLength:50});		
		this.e_pmitra = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,14,300,20],caption:"PIC Pihak Mitra", maxLength:50});				
		
		this.sg2 = new saiGrid(this.pc1.childPage[2],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:6,tag:0,
		            colTitle:["Kode Bank","Bank Cabang","Rekening","Akun Bank","Keterangan","Nilai"],
					colWidth:[[5,4,3,2,1,0],[80,200,60,250,230,80]],					
					columnReadOnly:[true,[1,2,3],[0,4,5]],
					buttonStyle:[[0],[bsEllips]], 
					colFormat:[[5],[cfNilai]],checkItem:true,
					ellipsClick:[this,"doEllipsClick2"],change:[this,"doChangeCell2"],nilaiChange:[this,"doNilaiChange2"],
					autoAppend:true,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg2});		
		
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);	
		this.pc1.childPage[1].rearrangeChild(10, 23);	
		
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
			this.bsumber.setSQL("select kode_bank, nama+' - '+no_rek as nama from inv_bank",["kode_bank","nama"],false,["Kode","Nama"],"where","Daftar Bank",true);
						
			var sql = new server_util_arrayList(); 
			sql.add("select kode_bank, nama from inv_bank");			
			this.dbLib.getMultiDataProviderA(sql);							
			
			this.c_jenis.setText("BK");
			
			this.cb_app1.setSQL("select nik, nama from karyawan where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);			
			this.cb_app2.setSQL("select nik, nama from karyawan where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);			
			
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_investasi_invest2_fKbPinbuk.extend(window.childForm);
window.app_saku3_transaksi_investasi_invest2_fKbPinbuk.implement({
	doLoad:function(sender){								
		var strSQL = "select a.no_spb,a.nomor2,convert(varchar,b.tanggal,103) as tgl,a.bsumber2+' - '+c.nama as asal,a.bsumber+' - '+d.nama as tujuan,a.hal2,a.ttd3+'-'+e.nama as ttd3,a.ttd4+'-'+f.nama as ttd4,b.nilai "+
		             "from inv_spb_surat a inner join inv_shop_m b on a.no_spb=b.no_spb and a.kode_lokasi=b.kode_lokasi "+
					 "     inner join inv_bank c on a.bsumber2=c.kode_bank "+
					 "     inner join inv_bank d on a.bsumber=d.kode_bank "+
					 "     inner join karyawan e on a.ttd3=e.nik "+
					 "     inner join karyawan f on a.ttd4=f.nik "+
		             "where a.progress = '1' and a.no_kas='-' and a.kode_lokasi ='"+this.app._lokasi+"' and b.periode<='"+this.e_periode.getText()+"' ";
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;
			this.sg.clear();
			for (var i in data.rs.rows){
				line = data.rs.rows[i];												
				this.sg.appendData([line.no_spb,line.tgl,line.nomor2,line.asal,line.tujuan,line.hal2,line.ttd3,line.ttd4,floatToNilai(line.nilai),"INPROG"]);
			}
		} else this.sg.clear(1);								
	},
	doDoubleClick: function(sender, col , row) {			
		try {
			var strSQL = "select a.bsumber2,b.nilai,a.ttd3,a.ttd4,b.tanggal from inv_spb_surat a inner join inv_shop_m b on a.no_spb=b.no_spb and a.kode_lokasi=b.kode_lokasi where a.no_spb= '" + this.sg.cells(0, row) + "' and a.kode_lokasi='" + this.app._lokasi + "'";
			var data = this.dbLib.getDataProvider(strSQL, true);
			if (typeof data == "object") {
				var line = data.rs.rows[0];
				if (line != undefined) {
					this.bsumber.setText(line.bsumber2);
					this.e_nilai.setText(floatToNilai(line.nilai));
					this.cb_app1.setText(line.ttd3);
					this.cb_app2.setText(line.ttd4);
					this.dp_d2.setText(line.tanggal);
					this.dp_d3.setText(line.tanggal);
					this.e_pyakes.setText("-");
					this.e_pmitra.setText("-");
				}
				for (var i = 0; i < this.sg.getRowCount(); i++) {
					if (this.sg.rowValid(i)) 
						this.sg.cells(9,row,"INPROG");
				}
				this.sg.cells(9,row,"APP")				
			}
			
			strSQL = "select a.kode_bank,a.nama,a.no_rek+' - '+a.nama_rek as rek, a.kode_akun "+
			         "from inv_bank a inner join inv_spb_surat b on a.kode_bank=b.bsumber where b.no_spb='"+this.sg.cells(0,row)+"'";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg2.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];												
					this.sg2.appendData([line.kode_bank,line.nama,line.rek,line.kode_akun,this.sg.cells(5,row),this.sg.cells(8,row)]);
				}
			} else this.sg2.clear(1);								
			this.pc1.setActivePage(this.pc1.childPage[1]);
		} 
		catch (e) {
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
	simpan: function(){			
		try{						
			if (this.stsSimpan == 1) this.doClick();
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					if (this.stsSimpan == 0) {
						sql.add("delete from kas_m where no_kas='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from kas_j where no_kas='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from inv_kas_add where no_kas='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from kas_pb_d where no_kas='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("update inv_spb_surat set progress='1',no_kas='-' where no_kas='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					}
					
					for (var i = 0; i < this.sg.getRowCount(); i++) {
						if (this.sg.rowValid(i) && this.sg.cells(9,i) == "APP") {
							sql.add("update inv_spb_surat set progress='2',no_kas='"+this.e_nb.getText()+"' where no_spb='"+this.sg.cells(0,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
						} 						
					}
					sql.add("insert into inv_kas_add (no_kas,kode_lokasi,kode_bank,kode_akun,p_yakes,p_mitra,no_fax,tgl_sepakat,tgl_pelaksana,nik_app1,nik_app2) values  "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.bsumber.getText()+"','"+this.akunKB+"','"+this.e_pyakes.getText()+"','"+this.e_pmitra.getText()+"','"+this.e_fax.getText()+"','"+this.dp_d2.getDateString()+"','"+this.dp_d3.getDateString()+"','"+this.cb_app1.getText()+"','"+this.cb_app2.getText()+"')");																				
					
					sql.add("insert into kas_m (no_kas,kode_lokasi,no_dokumen,no_bg,akun_kb,tanggal,keterangan,kode_pp,modul,jenis,periode,kode_curr,kurs,nilai,nik_buat,nik_app,tgl_input,nik_user,posted,no_del,no_link,ref1,kode_bank) values  "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_dok.getText()+"','-','"+this.akunKB+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.app._kodePP+"','KBPB','"+this.c_jenis.getText()+"','"+this.e_periode.getText()+"','IDR',1,"+parseNilai(this.e_nilai.getText())+",'"+this.app._userLog+"','"+this.cb_app2.getText()+"',getdate(),'"+this.app._userLog+"','F','-','-','-','"+this.kodeRek+"')");
					
					sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank) values "+
							"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',0,'"+this.akunKB+"','"+this.e_ket.getText()+"','C',"+parseNilai(this.e_nilai.getText())+",'"+this.app._kodePP+"','-','-','-','"+this.app._lokasi+"','KBPB','KB','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'"+this.kodeRek+"')");
					
					if (this.sg2.getRowValidCount() > 0){
						var j=0;
						for (var i=0;i < this.sg2.getRowCount();i++){
							if (this.sg2.rowValid(i)){
							    j = i+1;								
								var data = this.dbLib.getDataProvider("select kode_rek from inv_bank where kode_bank='"+this.sg2.cells(0,i)+"'",true);
								if (typeof data == "object"){
									var line = data.rs.rows[0];							
									if (line != undefined){										
										var kodeRekTuj = line.kode_rek;					
									} 
								}								
								sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank) values "+
										"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',"+j+",'"+this.sg2.cells(3,i)+"','"+this.sg2.cells(4,i)+"','D',"+nilaiToFloat(this.sg2.cells(5,i))+",'"+this.app._kodePP+"','-','-','-','"+this.app._lokasi+"','KBPB','PB','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'"+kodeRekTuj+"')");
								sql.add("insert into kas_pb_d(no_urut,no_kas,kode_lokasi,periode,kode_bank,kode_akun,keterangan,nilai) values "+
										"("+j+",'"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.sg2.cells(0,i)+"','"+this.sg2.cells(3,i)+"','"+this.sg2.cells(4,i)+"',"+nilaiToFloat(this.sg2.cells(5,i))+")");
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
					this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);					
					this.sg.clear(1); 
					this.sg2.clear(1); 
					this.sg3.clear(1); 
					this.c_jenis.setText("BK");
					setTipeButton(tbSimpan);
					this.stsSimpan = 1;
					this.bTampil.show();
					this.pc2.setActivePage(this.pc2.childPage[0]);			
				break;
			case "simpan" :	
			case "ubah" :	
				this.preView = "1";
				var vApp = 0;
				for (var i = 0; i < this.sg.getRowCount(); i++) {
					if (this.sg.rowValid(i) && this.sg.cells(9,i) == "APP") {
						vApp++;
					} 						
				}
				if (vApp > 1) {
					system.alert(this,"Transaksi tidak valid.","Approve hanya untuk 1 deposito");
					return false;						
				}
				
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				this.sg2.validasi();
				if (nilaiToFloat(this.e_nilai.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Total Nilai tidak boleh nol atau kurang.");
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
					sql.add("delete from kas_m where no_kas='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from kas_j where no_kas='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from inv_kas_add where no_kas='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from kas_pb_d where no_kas='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("update inv_spb_surat set progress='1',no_kas='-' where no_kas='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
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
	doChange:function(sender){
		if (sender == this.bsumber && this.bsumber.getText()!="") {
			var data = this.dbLib.getDataProvider("select kode_akun,kode_rek,no_fax from inv_bank where kode_bank='"+this.bsumber.getText()+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
					this.akunKB = line.kode_akun;										
					this.kodeRek = line.kode_rek;					
					if (this.stsSimpan == 1) this.e_fax.setText(line.no_fax);
				} 
			}			
		}
	},	
	doClick:function(sender){
		if (this.stsSimpan == 0) {	
			this.sg.clear(1);this.sg2.clear(1); this.sg3.clear(1);
			this.e_nilai.setText("0");
			this.bTampil.show();
		}
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"kas_m","no_kas",this.app._lokasi+"-"+this.c_jenis.getText()+this.e_periode.getText().substr(2,4)+".","0000"));
		this.e_dok.setFocus();				
		this.stsSimpan = 1;					
		setTipeButton(tbSimpan);					
	},	
	doNilaiChange2: function(){
		try{			
			var tot = 0;			
			for (var i = 0; i < this.sg2.rows.getLength();i++){
				if (this.sg2.rowValid(i) && this.sg2.cells(5,i) != "") {
					tot = tot + nilaiToFloat(this.sg2.cells(5,i));				
				}
			}
			this.e_nilai.setText(floatToNilai(tot));
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},			
	doEllipsClick2: function(sender, col, row){
		try{			
			if (sender == this.sg2) {
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Bank",sender,undefined, 
												  "select kode_bank,nama    from inv_bank",
												  "select count(kode_bank)  from inv_bank",
												  ["kode_bank","nama"],"and",["Kode","Nama"],false);				
				}								
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doChangeCell2: function(sender, col, row){
		if ((col == 5) && (this.sg2.cells(5,row) != "")) this.sg2.validasi();
		sender.onChange.set(undefined,undefined);
	    if (col == 0) {
			if (sender.cells(0,row) != "") {
				var bank = this.dataBank.get(sender.cells(0,row));
				if (bank) {
					sender.cells(1,row,bank);					
					var data = this.dbLib.getDataProvider("select no_rek+' - '+nama_rek as rek,kode_akun from inv_bank where kode_bank='"+sender.cells(0,row)+"'",true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){
							sender.cells(2,row,line.rek);
							sender.cells(3,row,line.kode_akun);							
						} 
					}
				}
				else {                                    
					if (trim(sender.cells(0,row)) != "") system.alert(this,"Kode Bank "+sender.cells(0,row)+" tidak ditemukan","Inputkan kode lainnya.","checkBank");                
					sender.cells(0,row,"");
					sender.cells(1,row,"");
					sender.cells(2,row,"");
					sender.cells(3,row,"");
				}				
			}
		}					
		sender.onChange.set(this,"doChangeCell2");		
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							if (this.preView == "1") {								
								this.nama_report="server_report_saku2_kb_rptKbBuktiJurnal";
								this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_kas='"+this.e_nb.getText()+"' ";
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
							} 
							else {
								system.info(this,"Transaksi telah sukses tereksekusi (No Bukti : "+ this.e_nb.getText()+")","");							
								this.clearLayar();
							}
						}else system.info(this,result,"");
	    			break;
					case "getMultiDataProvider":
	    			    eval("result = "+result+";");
	    			    if (typeof result != "string"){
                            this.dataBank = new portalui_arrayMap();							
	    			        if (result.result[0]){	    			        
	    			            var line;
	    			            for (var i in result.result[0].rs.rows){
	    			                line = result.result[0].rs.rows[i];
	    			                this.dataBank.set(line.kode_bank, line.nama);
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
				this.viewer.setVisible(false);
				this.app._mainForm.pButton.setVisible(true);
				this.app._mainForm.reportNavigator.setVisible(false);  
				this.clearLayar();
				this.pc2.show();   
			break;
		}
	},
	clearLayar : function(){
		try {
			this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
			this.sg2.clear(1); 
			this.sg3.clear(1); 
			this.sg.clear(1); 
			setTipeButton(tbSimpan);
			this.stsSimpan = 1;
			this.pc2.setActivePage(this.pc2.childPage[0]);			
			this.bTampil.show();
		} catch(e) {
			alert(e);
		}
	},	
	doLoad3:function(sender){																									
		var strSQL = "select a.no_kas,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.nilai "+
		             "from kas_m a "+
					 "where a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.posted ='F' and modul = 'KBPB' "+
					 "order by a.no_kas";
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.sg3.clear();
			this.dataJU3 = data;
			this.sgn3.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn3.rearrange();
			this.page = 1;
			for (var i=0;i < this.dataJU3.rs.rows.length;i++){				
				line = this.dataJU3.rs.rows[i];													
				this.sg3.appendData([line.no_kas,line.tgl,line.keterangan,floatToNilai(line.nilai)]); 
			}
		} else this.sg3.clear(1);					
	},
	doTampilData3: function(page) {
		this.sg3.doSelectPage(page);
		this.page = page;
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
	},
	doDoubleClick3: function(sender, col , row) {		
		try{
			var baris = ((this.page-1) * 20) + row;
			if (this.sg3.cells(0,baris) != "") {
				this.pc2.setActivePage(this.pc2.childPage[0]);																		
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;								
				this.e_nb.setText(this.sg3.cells(0,baris));								
				this.bTampil.hide();
								
				var strSQL = "select a.tanggal,a.keterangan,a.no_dokumen, "+				             
							 "c.kode_bank,c.p_yakes,c.p_mitra,c.no_fax,c.tgl_sepakat,c.tgl_pelaksana,c.nik_app1,c.nik_app2,c.no_fax "+
							 "from kas_m a "+							 
							 "    inner join inv_kas_add c on a.no_kas=c.no_kas and a.kode_lokasi=c.kode_lokasi "+							 
							 "    inner join inv_bank b on c.kode_bank=b.kode_bank "+
							 "where a.no_kas = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";																	 
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){							
						this.dp_d1.setText(line.tanggal);	
						this.e_ket.setText(line.keterangan);	
						this.e_dok.setText(line.no_dokumen);												
						this.bsumber.setText(line.kode_bank);
						this.cb_app1.setText(line.nik_app1);
						this.cb_app2.setText(line.nik_app2);						
						this.e_pyakes.setText(line.p_yakes);
						this.e_pmitra.setText(line.p_mitra);
						this.e_fax.setText(line.no_fax);
						this.dp_d2.setText(line.tgl_sepakat);
						this.dp_d3.setText(line.tgl_pelaksana);																
						this.e_fax.setText(line.no_fax);
					}
				}
			
				var strSQL = "select a.no_spb,a.nomor2,convert(varchar,b.tanggal,103) as tgl,a.bsumber2+' - '+c.nama as asal,a.bsumber+' - '+d.nama as tujuan,a.hal2,a.ttd3+'-'+e.nama as ttd3,a.ttd4+'-'+f.nama as ttd4,b.nilai "+
							 "from inv_spb_surat a inner join inv_shop_m b on a.no_spb=b.no_spb and a.kode_lokasi=b.kode_lokasi "+
							 "     inner join inv_bank c on a.bsumber2=c.kode_bank "+
							 "     inner join inv_bank d on a.bsumber=d.kode_bank "+
							 "     inner join karyawan e on a.ttd3=e.nik "+
							 "     inner join karyawan f on a.ttd4=f.nik "+
							 "where a.no_kas='"+this.e_nb.getText()+"' and a.kode_lokasi ='"+this.app._lokasi+"'";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];												
						this.sg.appendData([line.no_spb,line.tgl,line.nomor2,line.asal,line.tujuan,line.hal2,line.ttd3,line.ttd4,floatToNilai(line.nilai),"APP"]);
					}
				} else this.sg.clear(1);								
				
				var strSQL = "select a.kode_bank,b.nama as nama_bank,b.no_rek+' - '+b.nama_rek as rek,a.kode_akun,a.keterangan,a.nilai from kas_pb_d a inner join inv_bank b on a.kode_bank=b.kode_bank where a.no_kas ='"+this.e_nb.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' order by a.no_urut";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg2.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg2.appendData([line.kode_bank,line.nama_bank,line.rek,line.kode_akun,line.keterangan,floatToNilai(line.nilai)]);
					}
				} else this.sg2.clear(1);						
				this.sg2.validasi();			
			}
		} catch(e) {alert(e);}		
	}
});
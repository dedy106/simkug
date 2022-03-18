window.app_saku2_transaksi_kopeg_kbitt_fSpbKBYpt = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kopeg_kbitt_fSpbKBYpt.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kopeg_kbitt_fSpbKBYpt";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form SPB YPT", 0);	
		
		uses("saiCB;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,440], childPage:["Data SPB","List SPB"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-30],colCount:4,tag:9,
		            colTitle:["No SPB","Tanggal","Nama","Deskripsi"],
					colWidth:[[3,2,1,0],[400,200,80,100]],
					readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});				
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,16,202,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,16,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});								
		this.cb_buat = new saiCBBL(this.pc2.childPage[0],{bound:[20,12,220,20],caption:"Pembuat", multiSelection:false, maxLength:10, tag:2});
		this.cb_bdh = new saiCBBL(this.pc2.childPage[0],{bound:[20,11,220,20],caption:"Pengaju", multiSelection:false, maxLength:10, tag:2});														
		this.cb_fiat = new saiCBBL(this.pc2.childPage[0],{bound:[20,13,220,20],caption:"Fiatur", multiSelection:false, maxLength:10, tag:2});
		this.cb_app1 = new saiCBBL(this.pc2.childPage[0],{bound:[20,12,220,20],caption:"Dir GA", multiSelection:false, maxLength:10, tag:2});							
		this.cb_app2 = new saiCBBL(this.pc2.childPage[0],{bound:[20,13,220,20],caption:"Ketua", multiSelection:false, maxLength:10, tag:2});
		this.e_total = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,13,200,20],caption:"Total SPB", tag:1, tipeText:ttNilai, text:"0",readOnly:true});			
		//this.bLoadHonor = new button(this.pc2.childPage[0],{bound:[650,13,80,18],caption:"Load Honor",click:[this,"doLoadHonor"]});

		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[5,20,990,270], childPage:["Peruntukan","Data Agenda","Detail Agenda"]});		
		this.e_nama = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,11,450,20],caption:"Nama", maxLength:50,tag:9});								
		this.e_alamat = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,12,450,20],caption:"Alamat", maxLength:150,tag:9});								
		this.e_ket = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,13,450,20],caption:"Uraian", maxLength:150,tag:9});								
		this.e_cek = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,11,450,20],caption:"Nomor Bilyet / Cek", maxLength:50,tag:9});	
		
		this.sg1 = new saiGrid(this.pc1.childPage[1],{bound:[0,5,this.pc1.width-5,this.pc1.height-35],colCount:13,tag:0,
				colTitle:["No Agenda","Uraian","Tanggal","Modul","Bagian / Unit","Nilai KasBank","Catatan Ver Akun","Tgl Input","User","No Ver.","Tgl Ver","No Ver2","Tgl Ver2"],
				colWidth:[[12,11,10,9,8,7,6,5,4,3,2,1,0],[70,90,70,90,150,60,200,100,150,60,70,200,80]],
				columnReadOnly:[true,[1,2,3,4,5,6,7,8,9,10,11,12],[0]],
				colFormat:[[5],[cfNilai]],					
				buttonStyle:[[0],[bsEllips]], 
				ellipsClick:[this,"doEllipsClick1"],change:[this,"doChangeCell1"],dblClick:[this,"doDoubleClick1"],nilaiChange:[this,"doNilaiChange1"],
				defaultRow:1,autoAppend:true});
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg1});

		this.sg2 = new saiGrid(this.pc1.childPage[2],{bound:[0,5,this.pc1.width-5,this.pc1.height-35],colCount:6,tag:9,
				colTitle:["Bank","Nama Rekening","No Rekening","Bruto","Pot. Pajak","Netto"],
				colWidth:[[5,4,3,2,1,0],[80,80,80,150,300,200]],
				columnReadOnly:[true,[0,1,2,3,4,5],[]],				
				colFormat:[[3,4,5],[cfNilai,cfNilai,cfNilai]],												
				defaultRow:1,autoAppend:false});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg2});
		
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
			
			this.cb_bdh.setSQL("select nik, nama from karyawan where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);
			this.cb_buat.setSQL("select nik, nama from karyawan where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);
			this.cb_fiat.setSQL("select nik, nama from karyawan where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);
			this.cb_app1.setSQL("select nik, nama from karyawan where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);
			this.cb_app2.setSQL("select nik, nama from karyawan where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);

			
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('YPTAPP1', 'YPTFIAT', 'YPTAPP2', 'YPTAJU') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																	
					if (line.kode_spro == "YPTAJU") this.cb_bdh.setText(line.flag);
					if (line.kode_spro == "YPTFIAT") this.cb_fiat.setText(line.flag);
					if (line.kode_spro == "YPTAPP1") this.cb_app1.setText(line.flag);
					if (line.kode_spro == "YPTAPP2") this.cb_app2.setText(line.flag);
				}
			}		
			this.cb_buat.setText(this.app._userLog);	
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_kopeg_kbitt_fSpbKBYpt.extend(window.childForm);
window.app_saku2_transaksi_kopeg_kbitt_fSpbKBYpt.implement({
	doLoadHonor : function() {
		var strSQL = "select a.no_aju,convert(varchar,a.tanggal,103) as tanggal,a.modul,b.kode_pp+' - '+b.nama as pp,a.keterangan,xx.nilai_fiat as nilai,g.catatan,convert(varchar,a.tgl_input,103) as tgl_input,a.user_input as nik_user,e.no_ver,convert(varchar,e.tgl_input,103) as tgl_ver,f.no_fiat,convert(varchar,f.tgl_input,103) as tgl_fiat  "+
					 "from it_aju_m a "+
					 
					 "inner join (   "+
					 "				select no_aju,kode_lokasi, sum(case dc when 'D' then nilai else -nilai end) as nilai_fiat "+
					 "				from it_aju_d "+
					 "			    where kode_lokasi='"+this.app._lokasi+"' "+
					 "				group by no_aju,kode_lokasi "+
					 "			  ) xx on a.no_aju=xx.no_aju and a.kode_lokasi=xx.kode_lokasi "+

					 "inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+					 					 
					 "inner join ver_m e on a.no_ver=e.no_ver and a.kode_lokasi=e.kode_lokasi "+
					 "inner join fiat_m f on f.no_fiat=a.no_fiat and f.kode_lokasi=a.kode_lokasi "+
					 "inner join fiat_d g on f.no_fiat=g.no_fiat and f.kode_lokasi=g.kode_lokasi "+					 					 					 
					 "where a.form='HONOR' and a.periode<='"+this.e_periode.getText()+"' and a.progress in ('2') and a.kode_lokasi='"+this.app._lokasi+"'";					
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;
			this.sg1.clear();
			for (var i in data.rs.rows){
				line = data.rs.rows[i];												
				this.sg1.appendData([line.no_aju,line.keterangan,line.tanggal,line.modul,line.pp,floatToNilai(line.nilai),line.catatan,line.tgl_input,line.nik_user,line.no_ver,line.tgl_ver,line.no_fiat,line.tgl_fiat]);
			}
		} else this.sg1.clear(1);
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
						sql.add("delete from it_spb_m where no_spb='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("update it_aju_m set progress='2',no_spb='-' where no_spb='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					} 
					
					sql.add("insert into it_spb_m (no_spb,kode_lokasi,nik_user,tgl_input,periode,tanggal,nama,alamat,keterangan,nik_bdh,nik_ver,nik_fiat,nilai,no_kas,nik_app1,nik_app2,no_cek) values  "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.app._userLog+"',getdate(),'"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_nama.getText()+"','"+this.e_alamat.getText()+"','"+this.e_ket.getText()+"','"+this.cb_bdh.getText()+"','"+this.cb_bdh.getText()+"','"+this.cb_fiat.getText()+"',"+nilaiToFloat(this.e_total.getText())+",'-','"+this.cb_app1.getText()+"','"+this.cb_app2.getText()+"','"+this.e_cek.getText()+"')");					
					
					for (var i=0;i < this.sg1.getRowCount();i++){
						if (this.sg1.rowValid(i)){
							sql.add("update it_aju_m set progress='S',no_spb='"+this.e_nb.getText()+"' where no_aju='"+this.sg1.cells(0,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
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
					this.sg1.clear(1); this.sg2.clear(1); this.sg3.clear(1); 
					setTipeButton(tbAllFalse);
					var sql = new server_util_arrayList();
					sql.add("select a.no_aju,a.keterangan from it_aju_m a "+
							"inner join ("+
							"      select no_aju,kode_lokasi,sum(case dc when 'D' then nilai else -nilai end) as total "+
							"      from it_aju_d where kode_lokasi='"+this.app._lokasi+"' "+
							"      group by no_aju,kode_lokasi) b on a.no_aju=b.no_aju and a.kode_lokasi=b.kode_lokasi and b.total > 0 "+
							"where a.periode<='"+this.e_periode.getText()+"' and a.progress in ('2') and a.kode_lokasi='"+this.app._lokasi+"'");			
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
								system.alert(this,"Transaksi tidak valid.","Duplikasi Agenda untuk baris ["+k+"]");
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
				sql.add("delete from it_spb_m where no_spb='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("update it_aju_m set progress='2',no_spb='-' where no_spb='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
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
		
		var sql = new server_util_arrayList();
		sql.add("select a.no_aju,a.keterangan from it_aju_m a "+
				"inner join ("+
				"      select no_aju,kode_lokasi,sum(case dc when 'D' then nilai else -nilai end) as total "+
				"      from it_aju_d where kode_lokasi='"+this.app._lokasi+"' "+
				"      group by no_aju,kode_lokasi) b on a.no_aju=b.no_aju and a.kode_lokasi=b.kode_lokasi and b.total > 0 "+
		        "where a.periode<='"+this.e_periode.getText()+"' and a.progress in ('2') and a.kode_lokasi='"+this.app._lokasi+"'");			
		this.dbLib.getMultiDataProviderA(sql);			
		
		if (this.stsSimpan == 1) this.doClick();				
	},		
	doClick:function(sender){
		if (this.e_periode.getText()!= "") {
			if (this.stsSimpan == 0) {
				this.sg1.clear(1);				
				this.sg2.clear(1); 
			}
			this.stsSimpan = 1;			
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"it_spb_m","no_spb",this.app._lokasi+"-SPB"+this.e_periode.getText().substr(2,4)+".","00000"));						
			this.cb_bdh.setFocus();
			setTipeButton(tbSimpan);
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
				strSQL = "select a.no_aju,a.keterangan from it_aju_m a "+
						 "inner join ("+
						 "      select no_aju,kode_lokasi,sum(case dc when 'D' then nilai else -nilai end) as total "+
						 "      from it_aju_d where kode_lokasi='"+this.app._lokasi+"' "+
						 "      group by no_aju,kode_lokasi) b on a.no_aju=b.no_aju and a.kode_lokasi=b.kode_lokasi and b.total > 0 "+
						 "where a.periode<='"+this.e_periode.getText()+"' and a.progress in ('2') and a.kode_lokasi='"+this.app._lokasi+"'  ";
				strROW = "select count(a.no_aju) from (select a.no_aju,a.keterangan,a.kode_lokasi from it_aju_m a "+
						 "inner join ("+
						 "      select no_aju,kode_lokasi,sum(case dc when 'D' then nilai else -nilai end) as total "+
						 "      from it_aju_d where kode_lokasi='"+this.app._lokasi+"' "+
						 "      group by no_aju,kode_lokasi) b on a.no_aju=b.no_aju and a.kode_lokasi=b.kode_lokasi and b.total > 0 "+
						 "where a.periode<='"+this.e_periode.getText()+"' and a.progress in ('2') and a.kode_lokasi='"+this.app._lokasi+"')a "+
						 "where a.kode_lokasi='"+this.app._lokasi+"' ";
				
				this.standarLib.showListData(this, "Daftar Agenda",sender,undefined,strSQL,strROW,
						["a.no_aju","a.keterangan"],"and",["No Agenda","Deskripsi"],false);				
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
					var strSQL = "select a.no_aju,convert(varchar,a.tanggal,103) as tanggal,a.modul,b.kode_pp+' - '+b.nama as pp,a.keterangan,xx.nilai_fiat as nilai,g.catatan,convert(varchar,a.tgl_input,103) as tgl_input,a.user_input as nik_user,e.no_ver,convert(varchar,e.tgl_input,103) as tgl_ver,f.no_fiat,convert(varchar,f.tgl_input,103) as tgl_fiat  "+
								 "from it_aju_m a "+
								 "inner join (select no_aju,kode_lokasi, sum(case dc when 'D' then nilai else -nilai end) as nilai_fiat from it_aju_d where kode_lokasi='"+this.app._lokasi+"' group by no_aju,kode_lokasi) xx on a.no_aju=xx.no_aju and a.kode_lokasi=xx.kode_lokasi "+
								 "inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+					 					 
								 "inner join ver_m e on a.no_ver=e.no_ver and a.kode_lokasi=e.kode_lokasi "+
								 "inner join fiat_m f on f.no_fiat=a.no_fiat and f.kode_lokasi=a.kode_lokasi "+
								 "inner join fiat_d g on f.no_fiat=g.no_fiat and f.kode_lokasi=g.kode_lokasi "+					 					 
								 "where a.no_aju='"+sender.cells(0,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'";			
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
						sender.cells(9,row,line.no_ver);
						sender.cells(10,row,line.tgl_ver);
						sender.cells(11,row,line.no_fiat);
						sender.cells(12,row,line.tgl_fiat);						
						sender.appendData(["","","","","","","","","","","","",""]);
					} 
				}
				else {
					if (trim(sender.cells(0,row)) != "") system.alert(this,"No Agenda "+sender.cells(0,row)+" tidak ditemukan","-","checkRek");                
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
					sender.cells(12,row,"");
				}				
			}
		}		
		sender.onChange.set(this,"doChangeCell1");		
	},	
	doDoubleClick1: function(sender, col , row) {
		var strSQL = "select bank,nama_rek,no_rek,nilai,isnull(pajak,0) as pajak,nilai+isnull(pajak,0) as bruto from it_aju_rek where no_aju='"+this.sg1.cells(0,row)+"' and kode_lokasi ='"+this.app._lokasi+"'";		
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;
			this.sg2.clear();
			for (var i in data.rs.rows){
				line = data.rs.rows[i];												
				this.sg2.appendData([line.bank,line.nama_rek,line.no_rek,floatToNilai(line.bruto),floatToNilai(line.pajak),floatToNilai(line.nilai)]);
			}
		} else this.sg2.clear(1);											
		this.pc1.setActivePage(this.pc1.childPage[2]);			
	},	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							if (this.preView == "1") {								
								this.nama_report="server_report_saku3_ypt_rptSpbYpt";
								this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_spb='"+this.e_nb.getText()+"' ";
								this.filter2 = this.e_periode.getText()+"/"+this.app._lokasi;
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
									this.dataAgenda.set(line.no_aju, line.keterangan);										
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
			this.sg1.clear(1); this.sg2.clear(1); this.sg3.clear(1); 
			setTipeButton(tbAllFalse);					
			this.pc2.setActivePage(this.pc2.childPage[0]);			
			this.pc1.setActivePage(this.pc1.childPage[0]);			
			var sql = new server_util_arrayList();
			sql.add("select a.no_aju,a.keterangan from it_aju_m a "+
					"inner join ("+
					"      select no_aju,kode_lokasi,sum(case dc when 'D' then nilai else -nilai end) as total "+
					"      from it_aju_d where kode_lokasi='"+this.app._lokasi+"' "+
					"      group by no_aju,kode_lokasi) b on a.no_aju=b.no_aju and a.kode_lokasi=b.kode_lokasi and b.total > 0 "+
					"where a.periode<='"+this.e_periode.getText()+"' and a.progress in ('2') and a.kode_lokasi='"+this.app._lokasi+"'");			
			this.dbLib.getMultiDataProviderA(sql);			
		} catch(e) {
			alert(e);
		}
	},		
	doLoad3:function(sender){																
		var strSQL = "select a.no_spb,convert(varchar,a.tanggal,103) as tgl,a.nama,a.keterangan "+
		             "from it_spb_m a "+
					 "where a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.no_kas ='-' order by a.no_spb ";
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
								
				var strSQL = "select * from it_spb_m "+
							 "where no_spb = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){					
						this.e_nama.setText(line.nama);
						this.e_alamat.setText(line.alamat);
						this.e_ket.setText(line.keterangan);
						this.cb_buat.setText(line.nik_user);
						this.cb_bdh.setText(line.nik_bdh);				
						this.cb_app1.setText(line.nik_app1);				
						this.cb_fiat.setText(line.nik_fiat);	
						this.cb_app2.setText(line.nik_app2);	
						this.e_cek.setText(line.no_cek);
					}
				}				
				var strSQL = "select a.no_aju,convert(varchar,a.tanggal,103) as tanggal,a.modul,b.kode_pp+' - '+b.nama as pp,a.keterangan,xx.nilai_fiat as nilai,g.catatan,convert(varchar,a.tgl_input,103) as tgl_input,a.user_input as nik_user,e.no_ver,convert(varchar,e.tgl_input,103) as tgl_ver,f.no_fiat,convert(varchar,f.tgl_input,103) as tgl_fiat  "+
							 "from it_aju_m a "+
							 "inner join (select no_aju,kode_lokasi, sum(case dc when 'D' then nilai else -nilai end) as nilai_fiat from it_aju_d where kode_lokasi='"+this.app._lokasi+"' group by no_aju,kode_lokasi) xx on a.no_aju=xx.no_aju and a.kode_lokasi=xx.kode_lokasi "+
							 "inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+					 					 
							 "inner join ver_m e on a.no_ver=e.no_ver and a.kode_lokasi=e.kode_lokasi "+
							 "inner join fiat_m f on f.no_fiat=a.no_fiat and f.kode_lokasi=a.kode_lokasi "+
							 "inner join fiat_d g on f.no_fiat=g.no_fiat and f.kode_lokasi=g.kode_lokasi "+					 					 
							 "where a.no_spb='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";			
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg1.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];												
						this.sg1.appendData([line.no_aju,line.keterangan,line.tanggal,line.modul,line.pp,floatToNilai(line.nilai),line.catatan,line.tgl_input,line.nik_user,line.no_ver,line.tgl_ver,line.no_fiat,line.tgl_fiat]);
					}
				} else this.sg1.clear(1);											
			}						
		} catch(e) {alert(e);}
	}
});
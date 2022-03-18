window.app_saku3_transaksi_investasi_invest2_fAppObli = function(owner)
{
	if (owner)
	{		
		window.app_saku3_transaksi_investasi_invest2_fAppObli.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_investasi_invest2_fAppObli";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Approval Obligasi", 0);	
		
		uses("saiCB;saiMemo;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");				
		uses("saiCBBL",true);
		
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,200,20],caption:"Periode",tag:2,readOnly:true,visible:false, change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,98,18],selectDate:[this,"doSelectDate"]});		
		
		this.pc1 = new pageControl(this,{bound:[10,18,1000,430], childPage:["Daftar Bukti","Detail Bukti","Jurnal & Budget","Filter Data"]});		
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:10,tag:0,
		            colTitle:["Modul","No Bukti","Status","Tanggal","Tgl Settl","Deskripsi","Nilai","No Approve","Tgl Input","Pembuat"],
					colWidth:[[9,8,7,6,5,4,3,2,1,0],[150,110,100,100,300,70,70,80,100,80]],					
					readOnly:true,colFormat:[[6],[cfNilai]],
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:bsAll,grid:this.sg,pager:[this,"doPager"]});
				
		this.c_status = new saiCB(this.pc1.childPage[1],{bound:[20,11,200,20],caption:"Status",items:["APPROVE","RETURN"], readOnly:true,tag:0});
		this.e_nb = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,10,200,20],caption:"No App", readOnly:true,visible:false});						
		this.e_memo = new saiMemo(this.pc1.childPage[1],{bound:[20,10,550,60],caption:"Catatan",tag:9,readOnly:true});				
		
		this.e_nobukti = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,220,20],caption:"No Bukti", readOnly:true});		
		this.e_modul = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,220,20],caption:"Modul", readOnly:true,change:[this,"doChange"]});				
		this.e_tgl = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,14,220,20],caption:"Tgl Bukti", readOnly:true});
		this.e_ket = new saiLabelEdit(this.pc1.childPage[1],{bound:[270,14,450,20],caption:"Deskripsi", readOnly:true});					
		this.e_duedate = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,15,220,20],caption:"Tgl Settl", readOnly:true});				
		this.e_buat = new saiLabelEdit(this.pc1.childPage[1],{bound:[270,15,450,20],caption:"Pembuat", readOnly:true});
		this.e_nilai = new saiLabelEdit(this.pc1.childPage[1],{bound:[770,15,220,20],caption:"Nilai", readOnly:true, tipeText:ttNilai, text:"0",change:[this,"doChange"]});				
		
		this.sg1 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,212],colCount:3,tag:0,				
				colTitle:["Obligasi","Nama","Nilai"],
				colWidth:[[2,1,0],[100,240,80]],
				colFormat:[[2],[cfNilai]],								
				readOnly:true, defaultRow:1,autoAppend:false});
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1});				
		
		this.sg3 = new saiGrid(this.pc1.childPage[2],{bound:[1,5,this.pc1.width-5,200],colCount:9,tag:9,
		            colTitle:["Kode Akun","Nama Akun","DC","Keterangan","Nilai","Kode PP","Nama PP","Kode DRK","Nama DRK"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[150,80,150,80,100,270,50,200,80]],					
					readOnly:true,colFormat:[[4],[cfNilai]],nilaiChange:[this,"doNilaiChange"],autoAppend:false,defaultRow:1});		
		
		this.sg2 = new saiGrid(this.pc1.childPage[2],{bound:[1,210,this.pc1.width-5,210],colCount:7,tag:9,
		            colTitle:["Kode Akun","Nama Akun","Kode PP","Nama PP","Saldo Awal","Nilai","Saldo Akhir"],
					colWidth:[[6,5,4,3,2,1,0],[100,100,100,200,80,200,80]],
					readOnly:true,colFormat:[[4,5,6],[cfNilai,cfNilai,cfNilai]],autoAppend:true,defaultRow:1});
				
		this.c_modul2 = new saiCB(this.pc1.childPage[3],{bound:[20,11,200,20],caption:"Modul",items:["OBBELI","OBJUAL","OBSPI"], readOnly:true,tag:9,change:[this,"doChange"]});
		this.cb_nb = new saiCBBL(this.pc1.childPage[3],{bound:[20,12,220,20],caption:"No Bukti", multiSelection:false, maxLength:10, tag:9,change:[this,"doChange"]});
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);	
		this.pc1.childPage[3].rearrangeChild(10, 23);	
				
		setTipeButton(tbAllFalse);
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
			this.stsSimpan = 1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);			
			
			this.c_modul2.setText("");
		
		}catch(e){
			systemAPI.alert(e);
		}		
	}
};
window.app_saku3_transaksi_investasi_invest2_fAppObli.extend(window.childForm);
window.app_saku3_transaksi_investasi_invest2_fAppObli.implement({	
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
			this.doClick();
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();																								
					if (this.c_status.getText() == "RETURN") var vStatus = "M"; else var vStatus = "1";										
										
					sql.add("update inv_app2_m set no_flag='"+this.e_nb.getText()+"' where no_bukti='"+this.e_nobukti.getText()+"' and no_flag='-' and form='APPMAN' and modul='"+this.e_modul.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
					sql.add("insert into inv_app2_m (no_app,kode_lokasi,tanggal,periode,tgl_input,nik_user,status,modul,form,no_bukti,catatan,no_flag) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"','"+this.e_periode.getText()+"',getdate(),'"+this.app._userLog+"','"+vStatus+"','"+this.e_modul.getText()+"','APPMAN','"+this.e_nobukti.getText()+"','"+this.e_memo.getText()+"','-')");
																				
					//---------------- flag bukti					
					if (this.e_modul.getText() == "OBBELI") sql.add("update inv_oblibeli_m set no_app1='"+this.e_nb.getText()+"',progress='"+vStatus+"' where no_beli='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					
					//if (this.e_modul.getText() == "RDJUAL") sql.add("update inv_rdjual_m set no_app1='"+this.e_nb.getText()+"',progress='"+vStatus+"' where no_rdjual='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					//if (this.e_modul.getText() == "RDDEV") sql.add("update inv_rddev_m set no_app1='"+this.e_nb.getText()+"',progress='"+vStatus+"' where no_rddev='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					
					if (this.e_modul.getText() == "OBSPI") sql.add("update inv_oblispi_m set no_app1='"+this.e_nb.getText()+"',progress='"+vStatus+"' where no_spi='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					if (this.e_modul.getText() == "OBAKRU") sql.add("update inv_obliakru_m set no_app1='"+this.e_nb.getText()+"',progress='"+vStatus+"' where no_akru='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					
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
					this.standarLib.clearByTag(this, new Array("0","1","9"),this.e_nb);
					this.sg1.clear(1); this.sg2.clear(1); this.sg3.clear(1); 
					this.doClick();
					this.doLoad();					
					this.pc1.setActivePage(this.pc1.childPage[0]);	
					this.e_memo.setText("");
					setTipeButton(tbAllFalse);
				break;
			case "simpan" :	
			case "ubah" :					
				this.preView = "1";								
				if (nilaiToFloat(this.e_nilai.getText()) <= 0) {				
					system.alert(this,"Transaksi tidak valid.","Total tidak boleh nol atau kurang.");
					return false;						
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
				
			case "hapus" :	
				this.preView = "0";
				uses("server_util_arrayList");
				var sql = new server_util_arrayList();									
				sql.add("delete from inv_app2_m where no_app='"+this.noAppLama+"' and kode_lokasi='"+this.app._lokasi+"'");				
				
				if (this.e_modul.getText() == "OBBELI") sql.add("update inv_oblibeli_m set no_app1='-',progress='0' where no_beli='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");				
				
				//if (this.e_modul.getText() == "RDJUAL") sql.add("update inv_rdjual_m set no_app1='-',progress='0' where no_rdjual='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");								
				//if (this.e_modul.getText() == "RDDEV") sql.add("update inv_rddev_m set no_app1='-',progress='0' where no_rddev='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				
				if (this.e_modul.getText() == "OBSPI") sql.add("update inv_oblispi_m set no_app1='-',progress='0' where no_spi='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				if (this.e_modul.getText() == "OBAKRU") sql.add("update inv_obliakru_m set no_app1='-',progress='0' where no_akru='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					
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
		if (this.stsSimpan == 1) this.doClick();
		this.doLoad();
	},	
	
	doChange:function(sender){	
		if (sender == this.c_modul2 && this.e_periode.getText() != "") {
			if (this.c_modul2.getText() == "OBBELI") {
			 	this.cb_nb.setSQL("select no_beli, keterangan from inv_oblibeli_m where modul='OBBELI' and periode='"+this.e_periode.getText()+"' and progress in ('1','M') and kode_lokasi='"+this.app._lokasi+"'",["no_beli","keterangan"],false,["No Bukti","Deskripsi"],"and","Daftar Bukti",true);					
			}
			//if (this.c_modul2.getText() == "RDJUAL") this.cb_nb.setSQL("select no_rdjual, keterangan from inv_rdjual_m where modul='RDJUAL' and periode='"+this.e_periode.getText()+"' and progress in ('1','M') and kode_lokasi='"+this.app._lokasi+"'",["no_rdjual","keterangan"],false,["No Bukti","Deskripsi"],"and","Daftar Bukti",true);				
			//if (this.c_modul2.getText() == "RDDEV") this.cb_nb.setSQL("select no_rddev, keterangan from inv_rddev_m where modul='RDDEV' and periode='"+this.e_periode.getText()+"' and progress in ('1','M') and kode_lokasi='"+this.app._lokasi+"'",["no_rddev","keterangan"],false,["No Bukti","Deskripsi"],"and","Daftar Bukti",true);							
			
			if (this.c_modul2.getText() == "OBSPI") this.cb_nb.setSQL("select no_spi, keterangan from inv_oblispi_m where modul='OBSPI' and periode='"+this.e_periode.getText()+"' and progress in ('1','M') and kode_lokasi='"+this.app._lokasi+"'",["no_spi","keterangan"],false,["No Bukti","Deskripsi"],"and","Daftar Bukti",true);							
			if (this.c_modul2.getText() == "OBAKRU") this.cb_nb.setSQL("select no_akru, keterangan from inv_obliakru_m where modul='OBAKRU' and periode='"+this.e_periode.getText()+"' and progress in ('1','M') and kode_lokasi='"+this.app._lokasi+"'",["no_akru","keterangan"],false,["No Bukti","Deskripsi"],"and","Daftar Bukti",true);							
		}
		
		if (sender == this.cb_nb && this.cb_nb.getText() != "") {
			if (this.c_modul2.getText() == "OBBELI") {					
				var strSQL = "select a.tanggal as due_date,a.no_beli as no_bukti,case a.progress when '1' then 'APPROVE' else 'RETURN' end as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.tanggal,103) as tgl2,a.modul,a.keterangan,a.nilai,a.no_app1,convert(varchar,a.tgl_input,120) as tglinput,b.nik+' - '+b.nama as buat "+
							 "from inv_oblibeli_m a inner join karyawan b on a.nik_buat=b.nik "+					 
							 "where a.no_beli='"+this.cb_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' ";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU = data;
					this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
					this.sgn.rearrange();
					this.doTampilData(1);
				} else this.sg.clear(1);								
			}
			
			if (this.c_modul2.getText() == "OBSPI") {					
				var strSQL = "select a.tanggal as due_date,a.no_spi as no_bukti,case a.progress when '1' then 'APPROVE' else 'RETURN' end as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.tanggal,103) as tgl2,a.modul,a.keterangan,a.nilai,a.no_app1,convert(varchar,a.tgl_input,120) as tglinput,b.nik+' - '+b.nama as buat "+
							 "from inv_oblispi_m a inner join karyawan b on a.nik_buat=b.nik "+					 
							 "where a.no_spi='"+this.cb_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' ";			 
							 
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU = data;
					this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
					this.sgn.rearrange();
					this.doTampilData(1);
				} else this.sg.clear(1);								
			}
			
			if (this.c_modul2.getText() == "OBAKRU") {					
				var strSQL = "select a.tanggal as due_date,a.no_spi as no_bukti,case a.progress when '1' then 'APPROVE' else 'RETURN' end as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.tanggal,103) as tgl2,a.modul,a.keterangan,a.nilai,a.no_app1,convert(varchar,a.tgl_input,120) as tglinput,b.nik+' - '+b.nama as buat "+
							 "from inv_obliakru_m a inner join karyawan b on a.nik_buat=b.nik "+					 
							 "where a.no_akru='"+this.cb_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' ";			 
							 
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU = data;
					this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
					this.sgn.rearrange();
					this.doTampilData(1);
				} else this.sg.clear(1);								
			}
			this.pc1.setActivePage(this.pc1.childPage[0]);				
		}
		
	},
	doClick:function(sender){		
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"inv_app2_m","no_app",this.app._lokasi+"-OBM"+this.e_periode.getText().substr(2,4)+".","0000"));												
		this.e_memo.setFocus();								
	},		
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg.cells(0,row) != "") {			
				this.pc1.setActivePage(this.pc1.childPage[1]);											
				if (this.sg.cells(2,row) == "RETURN") this.c_status.setText(this.sg.cells(2,row));								
				else this.c_status.setText("APPROVE");
				this.e_modul.setText(this.sg.cells(0,row));
				this.e_nobukti.setText(this.sg.cells(1,row));
				this.e_tgl.setText(this.sg.cells(3,row));
				this.e_duedate.setText(this.sg.cells(4,row));
				this.e_ket.setText(this.sg.cells(5,row));
				this.e_nilai.setText(this.sg.cells(6,row));				
				this.e_buat.setText(this.sg.cells(9,row));
				this.noAppLama = this.sg.cells(7,row);						
				this.e_memo.setText(this.sg.cells(5,row));				
				
				this.doLoadData();
				this.doLoadGar();
				this.doLoadJurnal();
				
				if (this.sg.cells(2,row) == "INPROG") {
					setTipeButton(tbSimpan);
					this.stsSimpan = 1;
				}
				else {
					setTipeButton(tbUbahHapus);
					this.stsSimpan = 0;
				}
				
			}
		} catch(e) {alert(e);}
	},		
	doLoadData:function(){
		if (this.e_modul.getText() == "OBBELI") {
			strSQL1 = "select a.kode_jenis,b.nama,a.nilai  "+
					  "from inv_obli_d a inner join inv_oblijenis b on a.kode_jenis=b.kode_jenis "+					 					 
					  "where a.no_beli='"+this.e_nobukti.getText()+"' ";					
			var data1 = this.dbLib.getDataProvider(strSQL1,true);	
			if (typeof data1 == "object" && data1.rs.rows[0] != undefined){
				var line1;
				this.sg1.clear();
				for (var i in data1.rs.rows){
					line1 = data1.rs.rows[i];																													
					this.sg1.appendData([line1.kode_jenis,line1.nama,parseFloat(line1.nilai)]);
				}
			} else this.sg1.clear(1);									
		}
		/*
		if (this.e_modul.getText() == "RDJUAL") {
			var strSQL1 = "select b.kode_rd,b.nama,d.h_jual,d.jumlah as jml,d.n_jual,d.komisi,d.vat,d.levi,d.pph "+
						 "from inv_rdjual_d d "+						 
						 "     inner join inv_rd b on d.kode_rd=b.kode_rd "+						 
						 "where d.no_rdjual = '"+this.e_nobukti.getText()+"' ";			
			var data = this.dbLib.getDataProvider(strSQL1,true);	
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg1.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																													
					this.sg1.appendData([line.kode_rd,line.nama,floatToNilai(line.h_jual),floatToNilai(line.jml),floatToNilai(line.n_jual),floatToNilai(line.komisi),floatToNilai(line.vat),floatToNilai(line.levi),floatToNilai(line.pph)]);
				}					
			} else this.sg1.clear(1);															
		}		
		if (this.e_modul.getText() == "RDDEV") {
			var strSQL1 = "select d.kode_rd,b.nama,d.nilai_kb as nilai "+
						 "from inv_rddev_d d "+						 
						 "     inner join inv_rddev_m a on a.no_rddev=d.no_rddev "+						 
						 "     inner join inv_rd b on d.kode_rd=b.kode_rd "+						 
						 "where d.no_rddev = '"+this.e_nobukti.getText()+"' ";			
			var data = this.dbLib.getDataProvider(strSQL1,true);	
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg1.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																													
					this.sg1.appendData([line.kode_rd,line.nama,"0","0",floatToNilai(line.nilai),"0","0","0","0"]);
				}					
			} else this.sg1.clear(1);															
		}
		*/
		
		if (this.e_modul.getText() == "OBSPI") {
			var strSQL1 = "select d.kode_jenis,b.nama,(d.h_wajar-d.h_buku) * d.jumlah as nilai "+
						 "from inv_oblispi_d d "+						 
						 "     inner join inv_oblijenis b on d.kode_jenis=b.kode_jenis "+						 
						 "where d.no_spi = '"+this.e_nobukti.getText()+"' ";			
			var data = this.dbLib.getDataProvider(strSQL1,true);	
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg1.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];						
					this.sg1.appendData([line.kode_jenis,line.nama,floatToNilai(line.nilai)]);
					
					if (i == 50) return false;
				
				}					
			} else this.sg1.clear(1);															
		}
		
		if (this.e_modul.getText() == "OBAKRU") {
			var strSQL1 = "select d.kode_jenis,b.nama,d.nilai "+
						 "from inv_obliakru_d d "+						 
						 "     inner join inv_oblijenis b on d.kode_jenis=b.kode_jenis "+						 
						 "where d.no_akru = '"+this.e_nobukti.getText()+"' ";			
			var data = this.dbLib.getDataProvider(strSQL1,true);	
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg1.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];						
					this.sg1.appendData([line.kode_jenis,line.nama,floatToNilai(line.nilai)]);
					
					if (i == 50) return false;
				
				}					
			} else this.sg1.clear(1);															
		}
	},
	doLoadGar:function(){			
		if (this.e_modul.getText() == "OBBELI") {
			var strSQL2 = "select a.kode_akun,b.nama as nama_akun,a.kode_pp,c.nama as nama_pp,a.saldo,a.nilai,a.saldo-a.nilai as sakhir "+
						  "from angg_r a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
						  "              inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+							  
						  "where a.no_bukti = '"+this.e_nobukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.kode_akun";
		}
		var data = this.dbLib.getDataProvider(strSQL2,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;
			this.sg2.clear();
			for (var i in data.rs.rows){
				line = data.rs.rows[i];													
				this.sg2.appendData([line.kode_akun,line.nama_akun,line.kode_pp,line.nama_pp,floatToNilai(line.saldo),floatToNilai(line.nilai),floatToNilai(line.sakhir)]);
			}
		} else this.sg2.clear(1);
	},
	doLoadJurnal:function(){
		if (this.e_modul.getText() == "OBBELI") {			  
			var strSQL3 = "select b.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp,d.kode_drk,isnull(d.nama,'-') as nama_drk "+
					  "from inv_oblibeli_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
					  "               inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+												  
					  "               left join drk d on d.kode_drk=a.kode_drk and d.kode_lokasi=a.kode_lokasi and d.tahun=substring(a.periode,1,4) "+
					  "where a.no_beli = '"+this.e_nobukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.dc desc";
		}
		/*
		if (this.e_modul.getText() == "RDJUAL") {			  
			var strSQL3 = "select b.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp,d.kode_drk,isnull(d.nama,'-') as nama_drk "+
					  "from inv_rdjual_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
					  "               inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+												  
					  "               left join drk d on d.kode_drk=a.kode_drk and d.kode_lokasi=a.kode_lokasi and d.tahun=substring(a.periode,1,4) "+
					  "where a.no_rdjual = '"+this.e_nobukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.dc desc";
		}
		if (this.e_modul.getText() == "RDDEV") {			  
			var strSQL3 = "select b.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp,d.kode_drk,isnull(d.nama,'-') as nama_drk "+
					  "from inv_rddev_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
					  "               inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+												  
					  "               left join drk d on d.kode_drk=a.kode_drk and d.kode_lokasi=a.kode_lokasi and d.tahun=substring(a.periode,1,4) "+
					  "where a.no_rddev = '"+this.e_nobukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.dc desc";
		}
		*/
		if (this.e_modul.getText() == "OBSPI") {			  
			var strSQL3 = "select b.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp,d.kode_drk,isnull(d.nama,'-') as nama_drk "+
					  "from inv_oblispi_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
					  "               inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+												  
					  "               left join drk d on d.kode_drk=a.kode_drk and d.kode_lokasi=a.kode_lokasi and d.tahun=substring(a.periode,1,4) "+
					  "where a.no_spi = '"+this.e_nobukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.dc desc";
		}
		var data = this.dbLib.getDataProvider(strSQL3,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;
			this.sg3.clear();
			for (var i in data.rs.rows){
				line = data.rs.rows[i];												
				this.sg3.appendData([line.kode_akun,line.nama_akun,line.dc.toUpperCase(),line.keterangan,floatToNilai(line.nilai),line.kode_pp,line.nama_pp,line.kode_drk,line.nama_drk]);
			}
		} else this.sg3.clear(1);	
		
		if (this.e_modul.getText() == "OBAKRU") {			  
			var strSQL3 = "select b.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp,d.kode_drk,isnull(d.nama,'-') as nama_drk "+
					  "from inv_obliakru_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
					  "               inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+												  
					  "               left join drk d on d.kode_drk=a.kode_drk and d.kode_lokasi=a.kode_lokasi and d.tahun=substring(a.periode,1,4) "+
					  "where a.no_akru = '"+this.e_nobukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.dc desc";
		}
		var data = this.dbLib.getDataProvider(strSQL3,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;
			this.sg3.clear();
			for (var i in data.rs.rows){
				line = data.rs.rows[i];												
				this.sg3.appendData([line.kode_akun,line.nama_akun,line.dc.toUpperCase(),line.keterangan,floatToNilai(line.nilai),line.kode_pp,line.nama_pp,line.kode_drk,line.nama_drk]);
			}
		} else this.sg3.clear(1);						
				
	},
	doLoad:function(sender){																		
		var strSQL = "select a.tanggal as due_date,a.no_beli as no_bukti,'INPROG' as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.tanggal,103) as tgl2,a.modul,a.keterangan,a.nilai,a.no_app1,convert(varchar,a.tgl_input,120) as tglinput,b.nik+' - '+b.nama as buat "+
		             "from inv_oblibeli_m a inner join karyawan b on a.nik_buat=b.nik "+					 
					 "where a.progress='0' and a.kode_lokasi='"+this.app._lokasi+"' "+					 					 
		/*
					 "union all "+
					 "select a.tgl_set as due_date,a.no_rdjual as no_bukti,'INPROG' as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.tgl_set,103) as tgl2,a.modul,a.keterangan,a.nilai_piutang+a.nilai_piugl as nilai,a.no_app1,convert(varchar,a.tgl_input,120) as tglinput,b.nik+' - '+b.nama as buat "+
		             "from inv_rdjual_m a inner join karyawan b on a.nik_buat=b.nik "+					 
					 "where a.progress='0' and a.kode_lokasi='"+this.app._lokasi+"' "+					 					 
					 
					 "union all "+
					 "select a.tanggal as due_date,a.no_rddev as no_bukti,'INPROG' as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.tanggal,103) as tgl2,a.modul,a.keterangan,a.nilai,a.no_app1,convert(varchar,a.tgl_input,120) as tglinput,b.nik+' - '+b.nama as buat "+
		             "from inv_rddev_m a inner join karyawan b on a.nik_buat=b.nik "+					 
					 "where a.progress='0' and a.kode_lokasi='"+this.app._lokasi+"' "+					 					 
*/
					 "union all "+
					 "select a.tanggal as due_date,a.no_spi as no_bukti,'INPROG' as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.tanggal,103) as tgl2,a.modul,a.keterangan,a.nilai,a.no_app1,convert(varchar,a.tgl_input,120) as tglinput,b.nik+' - '+b.nama as buat "+
		             "from inv_oblispi_m a inner join karyawan b on a.nik_buat=b.nik "+					 
					 "where a.progress='0' and a.kode_lokasi='"+this.app._lokasi+"' "+					 					 
		
					 "union all "+
					 "select a.tanggal as due_date,a.no_akru as no_bukti,'INPROG' as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.tanggal,103) as tgl2,a.modul,a.keterangan,a.nilai,a.no_app1,convert(varchar,a.tgl_input,120) as tglinput,b.nik+' - '+b.nama as buat "+
		             "from inv_obliakru_m a inner join karyawan b on a.nik_buat=b.nik "+					 
					 "where a.progress='0' and a.kode_lokasi='"+this.app._lokasi+"' "+	
					 
					 "order by due_date";					 					
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn.rearrange();
			this.doTampilData(1);
		} else this.sg.clear(1);							
	},							
	doTampilData: function(page) {
		this.sg.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];													
			this.sg.appendData([line.modul.toUpperCase(),line.no_bukti,line.status.toUpperCase(),line.tgl,line.tgl2,line.keterangan,floatToNilai(line.nilai),line.no_app1,line.tglinput,line.buat]); 
		}
		this.sg.setNoUrut(start);
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
							if (this.preView == "1") {
								//this.nama_report="server_report_saku3_hutang_rptSpbForm";									                  
								//this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_spb='"+this.e_nb.getText()+"' ";
								this.filter2 = "";								
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
							else {
								system.info(this,"Transaksi telah sukses tereksekusi (No Bukti : "+ this.e_nb.getText()+")","");							
								this.clearLayar();
							}
						}else system.info(this,result,"");
	    			break;			
					
					case "getMultiDataProvider":
						eval("result = "+result+";");
						if (typeof result != "string"){
							this.dataAkun = new portalui_arrayMap();							
							this.dataPP = new portalui_arrayMap();							
							if (result.result[0]){	    			        
								var line;
								for (var i in result.result[0].rs.rows){
									line = result.result[0].rs.rows[i];
									this.dataAkun.set(line.kode_akun, line.nama);
								}
							}
							if (result.result[1]){	    			        
								var line;
								for (var i in result.result[1].rs.rows){
									line = result.result[1].rs.rows[i];
									this.dataPP.set(line.kode_pp, line.nama);
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
			this.standarLib.clearByTag(this, new Array("0","1","9"),this.e_nb);
			this.sg1.clear(1); this.sg2.clear(1); this.sg3.clear(1); 
			this.doClick();
			this.doLoad();					
			this.pc1.setActivePage(this.pc1.childPage[0]);				
			this.e_memo.setText("");
			setTipeButton(tbAllFalse);
		} catch(e) {
			alert(e);
		}
	}
});


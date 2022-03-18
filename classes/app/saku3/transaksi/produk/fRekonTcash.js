window.app_saku3_transaksi_produk_fRekonTcash = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_produk_fRekonTcash.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_produk_fRekonTcash";
		this.itemsValue = new arrayList();
		this.maximize();		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Penyelesaian Piutang TCASH", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"], visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,120,20],caption:"Tanggal", underline:true});	
		this.dp_d1 = new portalui_datePicker(this,{bound:[140,11,100,20],selectDate:[this,"doSelectDate"]});
		
		this.pc1 = new pageControl(this,{bound:[20,12,1000,430], childPage:["Data TCASH","Daftar TCASH"]});				
		this.sg1 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:3,tag:9,
		            colTitle:["No. Bukti","Deskripsi","Nilai KB"],
					colWidth:[[2,1,0],[100,300,100]],
					colFormat:[[2],[cfNilai]],
					readOnly:true,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
		this.bLoad1 = new portalui_imageButton(this.sgn1,{bound:[this.sgn1.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data Closing",click:[this,"doLoad"]});

		this.e_nb = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,10,200,20],caption:"No Bukti",maxLength:10,change:[this,"doChange"],readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc1.childPage[0],{bound:[225,10,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});												
		this.e_ket = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,15,450,20],caption:"Deskripsi", maxLength:50, tag:1});
		this.e_total = new saiLabelEdit(this.pc1.childPage[0],{bound:[790,15,200,20],caption:"Total", maxLength:50, tag:1,tipeText:ttNilai,text:"0",readOnly:true,change:[this,"doChange"]});			
		this.cb_kb = new saiCBBL(this.pc1.childPage[0],{bound:[20,16,220,20],caption:"Kas Bank", maxLength:50, tag:1, multiSelection:false});	
		this.e_adm = new saiLabelEdit(this.pc1.childPage[0],{bound:[790,16,200,20],caption:"Nilai Adm", maxLength:50, tag:1,tipeText:ttNilai,text:"0",change:[this,"doChange"]});	
		this.cb_adm = new saiCBBL(this.pc1.childPage[0],{bound:[20,14,220,20],caption:"Akun Adm", tag:2, readOnly:true});			
		this.bTampil = new button(this.pc1.childPage[0],{bound:[530,14,80,18],caption:"Tampil Data",click:[this,"doCari"]});					
		this.i_bAll = new portalui_imageButton(this.pc1.childPage[0],{bound:[740,14,20,20],hint:"App All",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_kas = new saiLabelEdit(this.pc1.childPage[0],{bound:[790,14,200,20],caption:"Nilai KasBank", maxLength:50, tag:1,tipeText:ttNilai,text:"0",readOnly:true});
		this.bRekon = new button(this.pc1.childPage[0],{bound:[630,14,100,20],caption:"Rekon Pelunasan", click:[this,"doRekon"]});

		this.pc2 = new pageControl(this.pc1.childPage[0],{bound:[1,15,995,305], childPage:["Data Penyelesaian TCASH","Data Penerimaan TCASH"]});				
		this.sg4 = new saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:8,tag:9,
		            colTitle:["Status","No. BA","ID TCash","Nota","Tgl Nota","Tenan","Nilai","Nilai Selisih"],
					colWidth:[[7,6,5,4,3,2,1,0],[100,100,270,100,100,150,100,80]],
					columnReadOnly:[true,[1,2,3,4,5,6,7]],					
					change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],
					colFormat:[[6,7],[cfNilai,cfNilai]],
					buttonStyle:[[0],[bsAuto]],
					picklist:[[0],[new portalui_arrayMap({items:["APP","NON"]})]],
					autoAppend:false,defaultRow:1,dblClick:[this,"doDoubleClick4"]});
		this.sgn4 = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg4,pager:[this,"doPager4"]});

		this.sg3 = new portalui_saiGrid(this.pc2.childPage[1],{bound:[0,5,this.pc2.width-5,this.pc2.height-35],colCount:2,
					colTitle:["ID TCash","Nilai"],
					colWidth:[[1,0],[150,200]],
					colFormat:[[1],[cfNilai]],
					autoPaging:true,rowPerPage:20, 
					readOnly:true, defaultRow:1
					});							
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[0,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3, grid:this.sg1, pager:[this,"doPager1"]});		
		this.bLoadCD = new portalui_button(this.sgn3,{bound:[880,1,80,18],caption:"Data Tcash",click:[this,"doLoadCD"]});	
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);		

		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);

		setTipeButton(tbAllFalse);
		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan=1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);

			this.cb_adm.setSQL("select kode_akun, nama from masakun where kode_lokasi = '"+this.app._lokasi+"' ",["kode_akun","nama"],false,["Kode akun","Nama"],"and","Data Akun Kas Bank",true);
			this.cb_kb.setSQL("select kode_akun, nama from masakun ",["kode_akun","nama"],false,["Kode akun","Nama"],"and","Data Akun Kas Bank",true);

			var data = this.dbLib.getDataProvider("select flag from spro where kode_spro ='ADMTC' and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line = data.rs.rows[0];																	
				this.cb_adm.setText(line.flag);							
			}	

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_produk_fRekonTcash.extend(window.childForm);
window.app_saku3_transaksi_produk_fRekonTcash.implement({
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
	doLoadCD: function(sender,totalRow){
		try {
			var strSQL = "select id_tcash,nilai from ktu_tcash_d where no_rekon ='-' and kode_lokasi='"+this.app._lokasi+"' ";								
			var data1 = this.dbLib.getDataProvider(strSQL,true);	
			
			if (typeof data1 == "object" && data1.rs.rows[0] != undefined){
				this.dataJU1 = data1;
				this.sgn3.setTotalPage(Math.ceil(data1.rs.rows.length/20));
				this.sgn3.rearrange();
				this.doTampilData1(1);				
								
			} else this.sg1.clear(1);	
											
		} catch(e) {alert(e);}
	},
	doTampilData1: function(page) {
		this.sg3.clear();
		var line1;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU1.rs.rows.length? this.dataJU1.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line1 = this.dataJU1.rs.rows[i];		
			this.sg3.appendData([line1.id_tcash,floatToNilai(line1.nilai)]);		
		}
		this.sg3.setNoUrut(start);
	},
	doPager1: function(sender, page) {
		this.doTampilData1(page);
	},
	doRekon: function(sender){				
		try {
			var nilaiSelisih = 0;
			var totNS = 0;
			for (var j=0;j < this.dataJU1.rs.rows.length;j++){
				for (var i=0; i < this.dataJU4.rs.rows.length;i++){
					if (this.dataJU4.rs.rows[i].id_tcash == this.dataJU1.rs.rows[j].id_tcash) {
						this.dataJU4.rs.rows[i].stsapp = "APP";	
						this.sg4.cells(0,i,"APP");

						nilaiSelisih = parseFloat(this.dataJU4.rs.rows[i].nilai) - parseFloat(this.dataJU1.rs.rows[j].nilai);
						this.sg4.cells(7,i,nilaiSelisih);
						totNS += nilaiSelisih;
						this.dataJU4.rs.rows[i].nilaiSelisih = nilaiSelisih;
					}
				}																			
			}
			this.e_adm.setText(totNS);		
		}
		catch(e) {
			alert(e);
		}
	},
	simpan: function(){			
		try{				
			if (this.stsSimpan == 1) this.doClick(this.i_gen);		
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try{
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();	
					if(this.stsSimpan == 0){
						sql.add("delete from ktu_tcash_m where no_bukti_t = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
						sql.add("update ktu_nota set no_bukti_t ='-' where no_bukti_t='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("update ktu_tcash_d set no_rekon ='-', nilai_selisih = 0 where no_bukti_t='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from trans_m where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from trans_j where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					}		
												
					sql.add("insert into ktu_tcash_m(no_bukti_t,tanggal,kb,ket,total,nilai_adm,periode,kode_lokasi,akun_adm) values "+
						    "('"+this.e_nb.getText()+"','"+this.dp_d1.getDateString()+"','"+this.cb_kb.getText()+"','"+this.e_ket.getText()+"','"+nilaiToFloat(this.e_total.getText())+"','"+nilaiToFloat(this.e_adm.getText())+"','"+this.e_periode.getText()+"','"+this.app._lokasi+"','"+this.cb_adm.getText()+"')");
					
					sql.add("insert into trans_m (no_bukti,kode_lokasi,tgl_input,nik_user,periode,modul,form,posted,prog_seb,progress,tanggal,no_dokumen,keterangan,kode_curr,kurs,nilai1,nilai2,nilai3,nik1,nik2,nik3,no_ref1,no_ref2,no_ref3, param1,param2,param3) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','KB','SLSTCASH','F','-','-','"+this.dp_d1.getDateString()+"','-','"+this.e_ket.getText()+"','IDR',1,"+
							parseNilai(this.e_total.getText())+","+parseNilai(this.e_adm.getText())+",0,'-','-','-','-','-','-', '-','-','-')");
					
					var line;
					for (var i=0;i < this.dataJU4.rs.rows.length;i++){
						line = this.dataJU4.rs.rows[i];
						if (line.stsapp.toUpperCase()=="APP"){
							sql.add("update ktu_nota set no_bukti_t='"+this.e_nb.getText()+"' where no_bukti='"+line.no_bukti+"' and kode_lokasi='"+this.app._lokasi+"'");
							
							sql.add("update ktu_tcash_d set no_rekon='"+this.e_nb.getText()+"', nilai_selisih = "+line.nilaiSelisih+" where id_tcash = '"+line.id_tcash+"' and kode_lokasi='"+this.app._lokasi+"'");
							
							sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
									"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','-','"+this.dp_d1.getDateString()+"',0,'"+line.akun_piutang+"','C',"+nilaiToFloat(line.nilai)+","+
									nilaiToFloat(line.nilai)+",'Pembayaran Piutang TCASH Nota : "+line.no_bukti+"','KB','PIU-B','IDR',1,'"+this.app._kodePP+"','-','-','-','-','"+line.no_bukti+"','-','-','-')");
						}
					}
					
					sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','-','"+this.dp_d1.getDateString()+"',0,'"+this.cb_kb.getText()+"','D',"+nilaiToFloat(this.e_kas.getText())+","+
							nilaiToFloat(this.e_kas.getText())+",'Pembayaran Piutang TCASH Nota : "+line.no_bukti+"','KB','KB','IDR',1,'"+this.app._kodePP+"','-','-','-','-','-','-','-','-')");										
					
					if (this.e_adm.getText() != "0") {
						sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
								"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','-','"+this.dp_d1.getDateString()+"',1,'"+this.cb_adm.getText()+"','D',"+nilaiToFloat(this.e_adm.getText())+","+
								nilaiToFloat(this.e_adm.getText())+",'Pembayaran Piutang TCASH Nota : "+line.no_bukti+"','KB','ADM','IDR',1,'"+this.app._kodePP+"','-','-','-','-','-','-','-','-')");															
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
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12){
			this.e_periode.setText(y+""+m);			
		}
		else {
			this.e_periode.setText(this.app._periode);					
		}			
		if (this.stsSimpan == 1) {
			this.doClick(this.i_gen);
		}
	},
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event){
			case "clear" :
				if (modalResult == mrOk) this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
				setTipeButton(tbSimpan);
				this.pc1.setActivePage(this.pc1.childPage[0]);
				this.stsSimpan=1;
				this.doClick(this.i_gen);
				this.sg1.clear(1);	
				this.sg4.clear(1);	
				this.bTampil.show();
				this.i_bAll.show();
				break;
			case "simpan" :	
			case "ubah" :
				this.preView = "1";
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);																	
				if (nilaiToFloat(this.e_total.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai total tidak boleh 0 atau kurang.");
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
				else 
				this.simpan();
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
					sql.add("delete from ktu_tcash_m where no_bukti_t = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
					sql.add("update ktu_nota set no_bukti_t ='-' where no_bukti_t='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						
					sql.add("delete from trans_m where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from trans_j where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);
				}
				break;				
		}
	},
	doClick:function(sender){
		if (sender == this.i_gen) {
			if (this.stsSimpan == 0) {
				this.bTampil.show();
				this.i_bAll.show();
				this.e_total.setText("0");
				this.e_adm.setText("0");
			}
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"trans_m","no_bukti",this.app._lokasi+"-BM"+this.e_periode.getText().substr(2,4)+".","0000"));
			this.stsSimpan=1;
			setTipeButton(tbSimpan);	
			this.e_ket.setFocus();
			setTipeButton(tbSimpan);
		}
		if (sender == this.i_bAll) {
			for (var i = 0;i < this.dataJU4.rs.rows.length;i++){
				this.dataJU4.rs.rows[i].stsapp = "APP";		
				this.sg4.cells(0,i,"APP");		
			}	
		}
	},
	
	doChange: function(sender){	
		if ((sender == this.e_total || sender == this.e_adm) && this.e_total.getText()!="" && this.e_adm.getText()!="") {
			var kb = nilaiToFloat(this.e_total.getText()) - nilaiToFloat(this.e_adm.getText());
			//var kb = nilaiToFloat(this.e_total.getText()) - nilaiToFloat(this.e_adm.getText());
			this.e_kas.setText(floatToNilai(kb));
		}
	},	
	
	doCari:function(sender){								
		this.pc1.setActivePage(this.pc1.childPage[0]);
		var strSQL = "select 'NON' as stsapp, a.no_bukti, a.id_tcash, a.tanggal, a.kode_tenan+' | '+b.nama as tenan,a.nilai, a.no_ba, c.akun_piutang, 0 as nilaiSelisih "+
					 "from  ktu_nota a "+
					 "inner join ktu_tenan b on a.kode_tenan = b.kode_tenan and a.kode_lokasi=b.kode_lokasi "+
					 "inner join ktu_kantin c on b.kode_kantin = c.kode_kantin and b.kode_lokasi=c.kode_lokasi "+
					 "where a.status='TCASH' and a.no_bukti_t ='-' and a.no_ba <> '-' and a.kode_lokasi='"+this.app._lokasi+"'";	
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU4 = data;
			this.sgn4.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn4.rearrange();
			this.doTampilData4(1);
		} else this.sg4.clear(1);
	},
	doTampilData4: function(page) {
		this.sg4.clear();
		var line2;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU4.rs.rows.length? this.dataJU4.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line2 = this.dataJU4.rs.rows[i];													
			this.sg4.appendData([line2.stsapp.toUpperCase(),line2.no_ba,line2.id_tcash,line2.no_bukti,line2.tanggal,line2.tenan,floatToNilai(line2.nilai),line2.nilaiSelisih]); 
		}
		this.sg4.setNoUrut(start);
	},
	doPager4: function(sender, page) {
		this.doTampilData4(page);
	},		
	doChangeCell: function(sender, col, row){		
		if (col == 0 ){
			this.dataJU4.rs.rows[((this.page-1)*20) + row].stsapp = this.sg4.cells(0,row);
			this.sg4.validasi();
		}
	},
	doDoubleClick4: function(sender, col , row) {
		if(this.sg4.cells(0,row) == "NON") this.sg4.cells(0,row,"APP");
		else this.sg4.cells(0,row,"NON");
	},
	doNilaiChange: function(){
		var tot = 0;
			for (var i = 0;i < this.dataJU4.rs.rows.length;i++){
				var line = this.dataJU4.rs.rows[i];	
				if(line.stsapp.toUpperCase() == "APP"){		
					tot += parseFloat(line.nilai);
				}	
			}			
		this.e_total.setText(floatToNilai(tot));			
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							if (this.preView == "1") {								
								this.nama_report="server_report_saku3_kantintu_rptTcash";
								this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_bukti='"+this.e_nb.getText()+"' ";
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
						}
						else {													
							if (result.toLowerCase().search("primary key") == -1){
								alert(error);
							}
							else this.simpan();						   						
						}
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
			this.pc1.setActivePage(this.pc1.childPage[0]);
			this.stsSimpan=1;
			this.doClick(this.i_gen);			
			setTipeButton(tbSimpan);
			this.sg1.clear(1);	
			this.sg4.clear(1);	
			this.bTampil.show();
			this.i_bAll.show();
		} catch(e) {
			alert(e);
		}
	},
	doLoad:function(sender){						
		var strSQL = "select no_bukti_t, ket,total - nilai_adm as kb from ktu_tcash_m a inner join trans_m b on a.no_bukti_t=b.no_bukti and a.kode_lokasi=b.kode_lokasi where b.kode_lokasi='"+this.app._lokasi+"' and b.posted='F' and b.periode='"+this.e_periode.getText()+"' ";		
		var data = this.dbLib.getDataProvider(strSQL,true);		
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn1.rearrange();
			this.doTampilData(1);
		} else this.sg1.clear(1);			
	},
	doTampilData: function(page) {
		this.sg1.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];													
			this.sg1.appendData([line.no_bukti_t,line.ket,floatToNilai(line.kb)]); 
		}
		this.sg1.setNoUrut(start);
	},
	doPager: function(sender, page){
		this.doTampilData(page);
	},
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg1.cells(0,row) != "") {			
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;
				this.pc1.setActivePage(this.pc1.childPage[0]);														
				this.e_nb.setText(this.sg1.cells(0,row));
				this.bTampil.hide();
				this.i_bAll.hide();

				var strSQL = "select ket,kb,total,nilai_adm from ktu_tcash_m where no_bukti_t ='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.e_ket.setText(line.ket);	
						this.cb_kb.setText(line.kb);	
						this.e_total.setText(floatToNilai(line.total));	
						this.e_adm.setText(floatToNilai(line.nilai_adm));							
					}
				}
				var strSQL = "select 'APP' as stsapp, a.no_bukti, a.id_tcash, a.tanggal, a.kode_tenan+' | '+b.nama as tenan,a.nilai, a.no_ba, c.akun_piutang "+
						 	 "from  ktu_nota a "+
							 "inner join ktu_tenan b on a.kode_tenan = b.kode_tenan and a.kode_lokasi=b.kode_lokasi "+
							 "inner join ktu_kantin c on b.kode_kantin = c.kode_kantin and b.kode_lokasi=c.kode_lokasi "+
							 "where a.no_bukti_t ='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";	
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU4 = data;
					this.sgn4.setTotalPage(Math.ceil(data.rs.rows.length/20));
					this.sgn4.rearrange();
					this.doTampilData4(1);
				} else this.sg4.clear(1);
			}
		} catch(e) {alert(e);}
	}
});

window.app_saku3_transaksi_sju16_fVer = function(owner)
{
	if (owner)
	{		
		window.app_saku3_transaksi_sju16_fVer.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_sju16_fVer";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Verifikasi", 0);	
		
		uses("saiCB;saiMemo;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");		
		uses("saiCBBL",true);
		
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,200,20],caption:"Periode",tag:2,readOnly:true,visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,98,18],selectDate:[this,"doSelectDate"]});		

		this.pc1 = new pageControl(this,{bound:[10,18,1000,440], childPage:["Daftar Bukti","Verifikasi","Item Pajak","Filter Data"]});		
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:12,tag:0,
		            colTitle:["Detail","No PB","Status","Tgl PB","Kode PP","Deskripsi","Kurs","Nilai","No Ver","Kode Curr","Due Date","Nilai Curr"],
					colWidth:[[11,10,9,8,7,6,5,4,3,2,1,0],[100,100,80,100,100,80,200,70,80,80,100,80]],
					colFormat:[[0,7],[cfButton,cfNilai]],
					colHide:[[9,10,11],true],
					click:[this,"doSgBtnClick1"], colAlign:[[0],[alCenter]],
					dblClick:[this,"doDoubleClick"],				
					readOnly:true,autoAppend:false,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});
				
		this.e_nb = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,200,20],caption:"No Verifikasi", readOnly:true,visible:false});	
		this.e_npb = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,200,20],caption:"No PB", readOnly:true});					
		this.e_tgl = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,10,200,20],caption:"Tgl PB", maxLength:50,readOnly:true});						
		this.e_tgl2 = new saiLabelEdit(this.pc1.childPage[1],{bound:[790,10,200,20],caption:"Due Date", maxLength:50,readOnly:true});		
	
		this.e_ket = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,11,450,20],caption:"Deskripsi", maxLength:150});				
		this.e_totalCurr = new saiLabelEdit(this.pc1.childPage[1],{bound:[790,11,200,20],caption:"Total [Curr]", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});						
		this.c_curr = new saiCB(this.pc1.childPage[1],{bound:[20,20,155,20],caption:"Mt Uang - Kurs",readOnly:true,tag:2,change:[this,"doChange"]});
		this.e_kurs = new saiLabelEdit(this.pc1.childPage[1],{bound:[180,20,40,20],caption:"Kurs", tag:2, labelWidth:0, tipeText:ttNilai, readOnly:true, text:"1",change:[this,"doChange"]});				
		this.e_total = new saiLabelEdit(this.pc1.childPage[1],{bound:[790,20,200,20],caption:"Total [IDR]", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});	

		this.sg1 = new saiGrid(this.pc1.childPage[1],{bound:[1,16,this.pc1.width-5,307],colCount:8,tag:9,
		            colTitle:["Kode Akun","Nama Akun ","DC","Keterangan","Nilai","Kode PP","Nama PP","Status"],
					colWidth:[[7,6,5,4,3,2,1,0],[80,200,80,100,200,50,150,100]],					
					readOnly:true,colFormat:[[4],[cfNilai]],
					buttonStyle:[[7],[bsAuto]],checkItem:true,
					picklist:[[7],[new portalui_arrayMap({items:["FISKAL","NON"]})]],
					change:[this,"doChangeCell1"],nilaiChange:[this,"doNilaiChange1"],
					autoAppend:false,defaultRow:1});
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager1"]});					
		
		this.cb_ver = new saiCBBL(this.pc1.childPage[2],{bound:[20,11,220,20],caption:"NIK Verifikator", multiSelection:false, maxLength:10, tag:2});
		this.e_totPajak = new saiLabelEdit(this.pc1.childPage[2],{bound:[790,11,200,20],caption:"Total Pajak", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});								
		
		this.sgv = new saiGrid(this.pc1.childPage[2],{bound:[1,5,this.pc1.width-5,this.pc1.height-64],colCount:7,tag:9,
		            colTitle:["Kode Pajak","Nama Pajak","Kode Akun","DC","% Pajak","DPP","Pajak"],
					colWidth:[[6,5,4,3,2,1,0],[100,100,80,80,100,300,100]],					
					columnReadOnly:[true,[1,2,3,5,6],[0,4]],
					buttonStyle:[[0],[bsEllips]], 
					colFormat:[[4,5,6],[cfNilai,cfNilai,cfNilai]],					
					ellipsClick:[this,"doEllipsClick"],change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],
					autoAppend:true,defaultRow:1});
		this.sgnv = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sgv});		
		
		this.cb_nb = new saiCBBL(this.pc1.childPage[3],{bound:[20,12,220,20],caption:"No Bukti", multiSelection:false, maxLength:20, tag:9,change:[this,"doChange"]});
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);	
		this.pc1.childPage[2].rearrangeChild(10, 23);	
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
			
			var sql = new server_util_arrayList();
			sql.add("select a.kode_pajak,a.nama from sju_pajak_ref a where a.kode_lokasi = '"+this.app._lokasi+"'");												
			this.dbLib.getMultiDataProviderA(sql);			
			
			this.cb_ver.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);
			this.cb_ver.setText(this.app._userLog);

			this.cb_nb.setSQL("select a.no_pb,a.keterangan from sju_pb_m a where a.no_ver <> '-' and a.kode_lokasi='"+this.app._lokasi+"'",["no_pb","keterangan"],false,["No PB","Deskripsi"],"and","Data PB",true);

		}catch(e){
			systemAPI.alert(e);
		}		
	}
};
window.app_saku3_transaksi_sju16_fVer.extend(window.childForm);
window.app_saku3_transaksi_sju16_fVer.implement({	
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
					
					if(this.stsSimpan == 0){					
						sql.add("delete from sju_pb_j where no_pb='"+this.e_npb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and jenis='VER' ");
						sql.add("update sju_pb_m set no_ver='-', nilai="+nilaiToFloat(this.e_total.getText())+",nilai_curr="+nilaiToFloat(this.e_totalCurr.getText())+" where no_pb='"+this.e_npb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");

						sql.add("update a set no_verseb ='"+this.e_nb.getText()+"' "+
								"from sju_ver_m a inner join sju_ver_d b on a.no_ver=b.no_ver and a.kode_lokasi=b.kode_lokasi and a.no_verseb='-' "+
								"where b.no_bukti ='"+this.e_npb.getText()+"' and b.modul='PBBAU' and b.kode_lokasi='"+this.app._lokasi+"'");

						sql.add("delete from sju_fiskal_d where no_fiskal='"+this.e_npb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					}

					
					var vStatus = "3";								
					sql.add("insert into sju_ver_m (no_ver,kode_lokasi,tanggal,periode,tgl_input,nik_user,status,modul,no_dokumen,no_verseb) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"','"+this.e_periode.getText()+"',getdate(),'"+this.app._userLog+"','"+vStatus+"','PBBAU','"+this.e_npb.getText()+"','-')");

					sql.add("insert into sju_ver_d (no_ver,status,modul,no_bukti,kode_lokasi,catatan) values "+
						    "('"+this.e_nb.getText()+"','"+vStatus+"','PBBAU','"+this.e_npb.getText()+"','"+this.app._lokasi+"','-')");
												
					//---------------- flag bukti					
				
					var total = nilaiToFloat(this.e_total.getText()) + (nilaiToFloat(this.e_totPajak.getText()) * nilaiToFloat(this.e_kurs.getText()));
					var totalCurr = nilaiToFloat(this.e_totalCurr.getText()) + nilaiToFloat(this.e_totPajak.getText());
					sql.add("update sju_pb_m set progress='"+vStatus+"', no_ver='"+this.e_nb.getText()+"', nilai="+total+",nilai_curr="+totalCurr+" where no_pb='"+this.e_npb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	

					if (vStatus == "3") {
						if (this.sgv.getRowValidCount() > 0){
							for (var i=0;i < this.sgv.getRowCount();i++){
								if (this.sgv.rowValid(i)){										
									var nilaiIDR= nilaiToFloat(this.sgv.cells(6,i))*nilaiToFloat(this.e_kurs.getText());

									sql.add("insert into sju_pb_j(no_pb,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai_curr,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs,nilai) values "+
											"('"+this.e_npb.getText()+"','-','"+this.dp_d1.getDateString()+"',"+i+",'"+this.sgv.cells(2,i)+"','"+this.sgv.cells(0,i)+"-"+this.sgv.cells(1,i)+"','"+this.sgv.cells(3,i)+"',"+nilaiToFloat(this.sgv.cells(6,i))+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','PBBAU','VER','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'"+this.c_curr.getText()+"',"+nilaiToFloat(this.e_kurs.getText())+","+nilaiIDR+")");									
									sql.add("insert into sju_ver_j(no_ver,tanggal,no_urut,kode_pajak,dc,nilai_pajak,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs,nilai_idr,nik_ver) values "+
											"('"+this.e_nb.getText()+"','"+this.dp_d1.getDateString()+"',"+i+",'"+this.sgv.cells(0,i)+"','"+this.sgv.cells(3,i)+"',"+nilaiToFloat(this.sgv.cells(6,i))+",'"+this.app._lokasi+"','PBBAU','VER','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'"+this.c_curr.getText()+"',"+nilaiToFloat(this.e_kurs.getText())+","+nilaiIDR+",'"+this.cb_ver.getText()+"')");
								}
							}
						}
					}

					if (this.sg1.getRowValidCount() > 0){
						var tglPB = "";
						for (var i=0;i < this.sg1.getRowCount();i++){
							if (this.sg1.rowValid(i) && this.sg1.cells(7,i) == "NON"){		
								tglPB = this.e_tgl.getText().substr(6,4)+"-"+this.e_tgl.getText().substr(3,2)+"-"+this.e_tgl.getText().substr(0,2); 								
								sql.add("insert into sju_fiskal_d(no_fiskal,no_bukti, kode_lokasi,  tanggal, deskripsi, dc,nilai, kode_pp,no_urut,kode_akun) values "+
										"('"+this.e_nb.getText()+"','"+this.e_npb.getText()+"', '"+this.app._lokasi+"',  '"+tglPB+"', '"+this.sg1.cells(3,i)+"', '"+this.sg1.cells(2,i)+"',"+nilaiToFloat(this.sg1.cells(4,i))+", '"+this.sg1.cells(5,i)+"',"+i+",'"+this.sg1.cells(0,i)+"')");
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
	doSgBtnClick1: function(sender, col, row){
		try{
			if (col === 0) this.doDoubleClick(this.sg1,0,row);						
		}catch(e){
			alert(e);
		}
	},
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event){
			case "clear" :
				if (modalResult == mrOk)
					this.standarLib.clearByTag(this, new Array("0","1","9"),this.e_nb);
					this.sg1.clear(1); this.sgv.clear(1);
					this.doClick();
					this.doLoad();					
					this.pc1.setActivePage(this.pc1.childPage[0]);	
					setTipeButton(tbAllFalse);
				break;
			case "simpan" :	
			case "ubah" :					
				this.preView = "1";				
			
				if (nilaiToFloat(this.e_total.getText()) <= 0) {				
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
				sql.add("delete from sju_ver_m where no_ver='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("delete from sju_ver_d where no_ver='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("delete from sju_pb_j where no_pb='"+this.e_npb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and jenis='VER' ");
				sql.add("delete from sju_ver_j where no_ver='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and jenis='VER' ");

				sql.add("update sju_pb_m set no_ver='-', nilai="+nilaiToFloat(this.e_total.getText())+",nilai_curr="+nilaiToFloat(this.e_totalCurr.getText())+" where no_pb='"+this.e_npb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("delete from sju_fiskal_d where no_fiskal='"+this.e_npb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
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
		
		if (sender == this.cb_nb && this.cb_nb.getText() != "") {		
								
				var strSQL = "select a.due_date,a.no_pb,'APPROVE' as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.due_date,103) as due_date,a.kurs,a.kode_curr,a.modul,b.kode_pp+' - '+b.nama as pp,'-' as no_dokumen,a.keterangan,a.nilai,a.nilai_curr,c.nik+' - '+c.nama as pembuat,a.no_ver,a.kode_lokasi,convert(varchar,a.tgl_input,120) as tglinput,b.kode_pp "+
							 "from sju_pb_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
							 "                inner join karyawan c on a.nik_user=c.nik and a.kode_lokasi=c.kode_lokasi "+
							 "where a.no_pb='"+this.cb_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' ";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU = data;
					this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
					this.sgn.rearrange();
					this.doTampilData(1);
				} else this.sg.clear(1);								
			
			
			this.pc1.setActivePage(this.pc1.childPage[0]);				
		}
		
	},
	doClick:function(sender){		
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"sju_ver_m","no_ver",this.app._lokasi+"-SPB"+this.e_periode.getText().substr(2,4)+".","0000"));												
		this.e_npb.setFocus();								
	},		
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg.cells(0,row) != "") {			
				this.pc1.setActivePage(this.pc1.childPage[1]);											
				
				this.e_npb.setText(this.sg.cells(1,row));								
				this.e_tgl.setText(this.sg.cells(3,row));
				this.e_tgl2.setText(this.sg.cells(10,row));
				this.e_ket.setText(this.sg.cells(5,row));
				this.c_curr.setText(this.sg.cells(9,row));
				this.e_kurs.setText(this.sg.cells(6,row));
				this.e_totalCurr.setText(this.sg.cells(11,row));
				this.e_total.setText(this.sg.cells(7,row));												
				this.doLoadDet();
				
				if (this.sg.cells(2,row) == "INPROG") {
					setTipeButton(tbSimpan);
					this.stsSimpan = 1;
				}
				else {
					this.e_nb.setText(this.sg.cells(8,row));
					setTipeButton(tbUbahHapus);
					this.stsSimpan = 0;
					this.doLoadPjk();
				}
				
			}
		} catch(e) {alert(e);}
	},		
	doLoadDet:function(){
		var strSQL1 = "select a.kode_akun, b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp "+
					  "from sju_pb_j a "+
					  "inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
					  "inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+					  
					  "where a.no_pb ='"+this.e_npb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.jenis <> 'VER' ";
		var data = this.dbLib.getDataProvider(strSQL1,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;
			this.sg1.clear();
			for (var i in data.rs.rows){
				line = data.rs.rows[i];																		
				this.sg1.appendData([line.kode_akun,line.nama_akun,line.dc,line.keterangan,floatToNilai(line.nilai),line.kode_pp,line.nama_pp,"FISKAL"]);
			}
		} else this.sg1.clear(1);													
	},
	doLoadPjk:function(){		
		var strSQL1 = "select a.kode_pajak, a.nik_ver,b.nama as nama_pajak,b.kode_akun,a.dc,b.persen,a.nilai_pajak "+
					  "from sju_ver_j a "+
					  "inner join sju_pajak_ref b on a.kode_pajak=b.kode_pajak and a.kode_lokasi=b.kode_lokasi "+
					  "where a.no_ver ='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.jenis = 'VER' ";

		var data = this.dbLib.getDataProvider(strSQL1,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;
			this.sgv.clear();
			for (var i in data.rs.rows){
				line = data.rs.rows[i];					
				this.sgv.appendData([line.kode_pajak,line.nama_pajak,line.kode_akun,line.dc,line.persen,this.e_total.getText(),floatToNilai(line.nilai_pajak)]);				
			}
		} else this.sgv.clear(1);													
		this.cb_ver.setText(line.nik_ver);
	},
	doLoad:function(sender){	
		try {					
			var strSQL = "select case when no_ver ='-' then 'INPROG' else 'APPROVE' end as status, no_pb, convert(varchar,tanggal,103) as tgl,kode_pp,keterangan, nilai,kode_curr,kurs,no_ver,nilai_curr,due_date "+
						 "from sju_pb_m "+
						 "where kode_lokasi='11' and progress='0' and no_ver='-' and modul='PB' and no_kas='-' ";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn.rearrange();
				this.doTampilData(1);
			} else this.sg.clear(1);
		}
		catch(e) {
			alert(e);
		}							
	},							
	doTampilData: function(page) {
		this.sg.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];																			
			this.sg.appendData(["Detail",line.no_pb,line.status.toUpperCase(),line.tgl,line.kode_pp,line.keterangan,line.kurs,floatToNilai(line.nilai),line.no_ver,line.kode_curr,line.due_date,floatToNilai(line.nilai_curr)]); 
		}
		this.sg.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},	
	doChangeCell: function(sender, col, row){
		if (col == 4 && this.sgv.cells(4,row) != "") {
			this.sgv.cells(5,row,nilaiToFloat(this.e_total.getText()));			
			var pjk= nilaiToFloat(this.e_total.getText()) * nilaiToFloat(this.sgv.cells(4,row)) / 100;
			this.sgv.cells(6,row,pjk);
			this.sgv.validasi();
		}
		
		sender.onChange.set(undefined,undefined);	    		
		if (col == 0) {
			if (sender.cells(0,row) != "") {				
				var pajak = this.dataPajak.get(sender.cells(0,row));				
				if (pajak) {
					sender.cells(1,row,pajak);

					var strSQL = "select a.nama, a.kode_akun, a.dc, a.persen from sju_pajak_ref a "+
								 "where a.kode_pajak = '"+this.sgv.cells(0,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'";
					var data = this.dbLib.getDataProvider(strSQL,true);

					if (typeof data == "object" && data.rs.rows[0] != undefined){
						var line = data.rs.rows[0];																			
						this.sgv.cells(2,row,line.kode_akun);
						this.sgv.cells(3,row,line.dc);
						this.sgv.cells(4,row,line.persen);
						this.sgv.cells(5,row,nilaiToFloat(this.e_total.getText()));

						var pjk= nilaiToFloat(this.e_total.getText()) * line.persen / 100;
						this.sgv.cells(6,row,pjk);
					}
					this.sgv.validasi();
				}
				else {
					if (trim(sender.cells(0,row)) != "") system.alert(this,"Kode Pajak "+sender.cells(0,row)+" tidak ditemukan","Inputkan kode lainnya.","checkPajak");                
					sender.cells(0,row,"");
					sender.cells(1,row,"");
				}				
			}
		}						
		sender.onChange.set(this,"doChangeCell");		
	},
	doNilaiChange: function(){		
		try{
			var totPajak = 0;
			for (var i = 0; i < this.sgv.getRowCount();i++){
				if (this.sgv.rowValid(i) && this.sgv.cells(6,i) != ""){
					if (this.sgv.cells(3,i).toUpperCase() == "D") totPajak += nilaiToFloat(this.sgv.cells(6,i));
					if (this.sgv.cells(3,i).toUpperCase() == "C") totPajak -= nilaiToFloat(this.sgv.cells(6,i));
				}
			}			
			this.e_totPajak.setText(floatToNilai(totPajak));
			
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}		
	},
	doNilaiChange1: function(){		
		try{
			var tot = 0;

			for (var i = 0; i < this.sg1.getRowCount();i++){
				if (this.sg1.rowValid(i) && this.sg1.cells(4,i) != ""){
					if (this.sg1.cells(2,i).toUpperCase() == "D") tot += nilaiToFloat(this.sg1.cells(4,i));
					if (this.sg1.cells(2,i).toUpperCase() == "C") tot -= nilaiToFloat(this.sg1.cells(4,i));
				}
			}
			this.e_totalCurr.setText(floatToNilai(tot));	
			this.e_total.setText(floatToNilai(tot * nilaiToFloat(this.e_kurs.getText())));			
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}		
	},
	doEllipsClick: function(sender, col, row){
		try{			
			if (col == 0){
				this.standarLib.showListData(this, "Daftar Akun",sender,undefined, 
						"select a.kode_pajak,a.nama from sju_pajak_ref a where a.kode_lokasi = '"+this.app._lokasi+"'",
						"select count(a.kode_pajak) from sju_pajak_ref a where a.kode_lokasi = '"+this.app._lokasi+"'",
						["a.kode_pajak","a.nama"],"and",["Kode","Nama"],false);		
				
			}								
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){							
							if (this.preView == "1") {
								this.nama_report="server_report_saku3_spm_rptSpbForm";									                  
								this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_app='"+this.e_nb.getText()+"' ";
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
							this.dataPajak = new portalui_arrayMap();							
													
							if (result.result[0]){	    			        
								var line;
								for (var i in result.result[0].rs.rows){
									line = result.result[0].rs.rows[i];
									this.dataPajak.set(line.kode_pajak, line.nama);
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
			this.sg1.clear(1); this.sgv.clear(1); 
			this.doClick();
			this.doLoad();					
			this.pc1.setActivePage(this.pc1.childPage[0]);				
			setTipeButton(tbAllFalse);
		} catch(e) {
			alert(e);
		}
	}
});


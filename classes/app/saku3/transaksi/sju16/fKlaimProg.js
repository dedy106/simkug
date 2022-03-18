window.app_saku3_transaksi_sju16_fKlaimProg = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_sju16_fKlaimProg.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_sju16_fKlaimProg";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Update Status Klaim", 0);	
		
		uses("saiCB;saiMemo;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");		
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,visible:false});		
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal Update", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 		
		
		this.pc1 = new pageControl(this,{bound:[10,18,1000,430], childPage:["List Klaim","Detail Klaim","Data Pendukung","Filter Cari"]});
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:18,tag:0,
		            colTitle:["No Klaim","Status","Progress","Tgl Klaim","Nilai Estimasi","No Polis","Keterangan","Penanggung","Tertanggung","COB","No Berkas","DOL","Lokasi","Penyebab","Object Of Loss","No Register","Tgl Diketahui","COB"],
					colWidth:[[17,16,15,14,13,12,11,10,9, 8,7,6,5,4,3,2,1,0],[80,100,100,100,200,100,200,70,100, 200,200,200,200,100,100,150,100,100]],
					readOnly:true,colFormat:[[4],[cfNilai]],
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});
		
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"No Verifikasi",maxLength:30,readOnly:true,visible:false});		
		
		//this.c_status = new saiCB(this.pc1.childPage[1],{bound:[20,10,250,20],caption:"Status",items:["OUTSTANDING","SETTLED","UNDERDEDUCTIBLE","NOCLAIM"], readOnly:true,tag:2,change:[this,"doChange"]});
		//this.c_progress = new saiCB(this.pc1.childPage[1],{bound:[20,11,250,20],caption:"Progress",items:["LAPORAN AWAL","KELENGKAPAN DOKUMEN","PROPOSED ADJUSTMENT","KONFIRMASI","DISCHARGE FORM","-"], readOnly:true,tag:2,change:[this,"doChange"]});
		
		this.c_status = new saiCB(this.pc1.childPage[1],{bound:[20,10,250,20],caption:"Status",tag:2,mustCheck:true,change:[this,"doChange"]});		
		this.c_progress = new saiCBBL(this.pc1.childPage[1],{bound:[20,11,220,20],caption:"Progress", multiSelection:false, maxLength:10, tag:2 });		

		this.e_memo = new saiMemo(this.pc1.childPage[1],{bound:[20,20,450,80],caption:"Keterangan Status",tag:9});
		
		this.e_noklaim = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,14,250,20],caption:"No Klaim", readOnly:true});
		this.e_tglklaim = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,14,200,20],caption:"Tanggal Klaim", readOnly:true});				
		this.e_berkas = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,16,450,20],caption:"No Dok/Berkas", readOnly:true});
		this.e_lokasi = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,16,450,20],caption:"Lokasi Kejadian", readOnly:true});		
		this.e_dok = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,15,450,20],caption:"No Polis", readOnly:true});		
		this.e_nopolis = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,15,200,20],caption:"No Register", readOnly:true});				
		this.e_png = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,450,20],caption:"Penanggung", readOnly:true});		
		this.e_ttg = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,12,450,20],caption:"Tertanggung", readOnly:true});		
		this.e_tipe = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,450,20],caption:"COB", readOnly:true});
		//this.e_tgldol = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,13,200,20],caption:"Date Of Loss", readOnly:true});				
		this.l_tgldol = new portalui_label(this.pc1.childPage[1],{bound:[520,13,100,18],caption:"Date Of Loss", underline:true});
		this.e_tgldol = new portalui_datePicker(this.pc1.childPage[1],{bound:[620,13,100,18]}); 		
		
		this.e_tgltahu = new saiLabelEdit(this.pc1.childPage[1],{bound:[770,13,200,20],caption:"Tanggal Diketahui", readOnly:true});	
		this.e_oblos = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,14,450,20],caption:"Object Of Loss", readOnly:true});
		this.e_sebab = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,18,450,20],caption:"Penyebab Kerugian", readOnly:true});
		this.e_nilai = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,15,200,20],caption:"Nilai Estimasi", tipeText:ttNilai, text:"0"});				
		this.e_nego = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,16,200,20],caption:"Nilai Adjusment",  tipeText:ttNilai, text:"0"});		
		this.l_tgl2 = new portalui_label(this.pc1.childPage[1],{bound:[20,11,100,18],caption:"Tgl Adjustment", underline:true});
		this.dp_d2 = new portalui_datePicker(this.pc1.childPage[1],{bound:[120,11,98,18]}); 				
		this.e_deduc = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,17,200,20],caption:"Nilai Deductible",  tipeText:ttNilai, text:"0"});				
		
		this.c_stsdok = new saiCB(this.pc1.childPage[2],{bound:[20,10,200,20],caption:"Status Dokumen",items:["BELUM","LENGKAP"], readOnly:true,tag:2,change:[this,"doChange"]});		
		this.l_tgl4 = new portalui_label(this.pc1.childPage[2],{bound:[270,10,100,18],caption:"Tgl Dok Lengkap", underline:true});
		this.dp_d4 = new portalui_datePicker(this.pc1.childPage[2],{bound:[370,10,98,18]}); 		
		
		this.sgUpld = new saiGrid(this.pc1.childPage[2],{bound:[1,5,this.pc1.width-5,183],colCount:4,
					    colTitle:["Kd Jenis","Jenis Dokumen","Path File","Upload"],
					    colWidth:[[3,2,1,0],[80,280,400,80]], 
						colFormat:[[3],[cfUpload]], 
						ellipsClick:[this,"doEllipsClickDok"],readOnly:true,change:[this,"doGridChange"],rowCount:1,tag:9});
		this.sgUpld.setUploadParam([3],"uploadTo", "server/media/", "object","server/media/");		
		this.sgnUpld = new sgNavigator(this.pc1.childPage[2],{bound:[1,this.pc1.height - 25,this.pc1.width-1,25],buttonStyle:1, grid:this.sgUpld});

		this.sg1mp2 = new saiGrid(this.pc1.childPage[2],{bound:[1,210,this.pc1.width-4,145],colCount:4,tag:9,readOnly:true,
					colTitle:["Kd Jenis","Jenis Dokumen","Path File","DownLoad"],
					colWidth:[[3,2,1,0],[80,280,400,80]],
					rowCount:1,colFormat:[[3],[cfButton]],click:[this,"doSgBtnClick"], colAlign:[[3],[alCenter]]});
		this.sgn2 = new sgNavigator(this.pc1.childPage[2],{bound:[1,this.pc1.height - 25,this.pc1.width - 1,25],buttonStyle:3,
					pager:[this,"doPager2"],beforePrint:[this,"doBeforePrintSg2"], grid:this.sg1mp2});            

		this.cb_cust = new portalui_saiCBBL(this.pc1.childPage[3],{bound:[20,11,200,20],caption:"Tertanggung",tag:9,multiSelection:false,change:[this,"doChange"]});
		this.cb_polis = new portalui_saiCBBL(this.pc1.childPage[3],{bound:[20,12,200,20],caption:"No Register",tag:9,multiSelection:false}); 
		this.e_noklaim2 = new saiLabelEdit(this.pc1.childPage[3],{bound:[20,14,250,20],caption:"No Klaim",tag:9});
		this.bCari = new button(this.pc1.childPage[3],{bound:[120,15,80,18],caption:"Tampil Data",click:[this,"doCari"]});			

		this.rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);	
		this.pc1.childPage[2].rearrangeChild(10, 23);	
		this.pc1.childPage[3].rearrangeChild(10, 23);	

		this.e_final = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,33,200,20],caption:"Nilai Settled",  tipeText:ttNilai, text:"0"});												
		this.l_tgl3 = new portalui_label(this.pc1.childPage[1],{bound:[520,56,100,18],caption:"Tgl Pembayaran", underline:true});
		this.dp_d3 = new portalui_datePicker(this.pc1.childPage[1],{bound:[620,56,98,18]});
	
		this.e_memo2 = new saiMemo(this.pc1.childPage[1],{bound:[520,255,450,85],caption:"Ket. Kejadian",tag:9});
		this.e_memo2.setReadOnly(true);
		
		
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			var data = this.dbLib.getDataProvider("select convert(varchar,now(),103) as tgl ",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.dp_d1.setText(line.tgl);
			}
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			
			this.fileUtil = new util_file();
			this.fileUtil.addListener(this);
			this.rootDir = this.app._rootDir;
			this.separator = "/";		

			this.e_final.hide();	
			this.l_tgl3.hide();	
			this.dp_d3.hide();

			this.l_tgl4.hide();	
			this.dp_d4.hide();

			this.cb_cust.setSQL("select a.kode_cust, a.nama from sju_cust a "+
							    "inner join karyawan_pp b on a.kode_segmen=b.kode_pp and a.kode_lokasi=b.kode_lokasi and b.nik='"+this.app._userLog+"' "+
								"where a.kode_lokasi='"+this.app._lokasi+"'",["kode_cust","nama"],false,["Kode","Nama"],"and","Data Tertanggung",true);
			
			this.c_status.items.clear();
			var data = this.dbLib.getDataProvider("select status+'-'+nama as status from sju_klaim_status where kode_lokasi='"+this.app._lokasi+"' order by nu",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.c_status.addItem(i,line.status);
				}
			}

			this.c_status.setText("");

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_sju16_fKlaimProg.extend(window.childForm);
window.app_saku3_transaksi_sju16_fKlaimProg.implement({
	doLoad:function(sender){			
		var strSQL = "select no_klaim,convert(varchar,a.tanggal,103) as tanggal,a.nilai,a.no_polis,a.progress+'-'+i.nama as prog_klaim,a.status+'-'+h.nama as sts_klaim,a.keterangan,c.kode_cust +' | '+c.nama as cust, d.kode_vendor +' | '+d.nama as vendor,e.kode_tipe+' | '+e.nama as tipe,a.lokasi,a.sebab+' | '+f.nama as sebab,"+
					 "a.no_berkas,convert(varchar,a.tgl_dol,103) as tgl_dol,b.no_dok+' | '+b.no_dok2 as no_dok,a.kode_obl+' | '+g.nama as oblos,convert(varchar,a.tgl_tahu,103) as tgl_tahu,  e.kode_tipe "+
		             "from sju_klaim a "+
					 "inner join sju_polis_m b on a.no_polis=b.no_polis and a.kode_lokasi=b.kode_lokasi "+
					 "                   inner join sju_cust c on b.kode_cust = c.kode_cust and b.kode_lokasi=c.kode_lokasi "+
					 "                   inner join sju_polis_vendor bb on b.no_polis = bb.no_polis and b.kode_lokasi=bb.kode_lokasi and bb.status='LEADER' "+
					 "                   inner join sju_vendor d on bb.kode_vendor = d.kode_vendor and bb.kode_lokasi=d.kode_lokasi "+
					 "                   inner join sju_tipe e on b.kode_tipe = e.kode_tipe and b.kode_lokasi=e.kode_lokasi "+
					 "                   inner join sju_sebab f on a.sebab=f.kode_sebab and a.kode_lokasi=f.kode_lokasi "+
					 "                   inner join sju_obl g on a.kode_obl=g.kode_obl and a.kode_lokasi=g.kode_lokasi "+
					 "inner join sju_klaim_status h on a.status=h.status and a.kode_lokasi=h.kode_lokasi "+
					 "inner join sju_klaim_progres i on a.progress=i.kode_prog and a.kode_lokasi=i.kode_lokasi "+
		             "where a.periode<='"+this.e_periode.getText()+"' and a.status in ('0','1') and a.kode_lokasi='"+this.app._lokasi+"' order by a.tgl_input desc";
		
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/this.app._pageRow));
			this.sgn.rearrange();
			this.doTampilData(1);
		} else this.sg.clear(1);			
	},	
	doTampilData: function(page) {
		this.sg.clear();
		var line;
		this.page = page;
		var start = (page - 1) * this.app._pageRow;
		var finish = (start + this.app._pageRow > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+this.app._pageRow);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];													
			this.sg.appendData([line.no_klaim,line.sts_klaim,line.prog_klaim,line.tanggal,floatToNilai(line.nilai),line.no_dok,line.keterangan,line.vendor,line.cust,line.tipe,line.no_berkas,line.tgl_dol,line.lokasi,line.sebab,line.oblos,line.no_polis,line.tgl_tahu, line.kode_tipe]);  
		}
		this.sg.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
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
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'sju_ver_m','no_ver',"PRG"+this.e_periode.getText().substring(2)+".",'0000'));
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();										
					sql.add("update sju_klaim set status='"+this.c_status.getText().substr(0,1)+"',progress='"+this.c_progress.getText()+"',tgl_dol='"+this.e_tgldol.getDateString()+"' where no_klaim='"+this.e_noklaim.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					
					sql.add("update a set no_verseb ='"+this.e_nb.getText()+"' "+
					        "from sju_ver_m a inner join sju_ver_d b on a.no_ver=b.no_ver and a.kode_lokasi=b.kode_lokasi and a.no_verseb='-' "+
							"where b.no_bukti ='"+this.e_noklaim.getText()+"' and b.modul='KLAIM' and b.kode_lokasi='"+this.app._lokasi+"'");
					
					sql.add("insert into sju_ver_m (no_ver,tanggal,kode_lokasi,periode,nik_user,tgl_input,status,modul,no_verseb,no_dokumen,nilai_awal,nilai_deduc,nilai_nego,nilai_final,  tgl_bayar,status_dok,tgl_dok,tgl_adjust, progress) values "+
						    "('"+this.e_nb.getText()+"','"+this.dp_d1.getDateString()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'"+this.c_status.getText().substr(0,1)+"','KLAIM','-','"+this.e_dok.getText()+"',"+nilaiToFloat(this.e_nilai.getText())+
							","+nilaiToFloat(this.e_deduc.getText())+","+nilaiToFloat(this.e_nego.getText())+","+nilaiToFloat(this.e_final.getText())+",'"+this.dp_d3.getDateString()+"','"+this.c_stsdok.getText()+"','"+this.dp_d4.getDateString()+"','"+this.dp_d2.getDateString()+"','"+this.c_progress.getText()+"')");
					
					sql.add("insert into sju_ver_d (no_ver,status,modul,no_bukti,kode_lokasi,catatan) values "+
						    "('"+this.e_nb.getText()+"','"+this.c_status.getText().substr(0,1)+"','KLAIM','"+this.e_noklaim.getText()+"','"+this.app._lokasi+"','"+this.e_memo.getText()+"')");
										
					var ix=0;
					for (var i=0;i < this.sgUpld.getRowCount();i++){
						if (this.sgUpld.rowValid(i) && this.sgUpld.cells(2,i)!="-"){
							ix++;
							sql.add("insert into sju_klaim_dok(no_klaim,path_file,nu,kode_jenis,kode_lokasi)values('"+this.e_noklaim.getText()+"','"+this.sgUpld.cells(3,i).tmpfile+"','"+ix+"','"+this.sgUpld.cells(0,i)+"','"+this.app._lokasi+"')");								
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
					this.sg.clear(1); this.sgUpld.clear(1); this.sg1mp2.clear(1);			
					this.doLoad();
					this.e_memo.setText("-");
					this.pc1.setActivePage(this.pc1.childPage[0]);						
					setTipeButton(tbSimpan);

					this.e_final.hide();	
					this.l_tgl3.hide();	
					this.dp_d3.hide();
				break;
			case "simpan" :									
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
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
		this.doLoad();
	},		
	doChange: function(sender){
		/*
		if (sender == this.c_status && this.c_status.getText()!="") {
			if (this.c_status.getText() == "SETTLED") {
				this.e_final.show();	
				this.l_tgl3.show();	
				this.dp_d3.show();
				this.c_progress.hide();
				this.c_progress.setText("-");
			}
			else {
				this.e_final.hide();	
				this.l_tgl3.hide();	
				this.dp_d3.hide();
				
				if (this.c_status.getText() == "OUTSTANDING") {
					this.c_progress.show();					
				}
				else {
					this.c_progress.hide();
					this.c_progress.setText("-");
				}
			}
		}
		*/

		if (sender == this.c_status && this.c_status.getText()!="") {	
			this.c_progress.setText("");
			this.c_progress.setSQL("select kode_prog, nama from sju_klaim_progres where status='"+this.c_status.getText().substr(0,1)+"' and kode_lokasi='"+this.app._lokasi+"'",["kode_prog","nama"],false,["Kode","Nama"],"and","Data Progress",true);
		}

		if (sender == this.c_stsdok && this.c_stsdok.getText()!="") {
			if (this.c_stsdok.getText() == "LENGKAP") {					
				this.l_tgl4.show();	
				this.dp_d4.show();
			}
			else {				
				this.l_tgl4.hide();	
				this.dp_d4.hide();
			}
		}		
		
		if (sender == this.cb_cust && this.cb_cust.getText()!="") {
			this.cb_polis.setSQL("select no_polis,no_dok from sju_polis_m where kode_cust='"+this.cb_cust.getText()+"'",
								["no_polis","no_dok"],false,["No Register","No Polis"],"and","Data Polis",true);
		}	
		
	},		
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg.cells(0,row) != "") {	
				this.pc1.setActivePage(this.pc1.childPage[1]);																						
				this.e_noklaim.setText(this.sg.cells(0,row));						
				this.e_tglklaim.setText(this.sg.cells(3,row));		
				this.e_nopolis.setText(this.sg.cells(15,row));
				this.e_dok.setText(this.sg.cells(5,row));		
				this.e_tipe.setText(this.sg.cells(9,row));		
				this.e_nilai.setText(this.sg.cells(4,row));		
				this.e_berkas.setText(this.sg.cells(10,row));		
				this.e_tgldol.setText(this.sg.cells(11,row));		
				this.e_lokasi.setText(this.sg.cells(12,row));		
				this.e_sebab.setText(this.sg.cells(13,row));
				this.e_oblos.setText(this.sg.cells(14,row));	
				this.e_tgltahu.setText(this.sg.cells(16,row));					
				this.e_png.setText(this.sg.cells(7,row));		
				this.e_ttg.setText(this.sg.cells(8,row));		
				this.e_memo2.setText(this.sg.cells(6,row));		
				this.kodeTipe = this.sg.cells(17,row);						
						
				var strSQL = "select  top 1 a.nilai_awal,a.nilai_deduc,a.nilai_nego,a.nilai_final, a.tgl_bayar,a.status_dok,a.tgl_dok,a.tgl_adjust,a.status+'-'+c.nama as status,b.catatan, a.progress "+
							"from sju_ver_m a inner join sju_ver_d b on a.no_ver=b.no_ver and a.kode_lokasi=b.kode_lokasi "+
							"inner join sju_klaim_status c on a.status=c.status and a.kode_lokasi=c.kode_lokasi "+
							"where a.modul='KLAIM' and a.no_verseb='-' and b.no_bukti='"+this.e_noklaim.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"' order by a.no_ver desc";			
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){			
						this.c_status.setText(line.status);																
						this.e_nilai.setText(floatToNilai(line.nilai_awal))
						this.e_deduc.setText(floatToNilai(line.nilai_deduc));
						this.e_nego.setText(floatToNilai(line.nilai_nego));
						this.e_final.setText(floatToNilai(line.nilai_final));

						this.dp_d3.setText(line.tgl_bayar);
						this.dp_d4.setText(line.tgl_dok);
						this.dp_d2.setText(line.tgl_adjust);

						this.c_stsdok.setText(line.status_dok);
						this.e_memo.setText(line.catatan);
						this.c_progress.setText(line.progress);
					}
				}

				var strSQL = "select a.kode_jenis,a.nama "+
							 "from sju_jenisdok_klaim a left join sju_klaim_dok b on a.kode_jenis=b.kode_jenis and a.kode_lokasi=b.kode_lokasi and b.no_klaim = '"+this.e_noklaim.getText()+"' "+
							 "where b.kode_jenis is null and a.kode_tipe='"+this.kodeTipe+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.kode_jenis";																			 		
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sgUpld.clear();
					for (var i in data.rs.rows){	
						line = data.rs.rows[i];												
						this.sgUpld.appendData([line.kode_jenis, line.nama, "-","-"]);
					}
				} else this.sgUpld.clear(1);

				this.sg1mp2.clear();
				var data = this.dbLib.getDataProvider("select b.kode_jenis,b.nama,a.path_file from sju_klaim_dok a inner join sju_jenisdok_klaim b on a.kode_jenis=b.kode_jenis and a.kode_lokasi=b.kode_lokasi "+
						   "where a.no_klaim = '"+this.e_noklaim.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.nu",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg1mp2.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];													 
						this.sg1mp2.appendData([line.kode_jenis, line.nama, line.path_file, "DownLoad"]);
					}
				} else this.sg1mp2.clear(1);

			}
		} catch(e) {alert(e);}
	},		
	doGridChange: function(sender, col, row,param1,result, data){
	    try{        	
			if (sender == this.sgUpld && col == 3){ 
				if (this.uploadedFiles == undefined) this.uploadedFiles = "";
				if (this.uploadedFiles != "") this.uploadedFiles +=";";
				this.uploadedFiles+= this.rootDir+"/"+this.sgUpld.columns.get(3).param2 + data.tmpfile;
                this.sgUpld.cells(2,row, data.tmpfile);                
            }
         }catch(e){
            alert(e+" "+data);
         }
    },
	doSgBtnClick: function(sender, col, row){
		try{
			if (col === 3)
				window.open("server/media/"+this.sg1mp2.getCell(2,row));
		}catch(e){
			alert(e);
		}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							system.info(this,"Transaksi telah sukses tersimpan (No Bukti : "+ this.e_nb.getText()+")","");
							this.app._mainForm.bClear.click();

							this.fileUtil.deleteFiles(this.deletedFiles);
							this.uploadedFiles = "";
							this.deletedFiles = "";
						}else system.info(this,result,"");
	    			break;
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	},
	doCari:function(sender){				
		//if (this.cb_cust.getText()!="")
		//{
			var filter = "";
			if (this.cb_cust.getText()!="") filter = " and b.kode_cust like '%"+this.cb_cust.getText()+"%' ";		
			if (this.cb_polis.getText()!="") filter = " and a.no_polis like '%"+this.cb_polis.getText()+"%' ";	
			if (this.e_noklaim2.getText()!="") filter = " and a.no_klaim like '%"+this.e_noklaim2.getText()+"%' ";		
			var strSQL = "select no_klaim,convert(varchar,a.tanggal,103) as tanggal,a.nilai,a.no_polis,a.progress,a.keterangan,c.kode_cust +' | '+c.nama as cust, d.kode_vendor +' | '+d.nama as vendor,e.kode_tipe+'-'+e.nama as tipe,a.lokasi,a.sebab+' | '+f.nama as sebab,a.no_berkas,convert(varchar,a.tgl_dol,103) as tgl_dol,b.no_dok+' | '+b.no_dok2 as no_dok,a.kode_obl+' | '+g.nama as oblos,convert(varchar,a.tgl_tahu,103) as tgl_tahu,  e.kode_tipe "+
						"from sju_klaim a inner join sju_polis_m b on a.no_polis=b.no_polis and a.kode_lokasi=b.kode_lokasi "+
						"                   inner join sju_cust c on b.kode_cust = c.kode_cust and b.kode_lokasi=c.kode_lokasi "+
						"                   inner join sju_polis_vendor bb on b.no_polis = bb.no_polis and b.kode_lokasi=bb.kode_lokasi and bb.status='LEADER' "+
						"                   inner join sju_vendor d on bb.kode_vendor = d.kode_vendor and bb.kode_lokasi=d.kode_lokasi "+
						"                   inner join sju_tipe e on b.kode_tipe = e.kode_tipe and b.kode_lokasi=e.kode_lokasi "+
						"                   inner join sju_sebab f on a.sebab=f.kode_sebab and a.kode_lokasi=f.kode_lokasi "+
						"                   inner join sju_obl g on a.kode_obl=g.kode_obl and a.kode_lokasi=g.kode_lokasi "+
						"where a.kode_lokasi='"+this.app._lokasi+"' "+filter+" order by a.no_polis";
			
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/this.app._pageRow));
				this.sgn.rearrange();
				this.doTampilData(1);
			} else this.sg.clear(1);	
			this.pc1.setActivePage(this.pc1.childPage[0]);	
		/*}
		//else 
		//{	
			system.alert(this,"Data Tertanggung harus dipilih.","");
			this.pc1.setActivePage(this.pc1.childPage[3]);	
		}
		*/
		
	}
});
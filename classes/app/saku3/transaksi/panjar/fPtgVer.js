window.app_saku3_transaksi_panjar_fPtgVer = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_panjar_fPtgVer.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_panjar_fPtgVer";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Verifikasi Ptg Panjar / Penutupan IF : Input", 0);	
		
		uses("saiCB;saiMemo;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,10,202,20],caption:"Periode",tag:2,readOnly:true,visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,10,100,18],caption:"Tanggal", underline:true});			//,visible:false
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,10,100,18],selectDate:[this,"doSelectDate"]}); 		//,visible:false
		
		this.pc1 = new pageControl(this,{bound:[20,18,1000,445], childPage:["Data Pertanggungan","Detail Pertanggungan","Item Verifikasi","Cari Data"]});
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:13,tag:0,
		            colTitle:["No Ptg/Reim","Tanggal","No Dokumen","Ref Bukti","Nilai PJ/IF","Nilai Ptg","Nilai KB","Keterangan","Pemegang","PP","Status","No Ver","Modul"],
					colWidth:[[12,11,10,9,8,7,6,5,4,3,2,1,0],[60,100,60,100,100,200,80,80,80,100,100,80,100]],
					readOnly:true,colFormat:[[4,5,6],[cfNilai,cfNilai,cfNilai]],
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});
						
		this.e_nb = new portalui_saiLabelEdit(this.pc1.childPage[1],{bound:[520,10,202,20],caption:"No Verifikasi",maxLength:30,readOnly:true});	
		
		this.c_status = new saiCB(this.pc1.childPage[1],{bound:[20,10,202,20],caption:"Status Approval",items:["APPROVE","REVISI"], readOnly:true,tag:2,change:[this,"doChange"]});
		this.e_noptg = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,450,20],caption:"No Ptg", readOnly:true});						
		this.e_dok = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,13,470,20],caption:"No Dokumen", readOnly:true});						
		this.e_ket = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,15,450,20],caption:"Deskripsi", readOnly:true});								
		this.e_nik = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,15,470,20],caption:"Pemegang PJ/IF", readOnly:true});										
		this.e_memo = new saiMemo(this.pc1.childPage[1],{bound:[20,12,450,80],caption:"Catatan",tag:9,readOnly:true});
		this.e_total = new saiLabelEdit(this.pc1.childPage[1],{bound:[790,12,200,20],caption:"Nilai KasBank", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
	
		this.sg3 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-170],colCount:9,tag:9,
		            colTitle:["Kode Akun","Nama Akun","DC","Keterangan","Nilai","Kode PP","Nama PP","Kode DRK","Nama DRK"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[150,80,150,80,100,200,50,150,80]],										
					readOnly:true,colFormat:[[4],[cfNilai]],nilaiChange:[this,"doNilaiChange"],
					autoAppend:false,defaultRow:1});		
		
		this.sg4 = new saiGrid(this.pc1.childPage[2],{bound:[1,6,this.pc1.width-5,200],colCount:9,tag:9,
		            colTitle:["Kode Akun","Nama Akun","Kode PP","Nama PP","Kode DRK","Nama DRK","Saldo Awal","Nilai","Saldo Akhir"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[80,80,80,150,80,150,80,150,80]],
					readOnly:true,colFormat:[[6,7,8],[cfNilai,cfNilai,cfNilai]],autoAppend:true,defaultRow:1});			
					
		this.sgv = new saiGrid(this.pc1.childPage[2],{bound:[1,5,this.pc1.width-5,195],colCount:9,tag:9,
		            colTitle:["Kode Akun","Nama Akun","DC","Keterangan","Nilai","Kode PP","Nama PP","Kode DRK","Nama DRK"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[150,80,150,80,100,270,50,200,80]],					
					columnReadOnly:[true,[1,6,8],[0,2,3,4,5,7]],
					buttonStyle:[[0,2,5,7],[bsEllips,bsAuto,bsEllips,bsEllips]], 
					colFormat:[[4],[cfNilai]],picklist:[[2],[new portalui_arrayMap({items:["D","C"]})]],checkItem: true,
					cellEnter:[this,"doCellEnter"],ellipsClick:[this,"doEllipsClick"],change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],
					autoAppend:true,defaultRow:1});
		this.sgnv = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sgv});		
		
		
		this.c_status2 = new saiCB(this.pc1.childPage[3],{bound:[20,10,200,20],caption:"Status",items:["INPROG","APPROVE","REVISI"], readOnly:true,tag:9});
		this.e_ket2 = new saiLabelEdit(this.pc1.childPage[3],{bound:[20,15,450,20],caption:"Deskripsi",tag:9});		
		this.bCari = new button(this.pc1.childPage[3],{bound:[120,10,80,18],caption:"Cari Data",click:[this,"doCari"]});			
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);	
		this.pc1.childPage[2].rearrangeChild(10, 23);	
		this.pc1.childPage[3].rearrangeChild(10, 23);	
		
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
			this.stsSimpan = 1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
						
			var sql = new server_util_arrayList();
			sql.add("select a.kode_akun,a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag = '047' "+					
			        "where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'");												
			sql.add("select kode_pp,nama from pp where kode_bidang='"+this.app._kodeBidang+"' and kode_lokasi = '"+this.app._lokasi+"'");
			this.dbLib.getMultiDataProviderA(sql);			
			
			this.c_status.setText("");
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_panjar_fPtgVer.extend(window.childForm);
window.app_saku3_transaksi_panjar_fPtgVer.implement({
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
					if (this.c_status.getText()=="APPROVE")  var prog = "2";
					if (this.c_status.getText()=="REVISI")  var prog = "V";
										
					if (this.modul == "PJPTG") {
						sql.add("update panjarptg2_m set nilai=nilai_pj-"+nilaiToFloat(this.e_total.getText())+",nilai_kas="+nilaiToFloat(this.e_total.getText())+",progress='"+prog+"',no_ver='"+this.e_nb.getText()+"' where no_ptg='"+this.e_noptg.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
						var modulSPB = "PJPTG_SPB"; 
					}
					if (this.modul == "PTGLOG") {
						sql.add("update panjarptg2_m set nilai=nilai_pj-"+nilaiToFloat(this.e_total.getText())+",nilai_kas="+nilaiToFloat(this.e_total.getText())+",progress='"+prog+"',no_ver='"+this.e_nb.getText()+"' where no_ptg='"+this.e_noptg.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
						var modulSPB = "PTGLOG_SPB"; 
					}
					if (this.modul == "IFTUTUP") {
						sql.add("update if_reim_m set progress='"+prog+"',no_ver='"+this.e_nb.getText()+"' where no_reim='"+this.e_noptg.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
						var modulSPB = "IFTUTUP_SPB"; 
					}
					
					sql.add("update a set no_appseb ='"+this.e_nb.getText()+"' "+
							"from app_m a inner join app_d b on a.no_app=b.no_app and a.kode_lokasi=b.kode_lokasi and a.no_appseb='-' "+
							"where b.no_bukti ='"+this.e_noptg.getText()+"' and b.modul='"+modulSPB+"' and b.kode_lokasi='"+this.app._lokasi+"'");
					sql.add("insert into app_m (no_app,tanggal,kode_lokasi,periode,nik_user,tgl_input,status,modul,no_appseb) values "+
							"('"+this.e_nb.getText()+"','"+this.dp_d1.getDateString()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'"+this.c_status.getText()+"','"+modulSPB+"','-')");
					sql.add("insert into app_d (no_app,status,modul,no_bukti,kode_lokasi,catatan) values "+
							"('"+this.e_nb.getText()+"','"+prog+"','"+modulSPB+"','"+this.e_noptg.getText()+"','"+this.app._lokasi+"','"+this.e_memo.getText()+"')");
							
					if (this.modul == "PJPTG" || this.modul == "PTGLOG") {
						sql.add("delete from panjarptg2_j where no_ptg='"+this.e_noptg.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and jenis='VER'");
						if (this.sgv.getRowValidCount() > 0){
							for (var i=0;i < this.sgv.getRowCount();i++){
								if (this.sgv.rowValid(i)){
									sql.add("insert into panjarptg2_j(no_ptg,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input) values "+
											"('"+this.e_noptg.getText()+"','"+this.e_nb.getText()+"','"+this.tgl+"',"+i+",'"+this.sgv.cells(0,i)+"','"+this.sgv.cells(3,i)+"','"+this.sgv.cells(2,i).toUpperCase()+"',"+parseNilai(this.sgv.cells(4,i))+",'"+this.sgv.cells(5,i)+"','"+this.sgv.cells(7,i)+"','"+this.app._lokasi+"','"+this.modul+"','VER','"+this.periodePtg+"','"+this.app._userLog+"',getdate())");
								}
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
					this.sg.clear(1); this.sg3.clear(1); this.sg4.clear(1); 
					this.doClick();
					this.doLoad();
					this.e_memo.setText("-");
					this.pc1.setActivePage(this.pc1.childPage[0]);					
					setTipeButton(tbAllFalse);
					this.c_status.setText("");
				break;
			case "simpan" :					
			case "ubah" :			
				this.preView = "1";
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;			
			case "hapus" :	
				this.preView = "0";
				if (this.modul == "PJPTG" || this.modul == "PTGLOG") var data = this.dbLib.getDataProvider("select progress from panjarptg2_m where no_ptg='"+this.e_noptg.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'",true);
				if (this.modul == "IFTUTUP") var data = this.dbLib.getDataProvider("select progress from if_reim_m where no_reim='"+this.e_noptg.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){													
						if (line.progress != "2" && line.progress != "V") {
							system.alert(this,"Transaksi tidak valid.","No Pertanggungan sudah difinalisasi.");
							return false;
						}
					}
				}								
				var sql = new server_util_arrayList();								
				if (this.modul == "PJPTG" || this.modul == "PTGLOG") {
					sql.add("delete from panjarptg2_j where no_ptg='"+this.e_noptg.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and jenis='VER'");
					sql.add("update panjarptg2_m set progress='1',no_ver='-' where no_ptg='"+this.e_noptg.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");									
				}
				if (this.modul == "IFTUTUP") {					
					sql.add("update if_reim_m set progress='1',no_ver='-' where no_reim='"+this.e_noptg.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");														
				}
				var data = this.dbLib.getDataProvider("select a.no_app from app_m a inner join app_d b on a.no_app=b.no_app and a.kode_lokasi=b.kode_lokasi and b.no_bukti='"+this.e_noptg.getText()+"' "+
													  "where a.no_appseb='-' and a.kode_lokasi='"+this.app._lokasi+"' and a.modul like '%_SPB'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){													
						sql.add("delete from app_m where no_app='"+line.no_app+"' and kode_lokasi='"+this.app._lokasi+"'");									
						sql.add("delete from app_d where no_app='"+line.no_app+"' and kode_lokasi='"+this.app._lokasi+"'");									
					}
				}
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
	doClick:function(sender){
		if (this.stsSimpan == 1) this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"app_m","no_app",this.app._lokasi+"-VER"+this.e_periode.getText().substr(2,4)+".","0000"));												
	},
	doNilaiChange: function(){
		try{			
			var tot=0;
			for (var i = 0; i < this.sg3.rows.getLength();i++){
				if (this.sg3.rowValid(i) && this.sg3.cells(4,i) != ""){
					if (this.sg3.cells(2,i)=="C") tot += nilaiToFloat(this.sg3.cells(4,i));
					if (this.sg3.cells(2,i)=="D") tot -= nilaiToFloat(this.sg3.cells(4,i));
				}
			}
			for (var i = 0; i < this.sgv.getRowCount();i++){
				if (this.sgv.rowValid(i) && this.sgv.cells(4,i) != ""){
					if (this.sgv.cells(2,i).toUpperCase() == "D") tot -= nilaiToFloat(this.sgv.cells(4,i));
					if (this.sgv.cells(2,i).toUpperCase() == "C") tot += nilaiToFloat(this.sgv.cells(4,i));
				}
			}
			this.e_total.setText(floatToNilai(tot));			
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},	
	doDoubleClick: function(sender, col , row) {
		if (this.sg.cells(0,row) != "") {			
			this.pc1.setActivePage(this.pc1.childPage[1]);			
			this.e_noptg.setText(this.sg.cells(0,row));
			this.e_dok.setText(this.sg.cells(2,row));			
			this.e_ket.setText(this.sg.cells(7,row));			
			this.e_nik.setText(this.sg.cells(8,row));			
			this.e_nb.setText(this.sg.cells(11,row));			
			this.tgl = this.sg.cells(1,row).substr(6,4)+"-"+this.sg.cells(1,row).substr(3,2)+"-"+this.sg.cells(1,row).substr(0,2);
			this.periodePtg = this.sg.cells(1,row).substr(6,4)+this.sg.cells(1,row).substr(3,2);
			this.e_memo.setText("-");				
			this.modul = this.sg.cells(12,row);
			
			if (this.sg.cells(10,row) == "INPROG") {
				this.stsSimpan == 1;
				setTipeButton(tbSimpan);
				this.doClick();
			}
			else {
				this.stsSimpan == 0;
				setTipeButton(tbUbahHapus);
			}
			
			if (this.modul == "PJPTG" || this.modul == "PTGLOG") {
				this.sgv.show(); this.sgnv.show();
				var data = this.dbLib.getDataProvider(
							"select a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp,a.kode_drk,isnull(d.nama,'-') as nama_drk "+
							"from panjarptg2_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
							"                    inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
							"                    left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun=substring(a.periode,1,4) "+
							"where a.jenis <> 'VER' and a.no_ptg = '"+this.e_noptg.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.no_urut",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg3.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg3.appendData([line.kode_akun,line.nama_akun,line.dc,line.keterangan,floatToNilai(line.nilai),line.kode_pp,line.nama_pp,line.kode_drk,line.nama_drk]);
					}
				} else this.sg3.clear(1);			
				var data = this.dbLib.getDataProvider(
							"select a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp,a.kode_drk,isnull(d.nama,'-') as nama_drk "+
							"from panjarptg2_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
							"                    inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
							"                    left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun=substring(a.periode,1,4) "+
							"where a.jenis = 'VER' and a.no_ptg = '"+this.e_noptg.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.no_urut",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sgv.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sgv.appendData([line.kode_akun,line.nama_akun,line.dc,line.keterangan,floatToNilai(line.nilai),line.kode_pp,line.nama_pp,line.kode_drk,line.nama_drk]);
					}
				} else this.sgv.clear(1);							
				this.sg3.validasi();
				
				var data = this.dbLib.getDataProvider(
							"select a.kode_akun,b.nama as nama_akun,a.kode_pp,c.nama as nama_pp,a.kode_drk,isnull(d.nama,'-') as nama_drk,a.saldo,a.nilai,a.saldo-a.nilai as sakhir "+
							"from angg_r a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
							"              inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
							"              left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun='"+this.e_periode.getText().substr(0,4)+"' "+
							"where a.no_bukti = '"+this.e_noptg.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.modul in ('PJPTG2','PTGLOG') order by a.kode_akun",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg4.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg4.appendData([line.kode_akun,line.nama_akun,line.kode_pp,line.nama_pp,line.kode_drk,line.nama_drk,floatToNilai(line.saldo),floatToNilai(line.nilai),floatToNilai(line.sakhir)]);
					}
				} else this.sg4.clear(1);											
			}
			
			if (this.modul == "IFTUTUP") {				
				this.sgv.hide(); this.sgnv.hide();
				var data = this.dbLib.getDataProvider("select a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp,a.kode_drk,isnull(d.nama,'-') as nama_drk "+
							"from if_reim_j a inner join if_reim_m x on a.no_reim=x.no_reim and a.kode_lokasi=x.kode_lokasi "+
							"              inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
							"              inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+							
							"              left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun=substring(a.periode,1,4) "+
							"where a.jenis <> 'HUTANG' and x.no_reim = '"+this.e_noptg.getText()+"' and x.kode_lokasi='"+this.app._lokasi+"' "+
							"union "+
							"select d.kode_akun,d.nama as nama_akun,'C' as dc,b.keterangan,a.nilai,a.kode_pp,e.nama as nama_pp,'-' as kode_drk,'-' as nama_drk "+
							"from if_m a inner join if_reim_m b on a.nik=b.nik_buat and a.kode_lokasi=b.kode_lokasi "+
							"            inner join spro c on a.kode_lokasi=c.kode_lokasi and c.kode_spro='AKUNIF' "+
							"            inner join masakun d on c.flag=d.kode_akun and c.kode_lokasi=b.kode_lokasi "+
							"            inner join pp e on a.kode_pp=e.kode_pp and a.kode_lokasi=e.kode_lokasi "+	
							"where b.no_reim = '"+this.e_noptg.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"' "+
							"order by a.dc desc",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg3.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg3.appendData([line.kode_akun,line.nama_akun,line.dc.toUpperCase(),line.keterangan,floatToNilai(line.nilai),line.kode_pp,line.nama_pp,line.kode_drk,line.nama_drk]);
					}
				} else this.sg3.clear(1);			
				var data = this.dbLib.getDataProvider(
							"select a.kode_akun,b.nama as nama_akun,a.kode_pp,c.nama as nama_pp,a.kode_drk,isnull(d.nama,'-') as nama_drk,a.saldo,a.nilai,a.saldo-a.nilai as sakhir "+
							"from angg_r a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
							"              inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
							"              inner join if_aju_m aa on aa.no_aju=a.no_bukti and aa.kode_lokasi=a.kode_lokasi "+
							"              inner join if_reim_m x on aa.no_reim=x.no_reim and aa.kode_lokasi=x.kode_lokasi "+
							"              left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun='"+this.e_periode.getText().substr(0,4)+"' "+
							"where x.no_reim = '"+this.e_noptg.getText()+"' and x.kode_lokasi='"+this.app._lokasi+"' order by a.kode_akun",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg4.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg4.appendData([line.kode_akun,line.nama_akun,line.kode_pp,line.nama_pp,line.kode_drk,line.nama_drk,floatToNilai(line.saldo),floatToNilai(line.nilai),floatToNilai(line.sakhir)]);
					}
				} else this.sg4.clear(1);															
			}			
			
			
		}
	},
	doLoad:function(sender){		
		var strSQL = "select no_ptg,convert(varchar,a.tanggal,103) as tanggal,a.no_panjar,a.no_dokumen,a.nilai_pj,a.nilai,a.nilai_kas,a.keterangan,d.nik_buat+'-'+c.nama as pemegang,b.kode_pp+' - '+b.nama as pp,'INPROG' as status,'-' as no_ver,'PJPTG' as modul "+
		             "from panjarptg2_m a "+
					 "inner join panjar2_m d on a.no_panjar=d.no_panjar and a.kode_lokasi=d.kode_lokasi "+
		             "inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
					 "inner join karyawan c on d.nik_buat=c.nik and d.kode_lokasi=c.kode_lokasi "+
					 "where a.periode<='"+this.e_periode.getText()+"' and a.progress='1' and a.kode_lokasi='"+this.app._lokasi+"' and a.modul='PJPTG' "+
					 "union "+
					 
					 "select no_ptg,convert(varchar,a.tanggal,103) as tanggal,a.no_panjar,a.no_dokumen,a.nilai_pj,a.nilai,a.nilai_kas,a.keterangan,d.nik_buat+'-'+c.nama as pemegang,b.kode_pp+' - '+b.nama as pp,'INPROG' as status,'-' as no_ver,'PTGLOG' as modul "+
		             "from panjarptg2_m a "+
					 "inner join panjar2_m d on a.no_panjar=d.no_panjar and a.kode_lokasi=d.kode_lokasi "+
		             "inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
					 "inner join karyawan c on d.nik_buat=c.nik and d.kode_lokasi=c.kode_lokasi "+
					 "where a.periode<='"+this.e_periode.getText()+"' and a.progress='1' and a.kode_lokasi='"+this.app._lokasi+"' and a.modul='PTGLOG' "+
					 "union "+
					 
					 "select no_reim,convert(varchar,a.tanggal,103) as tanggal,d.nik,a.no_dokumen,d.nilai,a.nilai,d.nilai-a.nilai as nilai_kas,a.keterangan,d.nik+'-'+c.nama as pemegang,d.kode_pp+' - '+b.nama as pp,'INPROG' as status,'-' as no_ver,'IFTUTUP' as modul "+
		             "from if_reim_m a "+
					 "inner join if_m d on a.nik_buat=d.nik and a.kode_lokasi=d.kode_lokasi "+
		             "inner join pp b on d.kode_pp=b.kode_pp and d.kode_lokasi=b.kode_lokasi "+
					 "inner join karyawan c on d.nik=c.nik and d.kode_lokasi=c.kode_lokasi "+
					 "where a.modul='TUTUP' and a.periode<='"+this.e_periode.getText()+"' and a.progress='1' and a.kode_lokasi='"+this.app._lokasi+"' ";
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn.rearrange();
			this.doTampilData(1);
		} else this.sg.clear(1);		
	},
	doCari:function(sender){						
		var filter = "";
		if (this.c_status2.getText() == "INPROG") filter = " and a.progress = '1' "; 
		if (this.c_status2.getText() == "APPROVE") filter = " and a.progress = '2' "; 
		if (this.c_status2.getText() == "REVISI") filter = " and a.progress = 'V'  "; 					
		if (this.e_ket2.getText()!="") filter = " and a.keterangan like '%"+this.e_ket2.getText()+"%' ";		
				
		var strSQL = "select no_ptg,convert(varchar,a.tanggal,103) as tanggal,a.no_panjar,a.no_dokumen,a.nilai_pj,a.nilai,a.nilai_kas,a.keterangan,d.nik_buat+'-'+c.nama as pemegang,b.kode_pp+' - '+b.nama as pp,'"+this.c_status2.getText()+"' as status,a.no_ver,'PJPTG' as modul  "+
		             "from panjarptg2_m a "+
					 "inner join panjar2_m d on a.no_panjar=d.no_panjar and a.kode_lokasi=d.kode_lokasi "+
		             "inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
					 "inner join karyawan c on d.nik_buat=c.nik and d.kode_lokasi=c.kode_lokasi "+
					 "where a.modul='PJPTG' and a.kode_lokasi='"+this.app._lokasi+"' "+filter+" "+
					 "union "+
					 
					 "select no_ptg,convert(varchar,a.tanggal,103) as tanggal,a.no_panjar,a.no_dokumen,a.nilai_pj,a.nilai,a.nilai_kas,a.keterangan,d.nik_buat+'-'+c.nama as pemegang,b.kode_pp+' - '+b.nama as pp,'"+this.c_status2.getText()+"' as status,a.no_ver,'PTGLOG' as modul  "+
		             "from panjarptg2_m a "+
					 "inner join panjar2_m d on a.no_panjar=d.no_panjar and a.kode_lokasi=d.kode_lokasi "+
		             "inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
					 "inner join karyawan c on d.nik_buat=c.nik and d.kode_lokasi=c.kode_lokasi "+
					 "where a.modul='PTGLOG' and a.kode_lokasi='"+this.app._lokasi+"' "+filter+" "+
					 "union "+
					 
					 "select no_reim,convert(varchar,a.tanggal,103) as tanggal,d.nik,a.no_dokumen,d.nilai,a.nilai,d.nilai-a.nilai as nilai_kas,a.keterangan,d.nik+'-'+c.nama as pemegang,d.kode_pp+' - '+b.nama as pp,'"+this.c_status2.getText()+"' as status,a.no_ver,'IFTUTUP' as modul "+
		             "from if_reim_m a "+
					 "inner join if_m d on a.nik_buat=d.nik and a.kode_lokasi=d.kode_lokasi "+
		             "inner join pp b on d.kode_pp=b.kode_pp and d.kode_lokasi=b.kode_lokasi "+
					 "inner join karyawan c on d.nik=c.nik and d.kode_lokasi=c.kode_lokasi "+
					 "where a.kode_lokasi='"+this.app._lokasi+"' "+filter+" and a.modul='TUTUP'";					 
					 
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn.rearrange();
			this.doTampilData(1);
		} else this.sg.clear(1);
		this.pc1.setActivePage(this.pc1.childPage[0]);		
	},
	doTampilData: function(page) {
		this.sg.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];							
			this.sg.appendData([line.no_ptg,line.tanggal,line.no_dokumen,line.no_panjar,floatToNilai(line.nilai_pj),floatToNilai(line.nilai),floatToNilai(line.nilai_kas),line.keterangan,line.pemegang,line.pp,line.status.toUpperCase(),line.no_ver,line.modul.toUpperCase()]);
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
								this.nama_report="server_report_saku2_........";
								this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_ver='"+this.e_nb.getText()+"' ";
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
			this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
			this.sg.clear(1); this.sg3.clear(1); this.sg4.clear(1); 
			this.doClick();
			this.doLoad();
			this.e_memo.setText("-");
			this.pc1.setActivePage(this.pc1.childPage[0]);					
			setTipeButton(tbAllFalse);
			this.c_status.setText("");
		} catch(e) {
			alert(e);
		}
	},	
	doChangeCell: function(sender, col, row){
		if ((col == 2 || col == 4) && (sender.cells(4,row) != "")) sender.validasi();
		sender.onChange.set(undefined,undefined);	    		
		if (col == 0) {
			if (sender.cells(0,row) != "") {				
				var akun = this.dataAkun.get(sender.cells(0,row));				
				if (akun) sender.cells(1,row,akun);
				else {
					if (trim(sender.cells(0,row)) != "") system.alert(this,"Kode Akun "+sender.cells(0,row)+" tidak ditemukan","Inputkan kode lainnya.","checkAkun");                
					sender.cells(0,row,"");
					sender.cells(1,row,"");
				}				
			}
		}		
		if (col == 5) {
			if (sender.cells(5,row) != "") {
				var pp = this.dataPP.get(sender.cells(5,row));
				if (pp) sender.cells(6,row,pp);
				else {
					if (trim(sender.cells(5,row)) != "") system.alert(this,"Kode PP "+sender.cells(5,row)+" tidak ditemukan","Inputkan kode lainnya.","checkPP");                
					sender.cells(5,row,"");
					sender.cells(6,row,"");
				}				
			}
		}
		if (col == 7) {
			if (sender.cells(7,row) != "") {							
				var data = this.dbLib.getDataProvider("select distinct a.nama from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.e_periode.getText().substr(0,4)+"%' and b.kode_akun='"+sender.cells(0,row)+"' and b.kode_pp = '"+sender.cells(5,row)+"' and b.kode_drk = '"+sender.cells(7,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined) this.sg1.cells(8,row,line.nama);
					else {						
						sender.cells(7,row,"-");
						sender.cells(8,row,"-");						
					}
				}
			}
		}		
		sender.onChange.set(this,"doChangeCell");		
	},	
	doEllipsClick: function(sender, col, row){
		try{						
			if (col == 0){
				this.standarLib.showListData(this, "Daftar Akun",sender,undefined, 
						"select a.kode_akun,a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag = '047' "+							
						"where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'",
						"select count(a.kode_akun) from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag = '047' where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'",
						["a.kode_akun","a.nama"],"and",["Kode","Nama"],false);				
			}
			if (col == 5){
				this.standarLib.showListData(this, "Daftar PP/Unit",sender,undefined, 
						"select kode_pp, nama  from pp where kode_lokasi = '"+this.app._lokasi+"' and tipe='posting' and flag_aktif ='1'",
						"select count(kode_pp) from pp where kode_lokasi = '"+this.app._lokasi+"' and tipe='posting' and flag_aktif ='1'",
						["kode_pp","nama"],"and",["Kode","Nama"],false);				
			}				
			if (col == 7){					
				var vUnion = "";
				var data = this.dbLib.getDataProvider("select status_gar from masakun where kode_akun='"+sender.cells(0,row)+"' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						if (line.status_gar != "1") var vUnion = " union select '-','-' "; 
					} 
				}
				this.standarLib.showListData(this, "Daftar DRK",sender,undefined, 
						"select distinct a.kode_drk, a.nama from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.e_periode.getText().substr(0,4)+"%' and b.kode_akun='"+sender.cells(0,row)+"' and b.kode_pp = '"+sender.cells(5,row)+"' and a.kode_lokasi='"+this.app._lokasi+"' "+vUnion ,
						"select count(distinct a.kode_drk)  from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.e_periode.getText().substr(0,4)+"%' and b.kode_akun='"+sender.cells(0,row)+"' and b.kode_pp = '"+sender.cells(5,row)+"' and a.kode_lokasi='"+this.app._lokasi+"' ",
						["a.kode_drk","a.nama"],"and",["Kode DRK","Nama DRK"],false);
			}			
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doCellEnter: function(sender, col, row){
		switch(col){
			case 2 : 
					if (sender.cells(2,row) == ""){
						sender.setCell(2,row,"C");						
					}
				break;
			case 3 : 
					if (sender.cells(3,row) == ""){
						if (row == 0) sender.setCell(3,row,this.e_ket.getText());
						else sender.setCell(3,row,sender.cells(3,(row-1)) );
					}
				break;			
			case 5 : 
					if (sender.cells(5,row) == "") {
						if (row == 0) sender.setCell(5,row,this.app._kodePP);
						else {
							sender.setCell(5,row,sender.cells(5,(row-1)));
							sender.setCell(6,row,sender.cells(6,(row-1)));
						}
					}
				break;							
		}
	}	
});
window.app_rra_transaksi_fFCRev = function(owner)
{
	if (owner)
	{
		window.app_rra_transaksi_fFCRev.prototype.parent.constructor.call(this,owner);
		this.className  = "app_rra_transaksi_fFCRev";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form PDRK RRA Anggaran: Review FC Sebelum Keep", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;server_report_report");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No Review",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_ket = new saiLabelEdit(this,{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});		
		this.c_modul = new saiCB(this,{bound:[20,22,200,20],caption:"Modul",items:["RRR"], readOnly:true,tag:2,change:[this,"doChange"]});		
		this.i_postAll = new portalui_imageButton(this,{bound:[225,22,20,20],hint:"App All",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		
		this.pc1 = new pageControl(this,{bound:[20,12,900,287], childPage:["Data RRA","Detail Transaksi","PDRK - 1","PDRK - 2","PDRK - 3","PDRK - 4(CAPEX)"]});
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,10,this.pc1.width-5,this.pc1.height-40],colCount:7,tag:0,
		            colTitle:["Status","No Bukti","No Dokumen","Tanggal","Keterangan","Jenis","NIK Keep"],
					colWidth:[[6,5,4,3,2,1,0],[100,50,290,70,200,150,80]],
					columnReadOnly:[true,[0,1,2,3,4,5],[]],
					buttonStyle:[[0,1],[bsAuto, bsEllips]], ellipsClick:[this,"doEllipsClick"],
					picklist:[[0],[new portalui_arrayMap({items:["APP","INPROG"]})]],
					change:[this,"doChangeCells"],dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});		
		this.sg2 = new saiGrid(this.pc1.childPage[1],{bound:[1,10,this.pc1.width-5,this.pc1.height-40],colCount:10,tag:9,
					colTitle:["Bulan","Kode CC","Nama CC","Kode DRK","Nama DRK","Kode Akun","Nama Akun","Jenis","Nilai","Target"],
					colWidth:[[9,8,7,6,5,4,3,2,1,0],[100,130,80,150,70,60,60,150,70,50]],
					columnReadOnly:[true,[0,1,2,3,4,5,6,7,8,9],[]],
					colFormat:[[8],[cfNilai]],
					defaultRow:1,autoAppend:false});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg2});
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);
		var cnv = this.pc1.childPage[2].getClientCanvas();
		this.docPDRK1 = document.createElement("iframe");
		this.docPDRK1.frameBorder = 0;
		this.docPDRK1.id = this.getFullId()+"_pdrk1";
		this.docPDRK1.style.cssText = "width:100%;height:100%;background:#ffffff";
		cnv.appendChild(this.docPDRK1);
		cnv = this.pc1.childPage[3].getClientCanvas();
		this.docPDRK2 = document.createElement("iframe");
		this.docPDRK2.frameBorder = 0;
		this.docPDRK2.id = this.getFullId()+"_pdrk2";
		this.docPDRK2.style.cssText = "width:100%;height:100%;background:#ffffff";
		cnv.appendChild(this.docPDRK2);
		cnv = this.pc1.childPage[4].getClientCanvas();
		this.docPDRK3 = document.createElement("iframe");
		this.docPDRK3.frameBorder = 0;
		this.docPDRK3.id = this.getFullId()+"_pdrk3";
		this.docPDRK3.style.cssText = "width:100%;height:100%;background:#ffffff";
		cnv.appendChild(this.docPDRK3);
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
			this.report = new server_report_report();
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_rra_transaksi_fFCRev.extend(window.childForm);
window.app_rra_transaksi_fFCRev.implement({
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
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{				
					this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"rra_app_m","no_app","FCRK-"+this.e_periode.getText().substr(2,4)+".","0000"));
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("insert into rra_app_m(no_app, kode_lokasi,tanggal,keterangan,modul,periode,no_del,nik_buat,nik_app,nik_user,tgl_input,jenis_form) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.c_modul.getText()+"','"+this.e_periode.getText()+"','-','"+this.app._userLog+"','"+this.app._userLog+"','"+this.app._userLog+"',now(),'FCREV')");
					var line;
					for (var i=0;i < this.dataJU.rs.rows.length;i++){
						line = this.dataJU.rs.rows[i];
						if (line.status.toUpperCase() == "APP"){
							sql.add("insert into rra_app_d(no_app,modul,no_bukti,kode_lokasi,sts_pdrk,catatan) values "+
									"('"+this.e_nb.getText()+"','"+this.c_modul.getText()+"','"+line.no_bukti+"','"+this.app._lokasi+"','"+line.jenis.toUpperCase()+"','"+line.no_dokumen+"')");
							sql.add("update rra_pdrk_m set progress='F1' where no_pdrk = '"+line.no_dokumen+"' and kode_lokasi = '"+this.app._lokasi+"'");
							if (line.jenis.toUpperCase() == "REV") sql.add("update rra_rev_m set flag_rfc='0', nik_keep='"+line.nik_keep+"' where no_rev='"+line.no_bukti+"' and kode_lokasi='"+this.app._lokasi+"'");
							if (line.jenis.toUpperCase() == "GREV") sql.add("update rra_grev_m set flag_rfc='0', nik_keep='"+line.nik_keep+"' where no_grev='"+line.no_bukti+"' and kode_lokasi='"+this.app._lokasi+"'");
							if (line.jenis.toUpperCase() == "MREV") sql.add("update rra_mrev_m set flag_rfc='0', nik_keep='"+line.nik_keep+"' where no_mrev='"+line.no_bukti+"' and kode_lokasi='"+this.app._lokasi+"'");
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
					this.c_modul.setText("");
					this.sg.setTag("0");
					this.dataJU.rs.rows = [];
					this.sg.clear(1); this.sg2.clear(1);
					this.pc1.setActivePage(this.pc1.childPage[0]);
					setTipeButton(tbSimpan);
				break;
			case "simpan" :					
				var isAda = false;
				for (var i=0;i < this.dataJU.rs.rows.length;i++){
					if (this.dataJU.rs.rows[i].status == "APP") isAda = true;
				}
				if (!isAda){
					system.alert(this,"Transaksi tidak valid.","Tidak ada transaksi dengan status APP.");
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
		this.e_periode.setText(y+""+m);
		this.doClick(this.i_gen);
	},
	doClick:function(sender){
		if (sender == this.i_gen) {
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"rra_app_m","no_app","FCRK-"+this.e_periode.getText().substr(2,4)+".","0000"));
			this.e_ket.setFocus();
		}
		if (sender == this.i_postAll) {
			for (var i=0;i < this.dataJU.rs.rows.length;i++){
				this.dataJU.rs.rows[i].status = "APP";
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
					case "RRR" :					
						strSQL = "select 'INPROG' as status,a.no_rev as no_bukti,a.no_pdrk as no_dokumen,date_format(b.tanggal,'%d-%m-%Y') as tanggal,b.keterangan,'REV' as jenis, '"+this.app._userLog+"' as nik_keep "+
										 "from rra_rev_m a inner join rra_pdrk_m b on a.no_pdrk=b.no_pdrk and a.kode_lokasi=b.kode_lokasi "+
										 (this.app._statusLokasiUser == "FC" ? "" : " inner join rra_finop_ubis cc on cc.kode_ubis = a.kode_ubis and cc.kode_lokasi = a.kode_lokasi and cc.kode_cc = '"+this.app._kodeCC+"' ")+
										 "where a.sts_pdrk='RRR' and a.progress in ('-','0','1') and a.flag_rfc='-' and a.periode<='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
										 "union "+
										 "select 'INPROG' as status,a.no_grev as no_bukti,a.no_pdrk as no_dokumen,date_format(b.tanggal,'%d-%m-%Y') as tanggal,b.keterangan,'GREV' as jenis, '"+this.app._userLog+"' as nik_keep "+
										 "from rra_grev_m a inner join rra_pdrk_m b on a.no_pdrk=b.no_pdrk and a.kode_lokasi=b.kode_lokasi "+
										 (this.app._statusLokasiUser == "FC" ? "" : " inner join rra_finop_ubis cc on cc.kode_ubis = a.kode_ubis and cc.kode_lokasi = a.kode_lokasi and cc.kode_cc = 'XX' ")+
										 "where a.sts_pdrk='RRR' and a.progress in ('1','0') and a.flag_rfc = '-' and a.periode<='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
										 "union "+
										 "select 'INPROG' as status,a.no_mrev as no_bukti,a.no_pdrk as no_dokumen,date_format(b.tanggal,'%d-%m-%Y') as tanggal,b.keterangan,'MREV' as jenis, '"+this.app._userLog+"' as nik_keep "+
										 "from rra_mrev_m a inner join rra_pdrk_m b on a.no_pdrk=b.no_pdrk and a.kode_lokasi=b.kode_lokasi "+
										 (this.app._statusLokasiUser == "FC" ? "" : " inner join rra_finop_ubis cc on cc.kode_ubis = a.kode_ubis and cc.kode_lokasi = a.kode_lokasi and cc.kode_cc = 'XX' ")+
										 "where a.sts_pdrk='RRR' and a.progress in ('1','0') and a.flag_rfc='-' and a.periode<='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' ";
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
	},
	doTampilData: function(page) {
		this.sg.clear(); this.sg2.clear(1);
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];							
			this.sg.appendData([line.status.toUpperCase(),line.no_bukti,line.no_dokumen,line.tanggal,line.keterangan,line.jenis.toUpperCase(),line.nik_keep]);
		}
		this.sg.setNoUrut(start);
	},
	doChangeCells: function(sender, col , row) {
		if (col == 0) {
			this.dataJU.rs.rows[((this.page-1)*20) + row].status = this.sg.cells(0,row);
		}else if (col == 6)
			this.dataJU.rs.rows[((this.page-1)*20) + row].nik_keep = this.sg.cells(6,row);
	},
	doDoubleClick: function(sender, col , row) {
		if (this.sg.cells(1,row) != "") {
			this.sg2.clear();
			var strSQL = "";
			switch(this.sg.cells(5,row)){
				case "REV" :
							strSQL = "select substring(a.periode,5,2) as bulan,a.kode_cc,b.nama as nama_cc,a.kode_drk,isnull(d.nama,'-') as nama_drk,a.kode_akun,c.nama as nama_akun,a.nilai,case a.dc when 'D' then 'TERIMA' else 'DONOR' end as dc,a.target "+
									 "from rra_rev_d a inner join rra_cc b on a.kode_cc=b.kode_cc and a.kode_lokasi=b.kode_lokasi "+
									 "				   inner join rra_masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi "+
									 "				   left join rra_drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun=substring(a.periode,1,4)  "+
									 "where a.no_rev = '"+this.sg.cells(1,row)+"' and a.kode_lokasi = '"+this.app._lokasi+"' order by a.dc";
					break;
				case "GREV" :
							strSQL = "select substring(a.periode,5,2) as bulan,a.kode_cc,b.nama as nama_cc,a.kode_drk,isnull(d.nama,'-') as nama_drk,a.kode_akun,c.nama as nama_akun,a.nilai,case a.dc when 'D' then 'TERIMA' else 'DONOR' end as dc,a.target "+
									 "from rra_grev_d a inner join rra_cc b on a.kode_cc=b.kode_cc and a.kode_lokasi=b.kode_lokasi "+
									 "			 	    inner join rra_masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi "+
									 "				    left join rra_drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun=substring(a.periode,1,4)  "+
									 "where a.no_grev = '"+this.sg.cells(1,row)+"' and a.kode_lokasi = '"+this.app._lokasi+"' order by a.dc";
					break;
				case "MREV" :
							strSQL = "select substring(a.periode,5,2) as bulan,a.kode_cc,b.nama as nama_cc,a.kode_drk,isnull(d.nama,'-') as nama_drk,a.kode_akun,c.nama as nama_akun,a.nilai,case a.dc when 'D' then 'TERIMA' else 'DONOR' end as dc,a.target "+
									 "from rra_mrev_d a inner join rra_cc b on a.kode_cc=b.kode_cc and a.kode_lokasi=b.kode_lokasi "+
									 "			 	    inner join rra_masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi "+
									 "				    left join rra_drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun=substring(a.periode,1,4)  "+
									 "where a.no_mrev = '"+this.sg.cells(1,row)+"' and a.kode_lokasi = '"+this.app._lokasi+"' order by a.dc";
					break;
			}
			
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg2.appendData([line.bulan,line.kode_cc,line.nama_cc,line.kode_drk,line.nama_drk,line.kode_akun,line.nama_akun,line.dc.toUpperCase(),floatToNilai(line.nilai),line.target]);
				}
			} else this.sg.clear(1);
			this.pc1.setActivePage(this.pc1.childPage[1]);
			try{
				this.filter = "where a.no_pdrk='"+this.sg.cells(2,row)+"'";
				this.showFilter = "";
				this.lokasi = "";
				this.filter2 = "";
				this.docPDRK1.src = this.report.previewWithHeader("server_report_rra_rptPdrk1",this.filter, 1,1, this.showFilter, this.lokasi,this.filter2);
				this.docPDRK2.src = this.report.previewWithHeader("server_report_rra_rptPdrk2",this.filter, 1,1, this.showFilter, this.lokasi,this.filter2);
				this.docPDRK3.src = this.report.previewWithHeader("server_report_rra_rptPdrk3",this.filter, 1,1, this.showFilter, this.lokasi,this.filter2);
				//rpt1
				//rpt2
				//rpt3
			}catch(e){
				alert(e);
			}
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
							system.info(this,"transaksi telah sukses tersimpan","(No Bukti : "+ this.e_nb.getText()+")");
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	},
	doEllipsClick: function(sender, col, row){
		if (col == 6)
			this.standarLib.ListDataSGFilter(this, "Data Karyawan",sender, row, col,
					"select nik, nama from rra_ubis where kode_lokasi = '"+this.app._lokasi+"' ",
					"select count(*) from rra_ubis  where kode_lokasi = '"+this.app._lokasi+"' ",
					["kode_ubis","nama"],"and",["Kode","Nama"]);
	}
});

window.app_saku2_transaksi_aka_aka2_fMhsUpdateTrans = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_aka_aka2_fMhsUpdateTrans.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_aka_aka2_fMhsUpdateTrans";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Update Status Mahasiswa", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;pageControl;portalui_saiMemo");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,200,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,98,18],selectDate:[this,"doSelectDate"]}); 
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_aktif = new saiLabelEdit(this,{bound:[820,12,200,20],caption:"Total Aktif", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
		this.e_ket = new saiLabelEdit(this,{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});						
		this.e_non = new saiLabelEdit(this,{bound:[820,17,200,20],caption:"Total Non", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
		
		this.bTampil = new button(this,{bound:[620,17,80,20],caption:"Data Bill", click:[this,"doLoad"]});
		
		this.pc1 = new pageControl(this,{bound:[20,12,1000,320], childPage:["Data Mahasiswa","Data Aktif","Data NonAktif"]});
		this.sg1 = new portalui_saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-30],colCount:2,tag:9,
				colTitle:["NIM","Status"],
				colWidth:[[1,0],[150,150]],
				pasteEnable:true,autoPaging:true,rowPerPage:20,afterPaste:[this,"doAfterPaste"],
				readOnly:true, defaultRow:1
		});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3, grid:this.sg1, pager:[this,"doPage"]});		
		
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);	
		
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			
								
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
window.app_saku2_transaksi_aka_aka2_fMhsUpdateTrans.extend(window.childForm);
window.app_saku2_transaksi_aka_aka2_fMhsUpdateTrans.implement({	
	doAfterPaste: function(sender,totalRow){
		try {
			this.sgn.setTotalPage(sender.getTotalPage());
			this.sgn.rearrange();											
		} catch(e) {alert(e);}
	},
	doPage1: function(sender,page){
		this.sg1.doSelectPage(page);
	},	
	doRekon:function(sender){				
		try {
			for (var i=0;i < this.dataJU.rs.rows.length;i++){
				this.dataJU.rs.rows[i].lunas=0;
			}							
			//colTitle:["NIM","Nilai Bayar","ID Bank","Nilai Rekon","Sisa"],
			var sisa = 0;
			for (var i=0; i < this.sg1.getRowCount();i++){
				var nilaiAwal = nilaiToFloat(this.sg1.cells(1,i));				
				var nilaiBayar = nilaiToFloat(this.sg1.cells(1,i));				
				for (var j=0;j < this.dataJU.rs.rows.length;j++){
					if (this.sg1.cells(0,i) == this.dataJU.rs.rows[j].nim && nilaiBayar > 0) {						
						if (nilaiBayar > (parseFloat(this.dataJU.rs.rows[j].saldo)-parseFloat(this.dataJU.rs.rows[j].lunas))) {
							nilaiBayar = nilaiBayar - (parseFloat(this.dataJU.rs.rows[j].saldo)-parseFloat(this.dataJU.rs.rows[j].lunas));
							parseFloat(this.dataJU.rs.rows[j].lunas) += (parseFloat(this.dataJU.rs.rows[j].saldo)-parseFloat(this.dataJU.rs.rows[j].lunas));
							
							this.dataJU.rs.rows[j].id_bank = this.sg1.cells(2,i);
						}
						else {							
							parseFloat(this.dataJU.rs.rows[j].lunas) += nilaiBayar;							
							nilaiBayar = 0;
							
							this.dataJU.rs.rows[j].id_bank = this.sg1.cells(2,i);
							break;
						}
						
					}
				}				
				var terpakai = nilaiAwal - nilaiBayar;
				this.sg1.cells(3,i,floatToNilai(terpakai))
				this.sg1.cells(4,i,floatToNilai(nilaiBayar))
				sisa += nilaiBayar;
			}
			
			var line; var tot = 0;
			for (var i=0;i < this.dataJU.rs.rows.length;i++){
				line = this.dataJU.rs.rows[i];
				tot = tot + parseFloat(line.lunas);
			}
			this.e_nilai.setText(floatToNilai(tot));
			this.e_sisa.setText(floatToNilai(sisa));
			
			this.pc1.setActivePage(this.pc1.childPage[1]);			
			this.doTampilData(1);			
		}
		catch(e) {
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
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"aka_rekon_m","no_rekon",this.app._lokasi+"-REK"+this.e_periode.getText().substr(2,4)+".","0000"));
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{													
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("insert into aka_rekon_m(no_rekon,no_dokumen,tanggal,keterangan,nilai,posted,modul,akun_titip,nim,nik_buat,nik_app,kode_lokasi,periode,nik_user,tgl_input) values "+
						    "('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"',"+parseNilai(this.e_nilai.getText())+",'F','"+this.c_status.getText()+"','"+this.cb_titip.getText()+"','-','"+this.cb_buat.getText()+"','"+this.cb_app.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate())");
					
					sql.add("insert into aka_rekon_j(no_rekon,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
							"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',0,'"+this.cb_titip.getText()+"','"+this.e_ket.getText()+"','D',"+parseNilai(this.e_nilai.getText())+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','"+this.c_status.getText()+"','TTP','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");					
					
					this.doHitungAR();
					var line = undefined;
					for (var i in this.gridAR.objList){
						line = this.gridAR.get(i);
						sql.add("insert into aka_rekon_j(no_rekon,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
								"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',"+i+",'"+line.get("kode_akun")+"','"+this.e_ket.getText()+"','C',"+parseFloat(line.get("nilai"))+",'"+line.get("kode_pp")+"','-','"+this.app._lokasi+"','"+this.c_status.getText()+"','PIUT','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");
					}											
					for (var i=0;i < this.dataJU.rs.rows.length;i++){
						line = this.dataJU.rs.rows[i];
						if (parseFloat(line.lunas) != 0){
							sql.add("insert into aka_rekon_d(no_rekon,nim,no_inv,periode,nilai,kode_lokasi,akun_titip,akun_piutang,kode_produk,dc,modul,id_bank) values "+
									"('"+this.e_nb.getText()+"','"+line.nim+"','"+line.no_inv+"','"+this.e_periode.getText()+"',"+line.lunas+",'"+this.app._lokasi+"','"+this.cb_titip.getText()+"','"+line.akun_piutang+"','"+line.kode_produk+"','D','"+this.c_status.getText()+"','"+line.id_bank+"')");							
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
					this.sg.clear(1); this.sg1.clear(1); 
					setTipeButton(tbSimpan);
					this.pc1.setActivePage(this.pc1.childPage[0]);
				break;
			case "simpan" :	
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				for (var i=0;i < this.dataJU.rs.rows.length;i++){
					line = this.dataJU.rs.rows[i];
					if (parseFloat(line.lunas) > parseFloat(line.saldo)){
						system.alert(this,"Transaksi tidak valid.","Nilai pelunasan tidak boleh melebihi saldo. Inv : "+line.no_inv + " - " +line.kode_produk);
						return false;						
					}
				}
				if (nilaiToFloat(this.e_nilai.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai pelunasan tidak boleh nol atau kurang.");
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
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
		else this.e_periode.setText(this.app._periode);
		this.e_nb.setText("");		
	},
	doClick:function(sender){
		if (sender == this.i_gen) {
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"aka_rekon_m","no_rekon",this.app._lokasi+"-REK"+this.e_periode.getText().substr(2,4)+".","0000"));
			this.e_ket.setFocus();
		}
		if (sender == this.bRefresh) this.sg1.clear(1);
	},
	doLoad: function(sender){		
		if (this.cb_fak.getText() != "") {
			this.pc1.setActivePage(this.pc1.childPage[1]);
			this.e_piutang.setText("0");
			this.e_nilai.setText("0");		
			if (this.c_jenis.getText() == "ALL") {
				var strSQL = "select aa.nim,aa.nama as mhs,a.no_inv,a.periode,a.kode_produk,c.nama,a.akun_piutang,(a.nilai-isnull(b.tot_lunas,0)) as saldo,0 as lunas, '-' as id_bank,a.kode_pp "+						 
							 "from  "+
							 
							 "      ("+						 
							 "		select '20'+substring(no_inv,7,4) as periode,kode_lokasi,no_inv,nim,kode_produk,akun_piutang,kode_akt,kode_pp,kode_jalur,tahunaka,sum(case dc when 'D' then nilai else -nilai end) as nilai "+
							 "      from aka_bill_d "+
							 "		where kode_lokasi='"+this.app._lokasi+"' "+
							 "      group by kode_lokasi,no_inv,nim,kode_produk,akun_piutang,kode_akt,kode_pp,kode_jalur,tahunaka "+
							 "      ) a "+
							 
							 "      inner join aka_mahasiswa aa on aa.nim=a.nim and aa.kode_lokasi=a.kode_lokasi "+
							 "      inner join aka_produk c on a.kode_produk=c.kode_produk and a.kode_lokasi=c.kode_lokasi and a.kode_akt=c.kode_akt and a.kode_pp=c.kode_pp and a.kode_jalur=c.kode_jalur "+
							 "      inner join aka_produk_prior cc on c.kode_produk=cc.kode_produk and c.kode_lokasi=cc.kode_lokasi and a.tahunaka=cc.tahunaka "+
							 "		inner join aka_jurusan xx on aa.kode_jur=xx.kode_jur and aa.kode_lokasi=xx.kode_lokasi "+
							 "		inner join aka_fakultas yy on xx.kode_fakultas=yy.kode_fakultas and yy.kode_lokasi=xx.kode_lokasi "+
							 
							 "      left join (select no_inv,nim,kode_produk,kode_lokasi,sum(case dc when 'D' then nilai else -nilai end) as tot_lunas "+
							 "                 from aka_rekon_d group by nim,no_inv,kode_produk,kode_lokasi) b on a.nim=b.nim and a.no_inv=b.no_inv and a.kode_produk=b.kode_produk and a.kode_lokasi=b.kode_lokasi "+						 
							 
							 "where yy.kode_fakultas='"+this.cb_fak.getText()+"' and (a.nilai-isnull(b.tot_lunas,0)) > 0 and a.kode_lokasi = '"+this.app._lokasi+"' order by aa.nim,a.periode,cc.no_urut";		
			}
			else {
				var strSQL = "select aa.nim,aa.nama as mhs,a.no_inv,a.periode,a.kode_produk,c.nama,a.akun_piutang,(a.nilai-isnull(b.tot_lunas,0)) as saldo,0 as lunas, '-' as id_bank,a.kode_pp "+						 
							 "from  "+
							 
							 "      ("+						 
							 "		select '20'+substring(no_inv,7,4) as periode,kode_lokasi,no_inv,nim,kode_produk,akun_piutang,kode_akt,kode_pp,kode_jalur,tahunaka,sum(case dc when 'D' then nilai else -nilai end) as nilai "+
							 "      from aka_bill_d "+
							 "		where kode_lokasi='"+this.app._lokasi+"' "+
							 "      group by kode_lokasi,no_inv,nim,kode_produk,akun_piutang,kode_akt,kode_pp,kode_jalur,tahunaka "+
							 "      ) a "+
							 
							 "      inner join aka_mahasiswa aa on aa.nim=a.nim and aa.kode_lokasi=a.kode_lokasi "+
							 "      inner join aka_produk c on a.kode_produk=c.kode_produk and a.kode_lokasi=c.kode_lokasi and a.kode_akt=c.kode_akt and a.kode_pp=c.kode_pp and a.kode_jalur=c.kode_jalur "+
							 "      inner join aka_produk_prior cc on c.kode_produk=cc.kode_produk and c.kode_lokasi=cc.kode_lokasi and a.tahunaka=cc.tahunaka "+
							 "		inner join aka_jurusan xx on aa.kode_jur=xx.kode_jur and aa.kode_lokasi=xx.kode_lokasi "+
							 "		inner join aka_fakultas yy on xx.kode_fakultas=yy.kode_fakultas and yy.kode_lokasi=xx.kode_lokasi "+
							 
							 "      left join (select no_inv,nim,kode_produk,kode_lokasi,sum(case dc when 'D' then nilai else -nilai end) as tot_lunas "+
							 "                 from aka_rekon_d group by nim,no_inv,kode_produk,kode_lokasi) b on a.nim=b.nim and a.no_inv=b.no_inv and a.kode_produk=b.kode_produk and a.kode_lokasi=b.kode_lokasi "+						 
							 
							 "where yy.kode_fakultas='"+this.cb_fak.getText()+"' and a.periode = '"+this.c_periode2.getText()+"' and (a.nilai-isnull(b.tot_lunas,0)) > 0 and a.kode_lokasi = '"+this.app._lokasi+"' order by aa.nim,a.periode,cc.no_urut";					
			}
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				var line;
				var tot = 0;
				for (var i=0;i < this.dataJU.rs.rows.length;i++){
					line = this.dataJU.rs.rows[i];
					tot = tot + parseFloat(line.saldo);
				}		
				this.e_piutang.setText(floatToNilai(tot));
				this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn.rearrange();
				this.doTampilData(1);
			} else this.sg.clear(1);			
		}
		else {
			system.alert(this,"Data Fakultas tidak valid.","Data fakultas harus terisi.");
		}
	},
	doTampilData: function(page) {
		var line;
		this.sg.clear();
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];							
			this.sg.appendData([line.nim,line.mhs,line.no_inv,line.periode,line.kode_produk,line.nama,line.akun_piutang,floatToNilai(line.saldo),floatToNilai(line.lunas),line.id_bank,line.kode_pp]);
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
			if (parseFloat(line.lunas) != 0){
				kdAkun = line.akun_piutang;
				kdPP = line.kode_pp;
				nemu = false;
				ix = 0;
				for (var j in dtJurnal.objList){		
				  if ((kdAkun == dtJurnal.get(j).get("kode_akun")) && (kdPP == dtJurnal.get(j).get("kode_pp"))){
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
					row.set("nilai",parseFloat(line.lunas));
					dtJrnl++;
					dtJurnal.set(dtJrnl,row);						
				}
				else dtJurnal.get(ix).set("nilai",row.get("nilai") + parseFloat(line.lunas));
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
						  this.nama_report="server_report_saku2_kopeg_aka_rptAkRekonJurnal";
						  this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_rekon='"+this.e_nb.getText()+"' ";
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
			this.sg.clear(1); this.sg1.clear(1); 
			setTipeButton(tbSimpan);
			this.pc1.setActivePage(this.pc1.childPage[0]);
		} catch(e) {
			alert(e);
		}
	}
});
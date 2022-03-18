window.app_saku2_transaksi_aka_fRekonLoadTxtMaba = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_aka_fRekonLoadTxtMaba.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_aka_fRekonLoadTxtMaba";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Load Rekonsiliasi Pelunasan Tagihan CaMABA", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;pageControl;portalui_saiMemo");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No Rekon",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_ket = new saiLabelEdit(this,{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});				
		this.cb_app = new saiCBBL(this,{bound:[20,18,200,20],caption:"NIK Approve", multiSelection:false, maxLength:10, tag:2});		
		this.c_jenis = new saiCB(this,{bound:[20,13,182,20],caption:"Jenis",items:["PERIOD","ALL"], readOnly:true,tag:2}); 
		this.e_piutang = new saiLabelEdit(this,{bound:[720,13,200,20],caption:"Total Tagihan", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});						
		this.c_periode2 = new saiCB(this,{bound:[20,22,182,20],caption:"By Periode",readOnly:true,tag:2});		
		this.e_nilai = new saiLabelEdit(this,{bound:[720,22,200,20],caption:"Total Pelunasan", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
		this.bTampil = new button(this,{bound:[520,22,80,20],caption:"Data Tagihan", click:[this,"doLoad"]});
				
		this.pc1 = new pageControl(this,{bound:[20,12,900,327], childPage:["Data Tagihan","Data Pelunasan","Info Sisa"]});
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:8,tag:0,
		            colTitle:["No Tes","Nama","Periode","Kode Produk","Nama Produk","Saldo Tagihan","Nilai Pelunasan","ID Bank"],
					colWidth:[[7,6,5,4,3,2,1,0],[80,100,100,150,80,80,250,100]],
					colFormat:[[5,6],[cfNilai,cfNilai]],
					columnReadOnly:[true,[0,1,2,3,4,5,6,7],[]],
					nilaiChange:[this,"doNilaiChange"],
					autoAppend:false,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:bsAll,grid:this.sg,pager:[this,"doPager"]});	
		this.sg1 = new portalui_saiGrid(this.pc1.childPage[1],{bound:[0,5,this.pc1.width-5,this.pc1.height-35],colCount:4,
					colTitle:["No Tes","Nama","Nilai","ID Bank"],
					colWidth:[[3,2,1,0],[200,100,300,100]],
					colFormat:[[2],[cfNilai]],
					afterPaste:[this,"doAfterPaste"],pasteEnable:true,autoPaging:true,rowPerPage:20,
					readOnly:true, defaultRow:1
					});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3, grid:this.sg1, pager:[this,"selectPage"]});		
		
		this.e_memo = new saiMemo(this.pc1.childPage[2],{bound:[5,14,690,250],labelWidth:0,tag:9,readOnly:true});		
		
		this.rearrangeChild(10, 23);
		
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			
			this.cb_app.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Approval",true);
			var data = this.dbLib.getDataProvider("select a.flag,b.nama from spro a inner join karyawan b on a.flag=b.nik and a.kode_lokasi=b.kode_lokasi where kode_spro='ARAPP' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_app.setText(line.flag,line.nama);
			} else this.cb_app.setText("","");
			
			this.c_periode2.items.clear();
			var data = this.dbLib.getDataProvider("select distinct periode as periode from aka_mababill_m where kode_lokasi='"+this.app._lokasi+"' order by periode desc",true);
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
window.app_saku2_transaksi_aka_fRekonLoadTxtMaba.extend(window.childForm);
window.app_saku2_transaksi_aka_fRekonLoadTxtMaba.implement({
	doAfterPaste: function(sender,totalRow){
		try {
			this.sgn1.setTotalPage(sender.getTotalPage());
			this.sgn1.rearrange();			
			this.doCek2();						
		} catch(e) {alert(e);}
	},
	selectPage: function(sender,page){
		this.sg1.doSelectPage(page);
	},
	doCek2:function(sender){										
		var msg  = ""; this.e_memo.setText("");
		for (var i=0;i < this.dataJU.rs.rows.length;i++){
			this.dataJU.rs.rows[i].lunas=0;
		}					
		for (var i=0; i < this.sg1.getRowCount();i++){			
			var nilaiLoad = nilaiToFloat(this.sg1.cells(2,i));		
			for (var j=0;j < this.dataJU.rs.rows.length;j++){
				if (this.sg1.cells(0,i) == this.dataJU.rs.rows[j].no_tes && nilaiLoad > 0) {						
					if (nilaiLoad > (this.dataJU.rs.rows[j].tagih-this.dataJU.rs.rows[j].bayar-this.dataJU.rs.rows[j].lunas)) {
						nilaiLoad = nilaiLoad - (this.dataJU.rs.rows[j].tagih-this.dataJU.rs.rows[j].bayar-this.dataJU.rs.rows[j].lunas);
						this.dataJU.rs.rows[j].lunas += (this.dataJU.rs.rows[j].tagih-this.dataJU.rs.rows[j].bayar-this.dataJU.rs.rows[j].lunas);
					}
					else {							
						this.dataJU.rs.rows[j].lunas += nilaiLoad;							
						nilaiLoad = 0;
					}
					this.dataJU.rs.rows[j].id_bank = this.sg1.cells(3,i)
				}
			}				
			if (nilaiLoad != 0) {					
				msg+= "No TES : "+this.sg1.cells(0,i)+" - Sisa : "+floatToNilai(nilaiLoad)+"; \n";
			}
		}
		this.e_memo.setText(msg);
		
		var line;
		var tot = 0;
		for (var i=0;i < this.dataJU.rs.rows.length;i++){
			line = this.dataJU.rs.rows[i];
			tot = tot + parseFloat(line.lunas);
		}
		this.e_nilai.setText(floatToNilai(tot));
		
		this.pc1.setActivePage(this.pc1.childPage[0]);
		this.doTampilData(1);
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
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"aka_rekon_m","no_rekon",this.app._lokasi+"-MBR"+this.e_periode.getText().substr(2,4)+".","000"));
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{													
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("insert into aka_mabarekon_m(no_rekon,no_dokumen,tanggal,keterangan,nilai,modul,nik_app,kode_lokasi,periode,nik_user,tgl_input) values "+
						    "('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"',"+parseNilai(this.e_nilai.getText())+",'REKONMABA','"+this.cb_app.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate())");
											
					for (var i=0;i < this.dataJU.rs.rows.length;i++){
						line = this.dataJU.rs.rows[i];
						if (parseFloat(line.lunas) != 0){
							sql.add("insert into aka_mabarekon_d(no_rekon,no_tes,periode,nilai,kode_lokasi,kode_produk,dc,modul,id_bank) values "+
									"	('"+this.e_nb.getText()+"','"+line.no_tes+"','"+this.e_periode.getText()+"',"+line.lunas+",'"+this.app._lokasi+"','"+line.kode_produk+"','D','LOAD','"+line.id_bank+"')");
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
					setTipeButton(tbSimpan);
					this.pc1.setActivePage(this.pc1.childPage[0]);
				break;
			case "simpan" :	
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				for (var i=0;i < this.dataJU.rs.rows.length;i++){
					line = this.dataJU.rs.rows[i];
					if (parseFloat(line.lunas) > (parseFloat(line.tagih)-parseFloat(line.bayar))){
						system.alert(this,"Transaksi tidak valid.","Nilai pelunasan tidak boleh melebihi saldo. No Tes : "+line.no_tes + " - " +line.kode_produk);
						return false;						
					}
				}
				if (nilaiToFloat(this.e_nilai.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai pelunasan tidak boleh nol atau kurang.");
					return false;						
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
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"aka_mabarekon_m","no_rekon",this.app._lokasi+"-MBR"+this.e_periode.getText().substr(2,4)+".","000"));
			this.e_ket.setFocus();
		}
		if (sender == this.bRefresh) this.sg1.clear(1);
	},
	doLoad: function(sender){		
		this.e_piutang.setText("0");
		this.e_nilai.setText("0");		
		if (this.c_jenis.getText() == "ALL") {			
			var strSQL = "select a.no_tes,a.nama as mhs,a.periode,a.kode_produk,c.nama,a.nilai as tagih,isnull(x.tot_batal,0)+isnull(b.tot_lunas,0) as bayar,0 as lunas, '-' as id_bank "+
						 "from aka_mababill_d a "+						
						 "      inner join aka_mabaproduk c on a.kode_produk=c.kode_produk and a.kode_lokasi=c.kode_lokasi "+
						 "      left join (select no_tes,kode_produk,kode_lokasi,sum(case dc when 'D' then nilai else -nilai end) as tot_lunas "+
						 "                 from aka_mabarekon_d group by no_tes,kode_produk,kode_lokasi) b on a.no_tes=b.no_tes and a.kode_produk=b.kode_produk and a.kode_lokasi=b.kode_lokasi "+
						 "      left join (select no_tes,kode_produk,kode_lokasi,sum(case dc when 'D' then nilai else -nilai end) as tot_batal "+
						 "                 from aka_mababatal_d group by no_tes,kode_produk,kode_lokasi) x on a.no_tes=x.no_tes and a.kode_produk=x.kode_produk and a.kode_lokasi=x.kode_lokasi "+						 
						 "where a.kode_lokasi = '"+this.app._lokasi+"' order by a.no_tes,a.periode,c.no_urut";		
		}
		else {
			var strSQL = "select a.no_tes,a.nama as mhs,a.periode,a.kode_produk,c.nama,a.nilai as tagih,isnull(x.tot_batal,0)+isnull(b.tot_lunas,0) as bayar,0 as lunas, '-' as id_bank  "+
						 "from aka_mababill_d a "+						 
						 "      inner join aka_mabaproduk c on a.kode_produk=c.kode_produk and a.kode_lokasi=c.kode_lokasi "+
						 "      left join (select no_tes,kode_produk,kode_lokasi,sum(case dc when 'D' then nilai else -nilai end) as tot_lunas "+
						 "                 from aka_mabarekon_d group by no_tes,kode_produk,kode_lokasi) b on a.no_tes=b.no_tes and a.kode_produk=b.kode_produk and a.kode_lokasi=b.kode_lokasi "+
						 "      left join (select no_tes,kode_produk,kode_lokasi,sum(case dc when 'D' then nilai else -nilai end) as tot_batal "+
						 "                 from aka_mababatal_d group by no_tes,kode_produk,kode_lokasi) x on a.no_tes=x.no_tes and a.kode_produk=x.kode_produk and a.kode_lokasi=x.kode_lokasi "+						 
						 "where a.periode = '"+this.c_periode2.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' order by a.no_tes,a.periode,c.no_urut";		
		}
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			var line;
			var tot = 0;
			for (var i=0;i < this.dataJU.rs.rows.length;i++){
				line = this.dataJU.rs.rows[i];
				tot = tot + parseFloat(line.tagih)-parseFloat(line.bayar);
			}		
			this.e_piutang.setText(floatToNilai(tot));
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
			var saldo = parseFloat(line.tagih)-parseFloat(line.bayar);
			if (saldo != 0) {			
				this.sg.appendData([line.no_tes,line.mhs,line.periode,line.kode_produk,line.nama,floatToNilai(saldo),floatToNilai(line.lunas),line.id_bank]);
			}
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
			this.sg.clear(1);  this.sg1.clear(1); 
			setTipeButton(tbSimpan);
			this.pc1.setActivePage(this.pc1.childPage[0]);
		} catch(e) {
			alert(e);
		}
	}
});
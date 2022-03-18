window.app_saku3_transaksi_yspt_dikti_fDisBPP = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_yspt_dikti_fDisBPP.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_yspt_dikti_fDisBPP";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Distribusi PYT", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_ket = new saiLabelEdit(this,{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});		
		this.e_nilai = new saiLabelEdit(this,{bound:[820,17,200,20],caption:"Total Distribusi", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.bTampil = new portalui_button(this,{bound:[720,17,80,18],caption:"Tampil Data",click:[this,"doLoadData"]});		
	
		this.p1 = new panel(this,{bound:[20,23,1000,383],caption:"Data Jurnal"});
		this.sg = new saiGrid(this.p1,{bound:[1,20,this.p1.width-5,this.p1.height-50],colCount:8,tag:0,
		            colTitle:["Akun PYT","Nama Akun","Akun PDPT","Nama Akun","Kode PP","Nama PP","Nilai","DRK"],
					colWidth:[[7,6,5,4,3,2,1,0],[80,100,170,80,170,80,170,80]],
					colFormat:[[6],[cfNilai]],readOnly: true,autoAppend:false,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[1,this.p1.height-25,this.p1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});	
		
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
window.app_saku3_transaksi_yspt_dikti_fDisBPP.extend(window.childForm);
window.app_saku3_transaksi_yspt_dikti_fDisBPP.implement({
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
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"trans_m","no_bukti",this.app._lokasi+"-PYT"+this.e_periode.getText().substr(2,4)+".","0000"));
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{													
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();

					sql.add("insert into trans_m (no_bukti,kode_lokasi,tgl_input,nik_user,periode,modul,form,posted,prog_seb,progress,kode_pp,tanggal,due_date,no_dokumen,keterangan,kode_curr,kurs,nilai1,nilai2,nilai3,nik1,nik2,nik3,no_ref1,no_ref2,no_ref3,param1,param2,param3) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','AR','MHSDIST','F','-','-','"+this.app._kodePP+"','"+this.dp_d1.getDateString()+"','"+this.dp_d1.getDateString()+"', '-','"+this.e_ket.getText()+"','IDR',1,"+
							parseNilai(this.e_nilai.getText())+",0,0,'-','-','-','-','-','-','-','-','-')");
					
					var line;
					var j = 0;
					for (var i=0;i < this.dataJU.rs.rows.length;i++){
						line = this.dataJU.rs.rows[i];
						j = i+1000;
						sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
								"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','-','"+this.dp_d1.getDateString()+"',"+i+",'"+line.akun_pyt+"','D',"+parseFloat(line.nilai_distribusi)+","+
								parseFloat(line.nilai_distribusi)+",'"+this.e_ket.getText()+"','MHSDIST','PYT','IDR',1,'"+line.kode_pp+"','-','-','-','-','-','-','-','-')");											
						sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
								"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','-','"+this.dp_d1.getDateString()+"',"+j+",'"+line.akun_pdpt+"','C',"+parseFloat(line.nilai_distribusi)+","+
								parseFloat(line.nilai_distribusi)+",'"+this.e_ket.getText()+"','MHSDIST','PDPT','IDR',1,'"+line.kode_pp+"','"+line.kode_drk+"','-','-','-','-','-','-','-')");											
					}			
					
					sql.add("insert into dikti_pyt_dis(no_pyt,kode_lokasi,no_bill,nim,periode,nilai,kode_param,akun_pyt,akun_pdpt,kode_pp,kode_drk,dc,no_del) "+
							"SELECT "+
							"'"+this.e_nb.getText()+"','"+this.app._lokasi+"',a.no_bill,a.nim,'"+this.e_periode.getText()+"', "+
							"SUM( "+
							"	case when (a.nilai_pyt - ISNULL(c.tot_dis,0)) > ceiling((a.pyt_bulan * b.jml_umur)-ISNULL(c.tot_dis,0)) "+
							"	then ceiling(a.pyt_bulan * b.jml_umur)-ISNULL(c.tot_dis,0) "+
							"	else a.nilai_pyt - ISNULL(c.tot_dis,0) "+
							"	end "+
							"	) "+							
							",a.kode_param,a.akun_pyt,a.akun_pdpt,a.kode_pp,a.kode_drk,'D','-' "+
							"FROM "+
							"( "+
							"	select a.kode_lokasi,a.no_bill+a.nim as no_inv,a.kode_param,b.akun_pyt,b.akun_pdpt,b.kode_drk,d.kode_pp,a.no_bill,a.nim, "+
							"	sum(a.nilai) as nilai_pyt,"+
							"	sum(case dc when 'D' then a.nilai/6 else -a.nilai/6 end) as pyt_bulan "+
							"	from dikti_bill_d a "+
							"	inner join dikti_param b on a.kode_param=b.kode_param and a.kode_lokasi=b.kode_lokasi and b.akun_pyt<>'-' "+
							"	inner join dikti_mhs c on a.nim=c.nim and a.kode_lokasi=c.kode_lokasi "+
							"	inner join dikti_jur d on c.kode_jur=d.kode_jur and c.kode_lokasi=d.kode_lokasi "+
							"	where a.periode_dis <='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
							"	group by a.kode_lokasi,a.no_bill+a.nim,a.kode_param,b.akun_pyt,b.akun_pdpt,b.kode_drk,d.kode_pp,a.no_bill,a.nim "+
							") a "+
							"INNER JOIN "+ 
							"( "+
							"	select a.kode_lokasi,a.no_bill+a.nim as no_inv,a.kode_param,COUNT(c.periode) as jml_umur "+
							"	from dikti_bill_d a "+
							"	inner join dikti_param b on a.kode_param=b.kode_param and a.kode_lokasi=b.kode_lokasi and b.akun_pyt<>'-' "+
							"	inner join dikti_ta c on a.kode_ta=c.kode_ta and a.kode_lokasi=c.kode_lokasi and c.periode<='"+this.e_periode.getText()+"' "+
							"	where a.periode_dis <='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
							"	group by a.kode_lokasi,a.no_bill+a.nim,a.kode_param "+
							") b on a.kode_lokasi=b.kode_lokasi and a.no_inv=b.no_inv and a.kode_param=b.kode_param "+
							"LEFT JOIN "+
							"( "+
							"	select kode_lokasi,no_bill+nim as no_inv,kode_param,sum(case dc when 'D' then nilai else -nilai end) as tot_dis "+
							"	from dikti_pyt_dis "+ 
							"	where kode_lokasi = '"+this.app._lokasi+"' and periode<='"+this.e_periode.getText()+"' "+
							"	group by kode_lokasi,no_bill+nim,kode_param "+
							") c on a.kode_lokasi=c.kode_lokasi and a.no_inv=c.no_inv and a.kode_param=c.kode_param "+
							"GROUP BY a.kode_param,a.akun_pyt,a.akun_pdpt,a.kode_pp,a.kode_drk,a.no_bill,a.nim ");
					
					var perNext = nextNPeriode(this.e_periode.getText(),1);		
					sql.add("update a set periode_dis='"+perNext+"' "+
						    "from dikti_bill_d a inner join dikti_pyt_dis b on a.no_bill=b.no_bill and a.nim=b.nim and a.kode_param=b.kode_param and a.kode_lokasi=b.kode_lokasi "+
						    "where b.no_pyt='"+this.e_nb.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"'");		
							
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
					this.sg.setTag("0");
					this.dataJU.rs.rows = [];
					this.sg.clear(1); 
					setTipeButton(tbSimpan);
					this.doClick(this.i_gen);
				break;
			case "simpan" :	
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				if (nilaiToFloat(this.e_nilai.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Total Distribusi tidak boleh nol atau kurang.");
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
		this.e_periode.setText(y+""+m);
		this.doClick(this.i_gen);
	},
	doClick:function(sender){
		if (sender == this.i_gen) {
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"trans_m","no_bukti",this.app._lokasi+"-PYT"+this.e_periode.getText().substr(2,4)+".","0000"));
			this.e_ket.setFocus();
		}
	},
	doLoadData: function(sender){
		this.e_nilai.setText("0");		
		
		var strSQL = "select "+ 
					"a.akun_pyt,b.nama as nama_pyt, "+
					"a.akun_pdpt,c.nama as nama_pdpt, "+
					"a.kode_pp,d.nama as nama_pp, "+
					"a.kode_drk, "+
					"a.nilai_distribusi "+
					"from "+
					"( "+
						"SELECT "+
						"a.akun_pyt,a.akun_pdpt,a.kode_pp,a.kode_drk, "+
						"SUM( "+
						"	case when (a.nilai_pyt - ISNULL(c.tot_dis,0)) > ceiling((a.pyt_bulan * b.jml_umur)-ISNULL(c.tot_dis,0)) "+
						"	then ceiling(a.pyt_bulan * b.jml_umur)-ISNULL(c.tot_dis,0) "+
						"	else a.nilai_pyt - ISNULL(c.tot_dis,0) "+
						"	end "+
						"	) as nilai_distribusi "+

						"FROM "+
						"( "+
						"	select a.kode_lokasi,a.no_bill+a.nim as no_inv,a.kode_param,b.akun_pyt,b.akun_pdpt,b.kode_drk,d.kode_pp, "+
						"	sum(a.nilai) as nilai_pyt,"+
						"	sum(case dc when 'D' then a.nilai/6 else -a.nilai/6 end) as pyt_bulan "+
						"	from dikti_bill_d a "+
						"	inner join dikti_param b on a.kode_param=b.kode_param and a.kode_lokasi=b.kode_lokasi and b.akun_pyt<>'-' "+
						"	inner join dikti_mhs c on a.nim=c.nim and a.kode_lokasi=c.kode_lokasi "+
						"	inner join dikti_jur d on c.kode_jur=d.kode_jur and c.kode_lokasi=d.kode_lokasi "+
						"	where a.periode_dis <='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.modul='BILL' "+
						"	group by a.kode_lokasi,a.no_bill+a.nim,a.kode_param,b.akun_pyt,b.akun_pdpt,b.kode_drk,d.kode_pp "+
						") a "+
						"INNER JOIN "+ 
						"( "+
						"	select a.kode_lokasi,a.no_bill+a.nim as no_inv,a.kode_param,COUNT(c.periode) as jml_umur "+
						"	from dikti_bill_d a "+
						"	inner join dikti_param b on a.kode_param=b.kode_param and a.kode_lokasi=b.kode_lokasi and b.akun_pyt<>'-' "+
						"	inner join dikti_ta c on a.kode_ta=c.kode_ta and a.kode_lokasi=c.kode_lokasi and c.periode<='"+this.e_periode.getText()+"' "+
						"	where a.periode_dis <='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.modul='BILL' "+
						"	group by a.kode_lokasi,a.no_bill+a.nim,a.kode_param "+
						") b on a.kode_lokasi=b.kode_lokasi and a.no_inv=b.no_inv and a.kode_param=b.kode_param "+
						"LEFT JOIN "+
						"( "+
						"	select kode_lokasi,no_bill+nim as no_inv,kode_param,sum(case dc when 'D' then nilai else -nilai end) as tot_dis "+
						"	from dikti_pyt_dis "+ 
						"	where kode_lokasi = '"+this.app._lokasi+"' and periode<='"+this.e_periode.getText()+"' "+
						"	group by kode_lokasi,no_bill+nim,kode_param "+
						") c on a.kode_lokasi=c.kode_lokasi and a.no_inv=c.no_inv and a.kode_param=c.kode_param "+
						"GROUP BY a.akun_pyt,a.akun_pdpt,a.kode_pp,a.kode_drk "+
					") a	"+

					"inner join masakun b on a.akun_pyt=b.kode_akun and b.kode_lokasi='"+this.app._lokasi+"' "+
					"inner join masakun c on a.akun_pdpt=c.kode_akun and c.kode_lokasi='"+this.app._lokasi+"' "+
					"inner join pp d on a.kode_pp=d.kode_pp and d.kode_lokasi='"+this.app._lokasi+"' "+
					
					"where a.nilai_distribusi > 0";

		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			var line;
			var tot = 0;
			for (var i=0;i < this.dataJU.rs.rows.length;i++){
				line = this.dataJU.rs.rows[i];
				tot = tot + parseFloat(line.nilai_distribusi);
			}		
			this.e_nilai.setText(floatToNilai(tot));
			this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn.rearrange();
			this.doTampilData(1);
		} else this.sg.clear(1);				
	},
	doChange:function(sender){
		if (sender == this.e_periode) {			
			this.dataJU.rs.rows = [];
			this.sg.clear(1);			
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
			this.sg.appendData([line.akun_pyt,line.nama_pyt,line.akun_pdpt,line.nama_pdpt,line.kode_pp,line.nama_pp,floatToNilai(line.nilai_distribusi),line.kode_drk]);
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
							this.nama_report="server_report_saku3_dikti_rptJurnalPyt";
							this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_bukti='"+this.e_nb.getText()+"' ";
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
			this.sg.setTag("0");
			this.dataJU.rs.rows = [];
			this.sg.clear(1); 
			setTipeButton(tbSimpan);
		} catch(e) {
			alert(e);
		}
	}
});

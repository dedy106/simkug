window.app_saku3_transaksi_sapyakes_fPDDir2 = function(owner)
{
	if (owner)
	{		
		window.app_saku3_transaksi_sapyakes_fPDDir2.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_sapyakes_fPDDir2";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Approval Direksi", 0);	
		
		uses("saiCB;saiMemo;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");				
		uses("saiCBBL",true);
		
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,200,20],caption:"Periode",tag:2,readOnly:true,visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,98,18],selectDate:[this,"doSelectDate"]});		
		
		this.pc1 = new pageControl(this,{bound:[10,18,1000,430], childPage:["Daftar Bukti","Detail Bukti","Filter Data"]});		
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:12,tag:0,
		            colTitle:["No Aju","Status","NIK PD","Tgl Mulai","Tgl Selesai","Keg. Bidang","Kegiatan","Tempat","No Approve","Tgl Input","Kode PP","Jml Hari"],
					colWidth:[[11,10,9,8,7,6,5,4,3,2,1,0],[80,80,110,100,200,400,70,70,70,200,80,100]],
					colHide:[[10],[true]],					
					readOnly:true,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:bsAll,grid:this.sg,pager:[this,"doPager"]});
				
		this.c_status = new saiCB(this.pc1.childPage[1],{bound:[20,11,200,20],caption:"Status",items:["APPROVE","RETURN"], readOnly:true,tag:0});
		this.e_nb = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,10,200,20],caption:"No App", readOnly:true,visible:false});						
		this.e_memo = new saiMemo(this.pc1.childPage[1],{bound:[20,10,550,60],caption:"Catatan",tag:9,readOnly:true});				
		
		this.e_nobukti = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,220,20],caption:"No Aju", readOnly:true});		
		this.e_bidang = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,220,20],caption:"Keg. Bidang", readOnly:true});				
		this.e_tgl1 = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,14,220,20],caption:"Tgl Mulai", readOnly:true});
		this.e_tgl2 = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,15,220,20],caption:"Tgl Selesai", readOnly:true});
		this.e_jml = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,19,220,20],caption:"Jml Hari", readOnly:true});
		this.e_ket = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,16,450,20],caption:"Kegiatan", readOnly:true});					
		this.e_tempat = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,15,450,20],caption:"Tempat", readOnly:true});				
		this.e_nik = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,17,450,20],caption:"NIK PD", readOnly:true});
		
		this.cb_nb = new saiCBBL(this.pc1.childPage[2],{bound:[20,12,220,20],caption:"No Pengajuan", multiSelection:false, maxLength:10, tag:9,change:[this,"doChange"]});
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);	
		this.pc1.childPage[2].rearrangeChild(10, 23);	
				
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
				
		}catch(e){
			systemAPI.alert(e);
		}		
	}
};
window.app_saku3_transaksi_sapyakes_fPDDir2.extend(window.childForm);
window.app_saku3_transaksi_sapyakes_fPDDir2.implement({	
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
					if (this.c_status.getText() == "RETURN") var vStatus = "B"; else var vStatus = "2";										
					sql.add("update pdss_app_m set no_flag='"+this.e_nb.getText()+"' where no_bukti='"+this.e_nobukti.getText()+"' and no_flag='-' and form='APPDIR' and modul='PDSS'");
					
					sql.add("insert into pdss_app_m (no_app,kode_lokasi,tanggal,periode,tgl_input,nik_user,status,modul,form,no_bukti,catatan,no_flag,nik_bdh,nik_fiat) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"','"+this.e_periode.getText()+"',getdate(),'"+this.app._userLog+"','"+vStatus+"','PDSS','APPDIR','"+this.e_nobukti.getText()+"','"+this.e_memo.getText()+"','-','X','X')");
																				
					//---------------- flag bukti					
					sql.add("update pdss_aju_m set no_app2='"+this.e_nb.getText()+"',progress='"+vStatus+"' where no_aju='"+this.e_nobukti.getText()+"' ");
					sql.add("update yk_spj_m set progress='"+vStatus+"' where no_spj='"+this.e_nobukti.getText()+"'");
					
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
					this.doClick();
					this.doLoad();					
					this.pc1.setActivePage(this.pc1.childPage[0]);	
					this.e_memo.setText("");
					setTipeButton(tbAllFalse);
				break;
			case "simpan" :	
			case "ubah" :					
				this.preView = "1";				
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
				sql.add("delete from pdss_app_m where no_app='"+this.noAppLama+"' ");	
				sql.add("update pdss_aju_m set no_app2='-',progress='1' where no_aju='"+this.e_nobukti.getText()+"' ");	
				sql.add("update yk_spj_m set progress='1' where no_spj='"+this.e_nobukti.getText()+"'");
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
		this.cb_nb.setSQL("select a.no_aju, a.keterangan "+
						  "from pdss_aju_m a "+
						  "		inner join yk_spj_m b on a.no_aju = b.no_spj and b.posted='F' and b.modul='PDLOCAL2' "+
						  "where a.nik_app2='"+this.app._userLog+"' and a.periode<='"+this.e_periode.getText()+"' and b.progress in ('2','B') ",
						  ["no_aju","keterangan"],false,["No Aju","Deskripsi"],"and","Daftar Bukti",true);					

		if (this.stsSimpan == 1) this.doClick();
		this.doLoad();
	},	
	doChange:function(sender){						
		if (sender == this.cb_nb && this.cb_nb.getText() != "") {
			var strSQL = "select a.no_aju as no_bukti,case a.progress when '2' then 'APPROVE' else 'RETURN' end as status,x.mulai as tglawal,x.selesai as tglakhir,b.nama as bidang,a.tempat,a.keterangan,a.nik+' - '+a.nama as nik,a.no_app2,a.kode_lokasi,convert(varchar,a.tgl_input,120) as tglinput,a.kode_pp,x.jml "+
						 "from pdss_aju_m a "+
						 "	  inner join bidang b on a.kode_bidang=b.kode_bidang  "+
						 "	  inner join yk_spj_m c on a.no_aju=c.no_spj and c.posted='F' and c.modul='PDLOCAL2' "+

						 "    inner join ( "+
						 "		select no_spj,convert(varchar,mulai,103) as mulai,convert(varchar,selesai,103) as selesai,datediff(day,mulai,selesai)+1 as jml  "+
						 "		from ( "+
						 "			select no_spj,min(tgl_mulai) as mulai,max(tgl_selesai) as selesai  "+
						 "			from yk_spj_dh "+
						 //"			where kode_lokasi='"+this.app._lokasi+"' "+
						 "			group by no_spj "+
						 "			)xx  "+
						 "      ) x on a.no_aju = x.no_spj "+

						 "where a.no_aju='"+this.cb_nb.getText()+"' ";			
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
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"pdss_app_m","no_app",this.app._lokasi+"-ADR"+this.e_periode.getText().substr(2,4)+".","0000"));												
		this.e_memo.setFocus();								
	},		
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg.cells(0,row) != "") {			
				this.pc1.setActivePage(this.pc1.childPage[1]);											
				if (this.sg.cells(2,row) == "RETURN") this.c_status.setText(this.sg.cells(2,row));								
				else this.c_status.setText("APPROVE");								
				
				this.e_nobukti.setText(this.sg.cells(0,row));												
				this.e_tgl1.setText(this.sg.cells(3,row));
				this.e_tgl2.setText(this.sg.cells(4,row));
				this.e_jml.setText(this.sg.cells(11,row));	
				this.e_bidang.setText(this.sg.cells(5,row));
				this.e_ket.setText(this.sg.cells(6,row));
				this.e_tempat.setText(this.sg.cells(7,row));				
				this.e_nik.setText(this.sg.cells(2,row));										
				
				this.noAppLama = this.sg.cells(8,row);						
				this.kodePPBukti = this.sg.cells(10,row);
				this.e_memo.setText(this.sg.cells(6,row));				
				
				if (this.sg.cells(1,row) == "INPROG") {
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
	doLoad:function(sender){																
		var strSQL = "select a.no_aju as no_bukti,'INPROG' as status,x.mulai as tglawal,x.selesai as tglakhir,b.nama as bidang,a.tempat,a.keterangan,a.nik+' - '+a.nama as nik,a.no_app2,a.kode_lokasi,convert(varchar,a.tgl_input,120) as tglinput,a.kode_pp, x.jml "+
					 "from pdss_aju_m a "+
					 "	  inner join bidang b on a.kode_bidang=b.kode_bidang  "+
					 "	  inner join yk_spj_m c on a.no_aju=c.no_spj and c.posted='F' and c.modul='PDLOCAL2' "+
					
					 "    inner join ( "+
					 "		select no_spj,convert(varchar,mulai,103) as mulai,convert(varchar,selesai,103) as selesai,datediff(day,mulai,selesai)+1 as jml  "+
					 "		from ( "+
					 "			select no_spj,min(tgl_mulai) as mulai,max(tgl_selesai) as selesai  "+
					 "			from yk_spj_dh "+
					 //"			where kode_lokasi='"+this.app._lokasi+"' "+
					 "			group by no_spj "+
					 "			)xx  "+
					 "      ) x on a.no_aju = x.no_spj "+

		             "where a.progress='1' and a.nik_app2='"+this.app._userLog+"' "+					 			
					 
					 "union "+
					 
					 "select a.no_aju as no_bukti,'INPROG' as status,x.mulai as tglawal,x.selesai as tglakhir,b.nama as bidang,a.tempat,a.keterangan,a.nik+' - '+a.nama as nik,a.no_app2,a.kode_lokasi,convert(varchar,a.tgl_input,120) as tglinput,a.kode_pp,x.jml "+
					 "from pdss_aju_m a "+
					 "	    inner join bidang b on a.kode_bidang=b.kode_bidang  "+
					 "	    inner join yk_spj_m d on a.no_aju=d.no_spj and d.posted='F' and d.modul='PDLOCAL2' "+

					 "    	inner join ( "+
					 "			select no_spj,convert(varchar,mulai,103) as mulai,convert(varchar,selesai,103) as selesai,datediff(day,mulai,selesai)+1 as jml  "+
					 "			from ( "+
					 "				select no_spj,min(tgl_mulai) as mulai,max(tgl_selesai) as selesai  "+
					 "				from yk_spj_dh "+
					// "				where kode_lokasi='"+this.app._lokasi+"' "+
					 "				group by no_spj "+
					 "				)xx  "+
					 "      	) x on a.no_aju = x.no_spj "+

		             "      inner join  (select distinct nik2 from pdss_poh_nik "+
		             "                  where nik_log='"+this.app._userLog+"' and flag_aktif='1' and '"+this.dp_d1.getDateString()+"' between tgl_awal and tgl_akhir) c on a.nik_app2=c.nik2 "+
					 "where a.progress='1' "+					 			
					 		 
					 "order by no_aju";					 					
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
			this.sg.appendData([line.no_bukti,line.status.toUpperCase(),line.nik,line.tglawal,line.tglakhir,line.bidang,line.keterangan,line.tempat,line.no_app2,line.tglinput,line.kode_pp,line.jml]); 
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


/***********************************************************************************************
*	Copyright (c) 2008 SAI and TELKOM Indonesia, PT								
***********************************************************************************************/
window.app_assetsap_dashboard_fSummary = function(owner,options)
{
    if (owner)
    {
		try{
	        window.app_assetsap_dashboard_fSummary.prototype.parent.constructor.call(this, owner,options);        
            this.className = "app_assetsap_dashboard_fSummary";
            this.setCaption("Dashboard");
			this.onClose.set(this,"doClose");		
			this.maximize();
			this.app._mainForm.pButton.hide();
			this.app._mainForm.childFormConfig(this, "mainButtonClick","Dashboard Inventarisasi Fisik", 99);	
			uses("pageControl;childPage;panel;flashChart;saiGrid;timer;util_filterRep;toolbar;roundPanel;util_xlsChart");			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			this.tab = new pageControl(this,{bound:[0,0,this.width - 10, this.height - 30],
				childPage: ["Progress Inventarisasi","Asset SAP AM (Nilai Buku)","Monitoring","Schedule Monitoring (S-CURVE)"],
				borderColor:"#35aedb", pageChange:[this,"doTabChange"], headerAutoWidth:false});			
			//this.tab.actClr = "#299fcb";this.tab.deactClr = "#35aedb";	        
			//this.tab.setHeaderHeight(30);
			//this.tab.addPage(["Progress Inventarisasi","Asset SAP AM (Nilai Buku)","Monitoring","Schedule Monitoring (S-CURVE)"]); 
			//this.tab.roundedHeader(8);
			this.toolbar = new toolbar(this,{bound:[this.width - 200,0,160,25],buttonClick:[this,"doToolBarClick"]});
			this.toolbar.addButton("bFilter","Filter","icon/dynpro/filter2.png","Filter");			
			this.toolbar.addButton("bRefresh","Refresh","icon/dynpro/refresh.png","Resfresh");			
			this.toolbar.makeRound(5);
			this.pFilter = new roundPanel(this,{bound:[this.width - 520,35,500,235],caption:"Filter",visible:false,background:"image/themes/dynpro/roundpanelBgCenter.png",icon:"image/themes/dynpro/iconpanel.png",color:"#edf5f8",titleBg:"#95cae8"});                      
            this.bApply = new button(this.pFilter,{bound:[10,160,80,20],caption:"Apply",click:[this,"doClick"]});
			this.pFilter.area = new saiCBBL(this.pFilter,{bound:[20,30,200,20], caption:"Bus. Area",
				multiSelection: false,
				sql: ["select kode_lokfa, nama from amu_lokasi ",["kode_lokfa","nama"],false,["Bus. Area","Descp"],"and","Daftar Bus. Area",true]
			});
			this.pFilter.klp = new saiCBBL(this.pFilter,{bound:[20,53,200,20], caption:"Class Aset", 
				multiSelection:false, 
				sql: ["select kode_klpfa, nama from amu_klp ",["kode_klpfa","nama"],false,["Class Asset","Descp"],"and","Daftar Class Asset",true]
			});						
            this.pFilter.setTabChildIndex();			
			this.filter = "";						
			this.initialization = true;			            
            this.xlsChart = new util_xlsChart();
            this.initComp("","");
            this.timer = new timer(this);
            this.timer.setInterval(1000);
            this.timer.setEnabled(false);
            this.timer.onTimer.set(this,"doTimer");
		}catch(e){
			this.app.alert(e,"");
		}
    }
};
window.app_assetsap_dashboard_fSummary.extend(window.childForm);
window.app_assetsap_dashboard_fSummary.implement({
    doClose: function(sender){
        this.app._mainForm.pButton.show();
		if (this.trail1 !== undefined) this.trail1.close();		
    },	
	doAfterResize: function(width, height){
		this.setTop(55);
		this.setHeight(height + 40);
	},
	doToolBarClick: function(sender, id){
	   switch(id){
	       case "bFilter" :   
	           this.pFilter.setVisible(!this.pFilter.visible);
	       break;
	       case "bRefresh" :   
	           this.initComp("","");
	       break;
       }	   
    },	
	doClick: function(sender){
        try{
            if (sender == this.bApply){               
				this.initComp(this.pFilter.area.getText(), this.pFilter.klp.getText());
				this.pFilter.hide();
			}
       }catch(e){
            alert(e);
       }
    },	
	doSelectFilterCell: function(sender, col, row){
		try{
			sender.columns.get(2).setReadOnly(false);
			sender.columns.get(2).setReadOnly(true);
			this.filterRep.setSGFilterRowTipe(sender, row,new Array(0,1),new  Array("123","123"));			
			this.filterRep.setSGFilterRowButtonStyle(sender, row,new Array(0,1),new  Array(0,2));			
		}catch(e){
			alert(e);
		}
		
	},	
	sg1onChange: function(sender, col , row){
		if (col==1)
		{
		 if (sender.getCell(1,row)=="All")
		 {
			sender.setCell(2,row,"");
			sender.setCell(3,row,"");
		 }
		} 
	},
	mainButtonClick: function(sender){		
		if (sender == this.app._mainForm.bBack){
			if (this.trail1 && this.trail1.visible && this.trail1.trail2 && this.trail1.trail2.visible){
				this.trail1.trail2.hide();
				this.trail1.unblock();
			}else if (this.trail1 && this.trail1.visible){
				this.trail1.hide();
				this.unblock();
			}
		}
	},
	initComp: function(lokfa, klp){
		try{
		        var sql = new server_util_arrayList();
		        if (lokfa == undefined) lokfa = "";
		        if (typeof lokfa != "string"){
					if (lokfa.dataSelection){																	
						lokfa = "and "+this.cbbLoker.convertFilter("c.kode_loker");
					}else{
						lokfa ="'"+lokfa.getText()+"'"; 
						lokfa = "and c.kode_loker in ("+loker+")";
					}
				}
		        var diva = lokfa.substr(0,3) == "TDV" || lokfa.substr(0,3) == "TCS";
				sql.add("select nama, count(no_gabung) as totsap, sum(status) as totlap from (select distinct a.no_gabung, b.nama, case when k.no_gabung is null then 0 else 1 end as status from amu_asset a "+ 
					" inner join amu_lokasi b on b.kode_lokfa = a.kode_lokfa and b.kode_lokasi = a.kode_lokasi and b.kode_induk = '00' "+
					" inner join amu_bagiklp_d bg on bg.kode_klpfa = a.kode_klpfa and bg.periode = a.periode and bg.jenis_proc = 'FISIK' " +
					" left outer join amu_kkl_d k on k.no_gabung = a.no_gabung and k.periode = a.periode "+
					" where a.kode_lokasi = '"+this.app._lokasi+"' and a.kode_klpfa like '"+klp+"%' and (a.kode_lokfa like '"+lokfa+"%' or a.ref1 = '"+(diva ? lokfa :"")+"'   ) "+
					"union "+
					"select distinct a.no_gabung, c.nama, case when k.no_gabung is null then 0 else 1 end as status from amu_asset a "+ 
					" inner join amu_lokasi b on b.kode_lokfa = a.kode_lokfa and b.kode_lokasi = a.kode_lokasi  "+
					" inner join amu_lokasi c on c.kode_lokfa = b.kode_induk and c.kode_lokasi = a.kode_lokasi and c.kode_induk = '00' "+
					" inner join amu_bagiklp_d bg on bg.kode_klpfa = a.kode_klpfa and bg.periode = a.periode and bg.jenis_proc = 'FISIK' " +
					" left outer join amu_kkl_d k on k.no_gabung = a.no_gabung and k.periode = a.periode "+
					" where a.kode_lokasi = '"+this.app._lokasi+"' and a.kode_klpfa like '"+klp+"%' and (a.kode_lokfa like '"+lokfa+"%' or c.kode_lokfa like '"+lokfa+"%'   )  "+
					"union "+
					"select distinct a.no_gabung, d.nama, case when k.no_gabung is null then 0 else 1 end as status from amu_asset a "+ 
					" inner join amu_lokasi b on b.kode_lokfa = a.kode_lokfa and b.kode_lokasi = a.kode_lokasi "+
					" inner join amu_lokasi c on c.kode_lokfa = b.kode_induk and c.kode_lokasi = a.kode_lokasi "+
					" inner join amu_lokasi d on d.kode_lokfa = c.kode_induk and d.kode_lokasi = a.kode_lokasi and d.kode_induk = '00' "+
					" inner join amu_bagiklp_d bg on bg.kode_klpfa = a.kode_klpfa and bg.periode = a.periode and bg.jenis_proc = 'FISIK' " +
					" left outer join amu_kkl_d k on k.no_gabung = a.no_gabung and k.periode = a.periode "+
					" where a.kode_lokasi = '"+this.app._lokasi+"' and a.kode_klpfa like '"+klp+"%' and (a.kode_lokfa like '"+lokfa+"%' or c.kode_lokfa like '"+lokfa+"%'   or d.kode_lokfa like '"+lokfa+"%' ) ) a group by nama order by nama ");
						
				sql.add("select nama,  sum(status) / count(no_gabung) * 100 as tot from (select distinct a.no_gabung, b.nama, case when k.no_gabung is null then 0 else 1 end as status from amu_asset a "+ 
					" inner join amu_lokasi b on b.kode_lokfa = a.kode_lokfa and b.kode_lokasi = a.kode_lokasi and b.kode_induk = '00' "+
					" inner join amu_bagiklp_d bg on bg.kode_klpfa = a.kode_klpfa and bg.periode = a.periode and bg.jenis_proc = 'FISIK' " +
					" left outer join amu_kkl_d k on k.no_gabung = a.no_gabung and k.periode = a.periode "+
					" where a.kode_lokasi = '"+this.app._lokasi+"' and a.kode_klpfa like '"+klp+"%' and (a.kode_lokfa like '"+lokfa+"%' or a.ref1 = '"+(diva ? lokfa :"")+"'   ) "+
					"union "+
					"select distinct a.no_gabung, c.nama, case when k.no_gabung is null then 0 else 1 end as status from amu_asset a "+ 
					" inner join amu_lokasi b on b.kode_lokfa = a.kode_lokfa and b.kode_lokasi = a.kode_lokasi  "+
					" inner join amu_lokasi c on c.kode_lokfa = b.kode_induk and c.kode_lokasi = a.kode_lokasi and c.kode_induk = '00' "+
					" inner join amu_bagiklp_d bg on bg.kode_klpfa = a.kode_klpfa and bg.periode = a.periode and bg.jenis_proc = 'FISIK' " +
					" left outer join amu_kkl_d k on k.no_gabung = a.no_gabung and k.periode = a.periode "+
					" where a.kode_lokasi = '"+this.app._lokasi+"' and a.kode_klpfa like '"+klp+"%' and (a.kode_lokfa like '"+lokfa+"%' or c.kode_lokfa like '"+lokfa+"%'   )  "+
					"union "+
					"select distinct a.no_gabung, d.nama, case when k.no_gabung is null then 0 else 1 end as status from amu_asset a "+ 
					" inner join amu_lokasi b on b.kode_lokfa = a.kode_lokfa and b.kode_lokasi = a.kode_lokasi "+
					" inner join amu_lokasi c on c.kode_lokfa = b.kode_induk and c.kode_lokasi = a.kode_lokasi "+
					" inner join amu_lokasi d on d.kode_lokfa = c.kode_induk and d.kode_lokasi = a.kode_lokasi and d.kode_induk = '00' "+
					" inner join amu_bagiklp_d bg on bg.kode_klpfa = a.kode_klpfa and bg.periode = a.periode and bg.jenis_proc = 'FISIK' " +
					" left outer join amu_kkl_d k on k.no_gabung = a.no_gabung and k.periode = a.periode "+
					" where a.kode_lokasi = '"+this.app._lokasi+"' and a.kode_klpfa like '"+klp+"%' and (a.kode_lokfa like '"+lokfa+"%' or c.kode_lokfa like '"+lokfa+"%'   or d.kode_lokfa like '"+lokfa+"%' )) a group by nama order by nama ");	
				
				sql.add("select nama,  sum(nilai_buku) as totsap, sum(status) as totlap from (select distinct a.no_gabung, b.nama, a.nilai_buku,case when k.no_gabung is null then 0 else a.nilai_buku end as status from amu_asset a "+ 
					" inner join amu_lokasi b on b.kode_lokfa = a.kode_lokfa and b.kode_lokasi = a.kode_lokasi and b.kode_induk = '00' "+
					" inner join amu_bagiklp_d bg on bg.kode_klpfa = a.kode_klpfa and bg.periode = a.periode and bg.jenis_proc = 'FISIK' " +
					" left outer join amu_kkl_d k on k.no_gabung = a.no_gabung and k.periode = a.periode "+
					" where a.kode_lokasi = '"+this.app._lokasi+"' and a.kode_klpfa like '"+klp+"%' and (a.kode_lokfa like '"+lokfa+"%' or a.ref1 = '"+(diva ? lokfa :"")+"'   ) "+
					"union "+
					"select distinct a.no_gabung, c.nama, a.nilai_buku, case when k.no_gabung is null then 0 else a.nilai_buku end as status from amu_asset a "+ 
					" inner join amu_lokasi b on b.kode_lokfa = a.kode_lokfa and b.kode_lokasi = a.kode_lokasi  "+
					" inner join amu_lokasi c on c.kode_lokfa = b.kode_induk and c.kode_lokasi = a.kode_lokasi and c.kode_induk = '00' "+
					" inner join amu_bagiklp_d bg on bg.kode_klpfa = a.kode_klpfa and bg.periode = a.periode and bg.jenis_proc = 'FISIK' " +
					" left outer join amu_kkl_d k on k.no_gabung = a.no_gabung and k.periode = a.periode "+
					" where a.kode_lokasi = '"+this.app._lokasi+"' and a.kode_klpfa like '"+klp+"%' and (a.kode_lokfa like '"+lokfa+"%' or c.kode_lokfa like '"+lokfa+"%'   )  "+
					"union "+
					"select distinct a.no_gabung, d.nama, a.nilai_buku, case when k.no_gabung is null then 0 else a.nilai_buku end as status from amu_asset a "+ 
					" inner join amu_lokasi b on b.kode_lokfa = a.kode_lokfa and b.kode_lokasi = a.kode_lokasi "+
					" inner join amu_lokasi c on c.kode_lokfa = b.kode_induk and c.kode_lokasi = a.kode_lokasi "+
					" inner join amu_lokasi d on d.kode_lokfa = c.kode_induk and d.kode_lokasi = a.kode_lokasi and d.kode_induk = '00' "+
					" inner join amu_bagiklp_d bg on bg.kode_klpfa = a.kode_klpfa and bg.periode = a.periode and bg.jenis_proc = 'FISIK' " +
					" left outer join amu_kkl_d k on k.no_gabung = a.no_gabung and k.periode = a.periode "+
					" where a.kode_lokasi = '"+this.app._lokasi+"' and a.kode_klpfa like '"+klp+"%' and (a.kode_lokfa like '"+lokfa+"%' or c.kode_lokfa like '"+lokfa+"%'   or d.kode_lokfa like '"+lokfa+"%' )) a group by nama order by nama ");	
					
				sql.add("select nama,  sum(status) as tot from (select distinct a.no_gabung, b.nama, a.nilai_buku,case when k.no_gabung is null then 0 else a.nilai_buku end as status from amu_asset a "+ 
					" inner join amu_lokasi b on b.kode_lokfa = a.kode_lokfa and b.kode_lokasi = a.kode_lokasi and b.kode_induk = '00' "+
					" inner join amu_bagiklp_d bg on bg.kode_klpfa = a.kode_klpfa and bg.periode = a.periode and bg.jenis_proc = 'FISIK' " +
					" left outer join amu_kkl_d k on k.no_gabung = a.no_gabung and k.periode = a.periode "+
					" where a.kode_lokasi = '"+this.app._lokasi+"' and a.kode_klpfa like '"+klp+"%' and (a.kode_lokfa like '"+lokfa+"%' or a.ref1 = '"+(diva ? lokfa :"")+"'   ) "+
					"union "+
					"select distinct a.no_gabung, c.nama, a.nilai_buku, case when k.no_gabung is null then 0 else a.nilai_buku end as status from amu_asset a "+ 
					" inner join amu_lokasi b on b.kode_lokfa = a.kode_lokfa and b.kode_lokasi = a.kode_lokasi  "+
					" inner join amu_lokasi c on c.kode_lokfa = b.kode_induk and c.kode_lokasi = a.kode_lokasi and c.kode_induk = '00' "+
					" inner join amu_bagiklp_d bg on bg.kode_klpfa = a.kode_klpfa and bg.periode = a.periode and bg.jenis_proc = 'FISIK' " +
					" left outer join amu_kkl_d k on k.no_gabung = a.no_gabung and k.periode = a.periode "+
					" where a.kode_lokasi = '"+this.app._lokasi+"' and a.kode_klpfa like '"+klp+"%' and (a.kode_lokfa like '"+lokfa+"%' or c.kode_lokfa like '"+lokfa+"%'   )  "+
					"union "+
					"select distinct a.no_gabung, d.nama, a.nilai_buku, case when k.no_gabung is null then 0 else a.nilai_buku end as status from amu_asset a "+ 
					" inner join amu_lokasi b on b.kode_lokfa = a.kode_lokfa and b.kode_lokasi = a.kode_lokasi "+
					" inner join amu_lokasi c on c.kode_lokfa = b.kode_induk and c.kode_lokasi = a.kode_lokasi "+
					" inner join amu_lokasi d on d.kode_lokfa = c.kode_induk and d.kode_lokasi = a.kode_lokasi and d.kode_induk = '00' "+
					" inner join amu_bagiklp_d bg on bg.kode_klpfa = a.kode_klpfa and bg.periode = a.periode and bg.jenis_proc = 'FISIK' " +
					" left outer join amu_kkl_d k on k.no_gabung = a.no_gabung and k.periode = a.periode "+
					" where a.kode_lokasi = '"+this.app._lokasi+"' and a.kode_klpfa like '"+klp+"%' and (a.kode_lokfa like '"+lokfa+"%' or c.kode_lokfa like '"+lokfa+"%'   or d.kode_lokfa like '"+lokfa+"%' )) a group by nama order by nama ");	
					
				sql.add("select nama,  count(no_gabung) as totdist, sum(status) as totsap, sum(status2) as totlap, sum(status3) as totba from ("+
					" select distinct a.no_gabung, b.nama, a.nilai_buku,case when k.no_gabung is null then 0 else 1 end as status "+
					" ,case when r.no_gabung is null then 0 else 1 end as status2 "+
					" ,case when rr.no_gabung is null then 0 else 1 end as status3 "+
					" from amu_asset a "+ 
					" inner join amu_lokasi b on b.kode_lokfa = a.kode_lokfa and b.kode_lokasi = a.kode_lokasi and b.kode_induk = '00' "+
					" inner join amu_bagiklp_d bg on bg.kode_klpfa = a.kode_klpfa and bg.periode = a.periode and bg.jenis_proc = 'FISIK' " +
					" left outer join amu_kkl_d k on k.no_gabung = a.no_gabung and k.periode = a.periode "+
					" left outer join amu_rekon_d r on r.no_gabung = a.no_gabung and r.periode = a.periode "+
					" left outer join amu_ba_inv rr on rr.no_gabung = a.no_gabung and r.periode = a.periode and rr.jenis_ba = 'REKON' "+
					" where a.kode_lokasi = '"+this.app._lokasi+"' and a.kode_klpfa like '"+klp+"%' and (a.kode_lokfa like '"+lokfa+"%' or a.ref1 = '"+(diva ? lokfa :"")+"'   )  "+
					"union "+
					"  select distinct a.no_gabung, c.nama, a.nilai_buku,case when k.no_gabung is null then 0 else 1 end as status "+
					" ,case when r.no_gabung is null then 0 else 1 end  "+
					" ,case when rr.no_gabung is null then 0 else 1 end as status3 "+
					" from amu_asset a "+ 
					" inner join amu_lokasi b on b.kode_lokfa = a.kode_lokfa and b.kode_lokasi = a.kode_lokasi  "+
					" inner join amu_lokasi c on c.kode_lokfa = b.kode_induk and c.kode_lokasi = a.kode_lokasi and c.kode_induk = '00' "+
					" inner join amu_bagiklp_d bg on bg.kode_klpfa = a.kode_klpfa and bg.periode = a.periode and bg.jenis_proc = 'FISIK' " +
					" left outer join amu_kkl_d k on k.no_gabung = a.no_gabung and k.periode = a.periode "+
					" left outer join amu_rekon_d r on r.no_gabung = a.no_gabung and r.periode = a.periode "+
					" left outer join amu_ba_inv rr on rr.no_gabung = a.no_gabung and r.periode = a.periode and rr.jenis_ba = 'REKON' "+
					" where a.kode_lokasi = '"+this.app._lokasi+"' and a.kode_klpfa like '"+klp+"%' and (a.kode_lokfa like '"+lokfa+"%' or c.kode_lokfa like '"+lokfa+"%'   )  "+
					"union "+
					"  select distinct a.no_gabung, d.nama, a.nilai_buku,case when k.no_gabung is null then 0 else 1 end as status "+
					" ,case when r.no_gabung is null then 0 else 1 end "+
					" ,case when rr.no_gabung is null then 0 else 1 end as status3 "+
					" from amu_asset a "+ 
					" inner join amu_lokasi b on b.kode_lokfa = a.kode_lokfa and b.kode_lokasi = a.kode_lokasi "+
					" inner join amu_lokasi c on c.kode_lokfa = b.kode_induk and c.kode_lokasi = a.kode_lokasi "+
					" inner join amu_lokasi d on d.kode_lokfa = c.kode_induk and d.kode_lokasi = a.kode_lokasi and d.kode_induk = '00' "+
					" inner join amu_bagiklp_d bg on bg.kode_klpfa = a.kode_klpfa and bg.periode = a.periode and bg.jenis_proc = 'FISIK' " +
					" left outer join amu_kkl_d k on k.no_gabung = a.no_gabung and k.periode = a.periode "+
					" left outer join amu_rekon_d r on r.no_gabung = a.no_gabung and r.periode = a.periode "+
					" left outer join amu_ba_inv rr on rr.no_gabung = a.no_gabung and r.periode = a.periode and rr.jenis_ba = 'REKON' "+
					" where a.kode_lokasi = '"+this.app._lokasi+"' and a.kode_klpfa like '"+klp+"%' and (a.kode_lokfa like '"+lokfa+"%' or c.kode_lokfa like '"+lokfa+"%'   or d.kode_lokfa like '"+lokfa+"%' )) a group by nama order by nama ");	
				
				sql.add("select tgl_mulai, tgl_akhir, w, sum(persen) as persen, sum(rencana) as rencana, sum(prog) as prog, sum(prog2) as prog2 from "+
					" (select a.proses, to_char(a.tgl_mulai,'dd-mm-yyyy') as tgl_mulai,to_char(a.tgl_akhir,'dd-mm-yyyy') as tgl_akhir, to_char(a.tgl_mulai, 'MON-W') as w,  "+
						" round(a.persen/100 * c.totsap / c.totsap *  b.bobot /100 * 100,2) as persen, round(a.persen/100 * c.totsap * b.bobot /100, 2) as rencana "+
						" , round(case a.proses when 'KKIL' then ifnull(d.totkkl,0) / c.totsap *  b.bobot /100 "+
						"				 when 'KKP' then ifnull(e.totkkp,0) / c.totsap *  b.bobot /100"+
						"				 when 'BA' then ifnull(f.totba,0) / c.totsap *  b.bobot /100 end * 100 , 2) as prog, ifnull(d.totkkl,0) + ifnull(e.totkkp,0)+ ifnull(f.totba,0) as prog2 "+
						" from amu_rencana_d a "+
						" inner join amu_rencana_m b on b.jenis = a.jenis and a.proses = b.proses "+
						" left outer join (select a.proses, "+
						"		to_char(a.tgl_mulai,'dd-mm-yyyy') as tgl_mulai, "+
						"		to_char(a.tgl_akhir,'dd-mm-yyyy') as tgl_akhir,  "+
						"		count(c.no_gabung) as totkkl "+
						"		from amu_rencana_d a  "+
						"		inner join amu_rencana_m b on b.jenis = a.jenis and a.proses = b.proses "+
						"		inner join (select distinct a.tanggal, b.no_gabung from amu_kkl_m a  "+
							"		inner join amu_kkl_d b on b.no_inv = a.no_inv "+
							"		inner join amu_asset c on c.no_gabung = b.no_gabung "+
							"		inner join amu_lokasi d on d.kode_lokfa = c.kode_lokfa and d.kode_induk = '00' "+
							" 		where c.kode_lokasi = '"+this.app._lokasi+"' and c.kode_klpfa like '"+klp+"%' and (c.kode_lokfa like '"+lokfa+"%' or c.ref1 = '"+(diva ? lokfa :"")+"'   ) "+
							"		union "+
							"				select distinct a.tanggal, b.no_gabung from amu_kkl_m a  "+
							"		inner join amu_kkl_d b on b.no_inv = a.no_inv "+
							"		inner join amu_asset c on c.no_gabung = b.no_gabung "+
							"		inner join amu_lokasi d on d.kode_lokfa = c.kode_lokfa "+
							"		inner join amu_lokasi e on e.kode_lokfa = d.kode_induk and e.kode_induk = '00' "+
							" 		where c.kode_lokasi = '"+this.app._lokasi+"' and c.kode_klpfa like '"+klp+"%' and (c.kode_lokfa like '"+lokfa+"%' or e.kode_lokfa like '"+lokfa+"%' ) "+						
							"		union " +
							"				select distinct a.tanggal, b.no_gabung from amu_kkl_m a  "+
							"		inner join amu_kkl_d b on b.no_inv = a.no_inv "+
							"		inner join amu_asset c on c.no_gabung = b.no_gabung  "+
							"		inner join amu_lokasi d on d.kode_lokfa = c.kode_lokfa "+
							"		inner join amu_lokasi e on e.kode_lokfa = d.kode_induk  "+
							"		inner join amu_lokasi f on f.kode_lokfa = e.kode_induk and f.kode_induk = '00' "+
							" 		where c.kode_lokasi = '"+this.app._lokasi+"' and c.kode_klpfa like '"+klp+"%' and (c.kode_lokfa like '"+lokfa+"%' or e.kode_lokfa like '"+lokfa+"%' or f.kode_lokfa like '"+lokfa+"%' )"+						
						"														)c on c.tanggal < = a.tgl_akhir  "+
						"	where a.proses = 'KKIL' "+
						"	group by a.proses, a.tgl_mulai, a.tgl_akhir ) d on d.proses = a.proses and d.tgl_mulai = to_char(a.tgl_mulai,'dd-mm-yyyy') "+
						" left outer join (select a.proses, "+
						"		to_char(a.tgl_mulai,'dd-mm-yyyy') as tgl_mulai, "+
						"		to_char(a.tgl_akhir,'dd-mm-yyyy') as tgl_akhir,  "+
						"		count(c.no_gabung) as totkkp "+
						"		from amu_rencana_d a  "+
						"		inner join amu_rencana_m b on b.jenis = a.jenis and a.proses = b.proses "+
						"		inner join (select distinct a.tanggal, b.no_gabung from amu_rekon_m a  "+
						"			inner join amu_rekon_d b on b.no_rekon = a.no_rekon "+
							"		inner join amu_asset c on c.no_gabung = b.no_gabung "+
							"		inner join amu_lokasi d on d.kode_lokfa = c.kode_lokfa and d.kode_induk = '00' "+
							" 		where c.kode_lokasi = '"+this.app._lokasi+"' and c.kode_klpfa like '"+klp+"%' and (c.kode_lokfa like '"+lokfa+"%' or c.ref1 = '"+(diva ? lokfa :"")+"'   )  "+
							"		union "+
							"				select distinct a.tanggal, b.no_gabung from amu_rekon_m a  "+
							"		inner join amu_rekon_d b on b.no_rekon = a.no_rekon "+
							"		inner join amu_asset c on c.no_gabung = b.no_gabung "+
							"		inner join amu_lokasi d on d.kode_lokfa = c.kode_lokfa "+
							"		inner join amu_lokasi e on e.kode_lokfa = d.kode_induk and e.kode_induk = '00' "+
							" 		where c.kode_lokasi = '"+this.app._lokasi+"' and c.kode_klpfa like '"+klp+"%' and (c.kode_lokfa like '"+lokfa+"%' or e.kode_lokfa like '"+lokfa+"%' ) "+
							"		union "+
							"				select distinct a.tanggal, b.no_gabung from amu_rekon_m a  "+
							"		inner join amu_rekon_d b on b.no_rekon = a.no_rekon "+
							"		inner join amu_asset c on c.no_gabung = b.no_gabung "+
							"		inner join amu_lokasi d on d.kode_lokfa = c.kode_lokfa "+
							"		inner join amu_lokasi e on e.kode_lokfa = d.kode_induk "+
							"		inner join amu_lokasi f on f.kode_lokfa = e.kode_induk and f.kode_induk = '00' "+
							" 		where c.kode_lokasi = '"+this.app._lokasi+"' and c.kode_klpfa like '"+klp+"%' and (c.kode_lokfa like '"+lokfa+"%' or e.kode_lokfa like '"+lokfa+"%' or f.kode_lokfa like '"+lokfa+"%' ) "+
						" 																	)c on c.tanggal <= a.tgl_akhir  "+
						"	where a.proses = 'KKP' "+
						"	group by a.proses, a.tgl_mulai, a.tgl_akhir ) e on e.proses = a.proses and e.tgl_mulai = to_char(a.tgl_mulai,'dd-mm-yyyy')"+
						" left outer join (select a.proses, "+
						"		to_char(a.tgl_mulai,'dd-mm-yyyy') as tgl_mulai, "+
						"		to_char(a.tgl_akhir,'dd-mm-yyyy') as tgl_akhir,  "+
						"		count(c.no_gabung) as totba "+
						"		from amu_rencana_d a  "+
						"		inner join amu_rencana_m b on b.jenis = a.jenis and a.proses = b.proses "+
						"		inner join (select distinct a.tgl_ba as tanggal, b.no_gabung from amu_ba_m a  "+
						"			inner join amu_ba_inv b on b.no_ba = a.no_ba and b.jenis_ba = 'REKON' "+
							"		inner join amu_asset c on c.no_gabung = b.no_gabung "+
							"		inner join amu_lokasi d on d.kode_lokfa = c.kode_lokfa and d.kode_induk = '00' "+
							" 		where c.kode_lokasi = '"+this.app._lokasi+"' and c.kode_klpfa like '"+klp+"%' and (c.kode_lokfa like '"+lokfa+"%'  or c.ref1 = '"+(diva ? lokfa :"")+"'  )  "+
							"		union "+
							"				select distinct a.tgl_ba as tanggal, b.no_gabung from amu_ba_m a  "+
							"		inner join amu_ba_inv b on b.no_ba = a.no_ba and b.jenis_ba = 'REKON' "+
							"		inner join amu_asset c on c.no_gabung = b.no_gabung "+
							"		inner join amu_lokasi d on d.kode_lokfa = c.kode_lokfa "+
							"		inner join amu_lokasi e on e.kode_lokfa = d.kode_induk and e.kode_induk = '00' "+
							" 		where c.kode_lokasi = '"+this.app._lokasi+"' and c.kode_klpfa like '"+klp+"%' and (c.kode_lokfa like '"+lokfa+"%' or e.kode_lokfa like '"+lokfa+"%' ) "+
							"		union "+
							"				select distinct a.tgl_ba as tanggal, b.no_gabung from amu_ba_m a  "+
							"		inner join amu_ba_inv b on b.no_ba = a.no_ba and b.jenis_ba = 'REKON' "+
							"		inner join amu_asset c on c.no_gabung = b.no_gabung "+
							"		inner join amu_lokasi d on d.kode_lokfa = c.kode_lokfa "+
							"		inner join amu_lokasi e on e.kode_lokfa = d.kode_induk "+
							"		inner join amu_lokasi f on f.kode_lokfa = e.kode_induk and f.kode_induk = '00' "+
							" 		where c.kode_lokasi = '"+this.app._lokasi+"' and c.kode_klpfa like '"+klp+"%' and (c.kode_lokfa like '"+lokfa+"%' or e.kode_lokfa like '"+lokfa+"%' or f.kode_lokfa like '"+lokfa+"%'  ) "+							
						"															)c on c.tanggal <= a.tgl_akhir  "+
						"	where a.proses = 'BA' and a.jenis = 'FSK' "+
						"	group by a.proses, a.tgl_mulai, a.tgl_akhir ) f on f.proses = a.proses and f.tgl_mulai = to_char(a.tgl_mulai,'dd-mm-yyyy')"+
						" cross join (select count(no_gabung) as totsap "+						
						" from (select distinct a.no_gabung, b.nama from amu_asset a "+ 
					" inner join amu_lokasi b on b.kode_lokfa = a.kode_lokfa and b.kode_lokasi = a.kode_lokasi and b.kode_induk = '00' "+
					" inner join amu_bagiklp_d bg on bg.kode_klpfa = a.kode_klpfa and bg.periode = a.periode and bg.jenis_proc = 'FISIK' " +										
					" where a.kode_lokasi = '"+this.app._lokasi+"' and a.kode_klpfa like '"+klp+"%' and (a.kode_lokfa like '"+lokfa+"%' or a.ref1 = '"+(diva ? lokfa :"")+"'  )  "+
					"union "+
					"select distinct a.no_gabung, c.nama from amu_asset a "+ 
					" inner join amu_lokasi b on b.kode_lokfa = a.kode_lokfa and b.kode_lokasi = a.kode_lokasi  "+
					" inner join amu_lokasi c on c.kode_lokfa = b.kode_induk and c.kode_lokasi = a.kode_lokasi and c.kode_induk = '00' "+
					" inner join amu_bagiklp_d bg on bg.kode_klpfa = a.kode_klpfa and bg.periode = a.periode and bg.jenis_proc = 'FISIK' " +										
					" where a.kode_lokasi = '"+this.app._lokasi+"' and a.kode_klpfa like '"+klp+"%' and (a.kode_lokfa like '"+lokfa+"%' or c.kode_lokfa like '"+lokfa+"%' ) "+
					"union "+
					"select distinct a.no_gabung, d.nama from amu_asset a "+ 
					" inner join amu_lokasi b on b.kode_lokfa = a.kode_lokfa and b.kode_lokasi = a.kode_lokasi "+
					" inner join amu_lokasi c on c.kode_lokfa = b.kode_induk and c.kode_lokasi = a.kode_lokasi "+
					" inner join amu_lokasi d on d.kode_lokfa = c.kode_induk and d.kode_lokasi = a.kode_lokasi and d.kode_induk = '00' "+
					" inner join amu_bagiklp_d bg on bg.kode_klpfa = a.kode_klpfa and bg.periode = a.periode and bg.jenis_proc = 'FISIK' " +										
					" where a.kode_lokasi = '"+this.app._lokasi+"' and a.kode_klpfa like '"+klp+"%' and (a.kode_lokfa like '"+lokfa+"%' or c.kode_lokfa like '"+lokfa+"%' or d.kode_lokfa like '"+lokfa+"%' ) ) a ) c "+
					
					" where a.jenis = 'FSK' "+
					" ) c "+										
					" group by tgl_mulai, tgl_akhir, w "+
					" order by to_date(tgl_mulai,'dd-mm-yyyy') ");	
				
				sql.add("select proses, tgl_mulai, tgl_akhir, w, sum(persen) as persen, sum(rencana) as rencana, sum(prog) as prog, sum(prog2) as prog2 from "+
					" (select a.proses, to_char(a.tgl_mulai,'dd-mm-yyyy') as tgl_mulai,to_char(a.tgl_akhir,'dd-mm-yyyy') as tgl_akhir, to_char(a.tgl_mulai, 'MON-W') as w,  "+
						" round(a.persen/100 * c.totsap / c.totsap  * 100,2) as persen, round(a.persen/100 * c.totsap, 2) as rencana "+
						" , round(case a.proses when 'KKIL' then ifnull(d.totkkl,0) / c.totsap  "+
						"				 when 'KKP' then ifnull(e.totkkp,0) / c.totsap  "+
						"				 when 'BA' then ifnull(f.totba,0) / c.totsap  end * 100 , 2) as prog "+
						" , round(case a.proses when 'KKIL' then ifnull(d.totkkl,0)  "+
						"				 when 'KKP' then ifnull(e.totkkp,0) "+
						"				 when 'BA' then ifnull(f.totba,0)  end , 2) as prog2 "+
						" from amu_rencana_d a "+
						" inner join amu_rencana_m b on b.jenis = a.jenis and a.proses = b.proses "+
						" left outer join (select a.proses, "+
						"		to_char(a.tgl_mulai,'dd-mm-yyyy') as tgl_mulai, "+
						"		to_char(a.tgl_akhir,'dd-mm-yyyy') as tgl_akhir,  "+
						"		count(c.no_gabung) as totkkl "+
						"		from amu_rencana_d a  "+
						"		inner join amu_rencana_m b on b.jenis = a.jenis and a.proses = b.proses "+
						"		inner join (select distinct a.tanggal, b.no_gabung from amu_kkl_m a  "+
							"		inner join amu_kkl_d b on b.no_inv = a.no_inv "+
							"		inner join amu_asset c on c.no_gabung = b.no_gabung "+
							"		inner join amu_lokasi d on d.kode_lokfa = c.kode_lokfa and d.kode_induk = '00' "+
							" 		where c.kode_lokasi = '"+this.app._lokasi+"' and c.kode_klpfa like '"+klp+"%' and (c.kode_lokfa like '"+lokfa+"%' or c.ref1 = '"+(diva ? lokfa :"")+"'   ) "+
							"		union "+
							"				select distinct a.tanggal, b.no_gabung from amu_kkl_m a  "+
							"		inner join amu_kkl_d b on b.no_inv = a.no_inv "+
							"		inner join amu_asset c on c.no_gabung = b.no_gabung "+
							"		inner join amu_lokasi d on d.kode_lokfa = c.kode_lokfa "+
							"		inner join amu_lokasi e on e.kode_lokfa = d.kode_induk and e.kode_induk = '00' "+
							" 		where c.kode_lokasi = '"+this.app._lokasi+"' and c.kode_klpfa like '"+klp+"%' and (c.kode_lokfa like '"+lokfa+"%' or e.kode_lokfa like '"+lokfa+"%' ) "+						
							"		union " +
							"				select distinct a.tanggal, b.no_gabung from amu_kkl_m a  "+
							"		inner join amu_kkl_d b on b.no_inv = a.no_inv "+
							"		inner join amu_asset c on c.no_gabung = b.no_gabung  "+
							"		inner join amu_lokasi d on d.kode_lokfa = c.kode_lokfa "+
							"		inner join amu_lokasi e on e.kode_lokfa = d.kode_induk  "+
							"		inner join amu_lokasi f on f.kode_lokfa = e.kode_induk and f.kode_induk = '00' "+
							" 		where c.kode_lokasi = '"+this.app._lokasi+"' and c.kode_klpfa like '"+klp+"%' and (c.kode_lokfa like '"+lokfa+"%' or e.kode_lokfa like '"+lokfa+"%' or f.kode_lokfa like '"+lokfa+"%' )"+						
						"														)c on c.tanggal < = a.tgl_akhir  "+
						"	where a.proses = 'KKIL' "+
						"	group by a.proses, a.tgl_mulai, a.tgl_akhir ) d on d.proses = a.proses and d.tgl_mulai = to_char(a.tgl_mulai,'dd-mm-yyyy') "+
						" left outer join (select a.proses, "+
						"		to_char(a.tgl_mulai,'dd-mm-yyyy') as tgl_mulai, "+
						"		to_char(a.tgl_akhir,'dd-mm-yyyy') as tgl_akhir,  "+
						"		count(c.no_gabung) as totkkp "+
						"		from amu_rencana_d a  "+
						"		inner join amu_rencana_m b on b.jenis = a.jenis and a.proses = b.proses "+
						"		inner join (select distinct a.tanggal, b.no_gabung from amu_rekon_m a  "+
						"			inner join amu_rekon_d b on b.no_rekon = a.no_rekon "+
							"		inner join amu_asset c on c.no_gabung = b.no_gabung "+
							"		inner join amu_lokasi d on d.kode_lokfa = c.kode_lokfa and d.kode_induk = '00' "+
							" 		where c.kode_lokasi = '"+this.app._lokasi+"' and c.kode_klpfa like '"+klp+"%' and (c.kode_lokfa like '"+lokfa+"%' or c.ref1 = '"+(diva ? lokfa :"")+"'   )  "+
							"		union "+
							"				select distinct a.tanggal, b.no_gabung from amu_rekon_m a  "+
							"		inner join amu_rekon_d b on b.no_rekon = a.no_rekon "+
							"		inner join amu_asset c on c.no_gabung = b.no_gabung "+
							"		inner join amu_lokasi d on d.kode_lokfa = c.kode_lokfa "+
							"		inner join amu_lokasi e on e.kode_lokfa = d.kode_induk and e.kode_induk = '00' "+
							" 		where c.kode_lokasi = '"+this.app._lokasi+"' and c.kode_klpfa like '"+klp+"%' and (c.kode_lokfa like '"+lokfa+"%' or e.kode_lokfa like '"+lokfa+"%' ) "+
							"		union "+
							"				select distinct a.tanggal, b.no_gabung from amu_rekon_m a  "+
							"		inner join amu_rekon_d b on b.no_rekon = a.no_rekon "+
							"		inner join amu_asset c on c.no_gabung = b.no_gabung "+
							"		inner join amu_lokasi d on d.kode_lokfa = c.kode_lokfa "+
							"		inner join amu_lokasi e on e.kode_lokfa = d.kode_induk "+
							"		inner join amu_lokasi f on f.kode_lokfa = e.kode_induk and f.kode_induk = '00' "+
							" 		where c.kode_lokasi = '"+this.app._lokasi+"' and c.kode_klpfa like '"+klp+"%' and (c.kode_lokfa like '"+lokfa+"%' or e.kode_lokfa like '"+lokfa+"%' or f.kode_lokfa like '"+lokfa+"%' ) "+
						" 																	)c on c.tanggal <= a.tgl_akhir  "+
						"	where a.proses = 'KKP' "+
						"	group by a.proses, a.tgl_mulai, a.tgl_akhir ) e on e.proses = a.proses and e.tgl_mulai = to_char(a.tgl_mulai,'dd-mm-yyyy')"+
						" left outer join (select a.proses, "+
						"		to_char(a.tgl_mulai,'dd-mm-yyyy') as tgl_mulai, "+
						"		to_char(a.tgl_akhir,'dd-mm-yyyy') as tgl_akhir,  "+
						"		count(c.no_gabung) as totba "+
						"		from amu_rencana_d a  "+
						"		inner join amu_rencana_m b on b.jenis = a.jenis and a.proses = b.proses "+
						"		inner join (select distinct a.tgl_ba as tanggal, b.no_gabung from amu_ba_m a  "+
						"			inner join amu_ba_inv b on b.no_ba = a.no_ba and b.jenis_ba = 'REKON' "+
							"		inner join amu_asset c on c.no_gabung = b.no_gabung "+
							"		inner join amu_lokasi d on d.kode_lokfa = c.kode_lokfa and d.kode_induk = '00' "+
							" 		where c.kode_lokasi = '"+this.app._lokasi+"' and c.kode_klpfa like '"+klp+"%' and (c.kode_lokfa like '"+lokfa+"%'  or c.ref1 = '"+(diva ? lokfa :"")+"'  )  "+
							"		union "+
							"				select distinct a.tgl_ba as tanggal, b.no_gabung from amu_ba_m a  "+
							"		inner join amu_ba_inv b on b.no_ba = a.no_ba and b.jenis_ba = 'REKON' "+
							"		inner join amu_asset c on c.no_gabung = b.no_gabung "+
							"		inner join amu_lokasi d on d.kode_lokfa = c.kode_lokfa "+
							"		inner join amu_lokasi e on e.kode_lokfa = d.kode_induk and e.kode_induk = '00' "+
							" 		where c.kode_lokasi = '"+this.app._lokasi+"' and c.kode_klpfa like '"+klp+"%' and (c.kode_lokfa like '"+lokfa+"%' or e.kode_lokfa like '"+lokfa+"%' ) "+
							"		union "+
							"				select distinct a.tgl_ba as tanggal, b.no_gabung from amu_ba_m a  "+
							"		inner join amu_ba_inv b on b.no_ba = a.no_ba and b.jenis_ba = 'REKON' "+
							"		inner join amu_asset c on c.no_gabung = b.no_gabung "+
							"		inner join amu_lokasi d on d.kode_lokfa = c.kode_lokfa "+
							"		inner join amu_lokasi e on e.kode_lokfa = d.kode_induk "+
							"		inner join amu_lokasi f on f.kode_lokfa = e.kode_induk and f.kode_induk = '00' "+
							" 		where c.kode_lokasi = '"+this.app._lokasi+"' and c.kode_klpfa like '"+klp+"%' and (c.kode_lokfa like '"+lokfa+"%' or e.kode_lokfa like '"+lokfa+"%' or f.kode_lokfa like '"+lokfa+"%'  ) "+							
						"															)c on c.tanggal <= a.tgl_akhir  "+
						"	where a.proses = 'BA' and a.jenis = 'FSK'"+
						"	group by a.proses, a.tgl_mulai, a.tgl_akhir ) f on f.proses = a.proses and f.tgl_mulai = to_char(a.tgl_mulai,'dd-mm-yyyy')"+
						" cross join (select count(no_gabung) as totsap "+						
						" from (select distinct a.no_gabung, b.nama from amu_asset a "+ 
					" inner join amu_lokasi b on b.kode_lokfa = a.kode_lokfa and b.kode_lokasi = a.kode_lokasi and b.kode_induk = '00' "+
					" inner join amu_bagiklp_d bg on bg.kode_klpfa = a.kode_klpfa and bg.periode = a.periode and bg.jenis_proc = 'FISIK' " +										
					" where a.kode_lokasi = '"+this.app._lokasi+"' and a.kode_klpfa like '"+klp+"%' and (a.kode_lokfa like '"+lokfa+"%' or a.ref1 = '"+(diva ? lokfa :"")+"'  )  "+
					"union "+
					"select distinct a.no_gabung, c.nama from amu_asset a "+ 
					" inner join amu_lokasi b on b.kode_lokfa = a.kode_lokfa and b.kode_lokasi = a.kode_lokasi  "+
					" inner join amu_lokasi c on c.kode_lokfa = b.kode_induk and c.kode_lokasi = a.kode_lokasi and c.kode_induk = '00' "+
					" inner join amu_bagiklp_d bg on bg.kode_klpfa = a.kode_klpfa and bg.periode = a.periode and bg.jenis_proc = 'FISIK' " +										
					" where a.kode_lokasi = '"+this.app._lokasi+"' and a.kode_klpfa like '"+klp+"%' and (a.kode_lokfa like '"+lokfa+"%' or c.kode_lokfa like '"+lokfa+"%' ) "+
					"union "+
					"select distinct a.no_gabung, d.nama from amu_asset a "+ 
					" inner join amu_lokasi b on b.kode_lokfa = a.kode_lokfa and b.kode_lokasi = a.kode_lokasi "+
					" inner join amu_lokasi c on c.kode_lokfa = b.kode_induk and c.kode_lokasi = a.kode_lokasi "+
					" inner join amu_lokasi d on d.kode_lokfa = c.kode_induk and d.kode_lokasi = a.kode_lokasi and d.kode_induk = '00' "+
					" inner join amu_bagiklp_d bg on bg.kode_klpfa = a.kode_klpfa and bg.periode = a.periode and bg.jenis_proc = 'FISIK' " +										
					" where a.kode_lokasi = '"+this.app._lokasi+"' and a.kode_klpfa like '"+klp+"%' and (a.kode_lokfa like '"+lokfa+"%' or c.kode_lokfa like '"+lokfa+"%' or d.kode_lokfa like '"+lokfa+"%' ) ) a ) c "+
					
					" where a.jenis = 'FSK' "+
					" ) c "+										
					" group by proses, tgl_mulai, tgl_akhir, w "+
					" order by to_date(tgl_mulai,'dd-mm-yyyy') ");	
				
				this.dbLib.getMultiDataProviderA(sql);					           
				this.sql = sql;
		}catch(e){
			this.app.alert(e,"");
		}
	},
	doRequestReady: function(sender, methodName, result){
	   if (sender == this.dbLib){
	       try{
    	       switch(methodName){
    	           case "getMultiDataProvider":					
    	                var data = JSON.parse(result);
    	                if (typeof data != "string"){
    	                    this.count = 0;
    	                    if (!this.initialization){
								this.fr1.data = data.result[0];
								this.fr2.data = data.result[1];
								this.fr6.data = data.result[2];
								this.fr7.data = data.result[3];
								this.fr10.data = data.result[4];
								this.fr11.data = data.result[5];
								this.fr11.data2 = data.result[6];
								this.setData(this.fr1.grid,this.fr1.data);						
								this.setData(this.fr2.grid,this.fr2.data);						
								this.setData(this.fr6.grid,this.fr6.data);						
								this.setData(this.fr7.grid,this.fr7.data);						
								this.setData(this.fr10.grid,this.fr10.data, this.fr10.grid2);						
								this.setData(this.fr11.grid,this.fr11.data);
								this.checkData = true;								
								this.getChart(this.fr1.data, this.fr1.chart,this.tab.activePage == this.tab.childPage[0].resourceId && this.fr1.chart.ready && this.fr1.chart.visible);
								this.getChart(this.fr2.data, this.fr2.chart,this.tab.activePage == this.tab.childPage[0].resourceId && this.fr2.chart.ready && this.fr2.chart.visible);
								this.getChart(this.fr6.data, this.fr6.chart,this.tab.activePage == this.tab.childPage[1].resourceId && this.fr6.chart.ready && this.fr6.chart.visible);	
								this.getChart(this.fr7.data, this.fr7.chart,this.tab.activePage == this.tab.childPage[1].resourceId && this.fr7.chart.ready && this.fr7.chart.visible);
								this.getChart(this.fr10.data, this.fr10.chart,this.tab.activePage == this.tab.childPage[2].resourceId && this.fr10.chart.ready && this.fr10.chart.visible);
								this.getChart(this.fr11.data, this.fr11.chart,this.tab.activePage == this.tab.childPage[3].resourceId && this.fr11.chart.ready && this.fr11.chart.visible);
								return;
							}
    	                    this.initialization = false;
							this.dataProvider = data;							
							var frameWidth = this.width / 2 - 30;
							var frameHeight = this.height - 70;							
            				this.fr1 = new panel(this.tab.childPage[0],{bound:[10,10,frameWidth,frameHeight],caption:"Perbandingan SAP AM dgn Veat"});
							this.fr1.bGraph = new imageButton(this.fr1,{bound:[frameWidth - 50,2,16,16],image:"icon/dynpro/graph16.png",hint:"Mode Graphic",click:[this,"doBtnClick"], name:"graph"});
							this.fr1.bGrid = new imageButton(this.fr1,{bound:[frameWidth - 25,2,16,16],image:"icon/dynpro/tabContent2.png",hint:"Mode Table",click:[this,"doBtnClick"], name:"grid"});
							this.fr1.bXls = new imageButton(this.fr1,{bound:[frameWidth - 75,2,18,16],image:"icon/dynpro/excel2.png",hint:"Save to excel",click:[this,"doBtnClick"], name:"xls"});
							
							this.fr1.grid = new saiGrid(this.fr1,{bound:[5,30,this.fr1.getClientWidth() - 30,this.fr1.getClientHeight() - 50],colCount:3,colTitle:["Group By","SAP AM","Inv. Lapangan"],visible:systemAPI.browser.msie, readOnly:true, dblClick:[this,"doGridClick"],colWidth:[[1,0],[100,200]], colFormat:[[1,2],[cfNilai, cfNilai]]});		         	                        
							this.fr1.data = data.result[0];
							this.fr1.chart = new flashChart(this.fr1,{bound:[5,30,this.fr1.getClientWidth() - 30,this.fr1.getClientHeight() - 50],objectReady:[this,"doObjectReady"],title:"Lokasi(UBIS)",visible:!systemAPI.browser.msie});		         	                        							
							this.fr1.chart.clicked = 0;
							this.fr1.sql = this.sql.get(0);	
            		        this.fr2 = new panel(this.tab.childPage[0],{bound:[this.fr1.left+this.fr1.width + 15,10,frameWidth,frameHeight],caption:"Bisnis Area"});
            				this.fr2.bGraph = new imageButton(this.fr2,{bound:[frameWidth - 50,2,16,16],image:"icon/dynpro/graph16.png",hint:"Mode Graphic",click:[this,"doBtnClick"], name:"graph"});
							this.fr2.bGrid = new imageButton(this.fr2,{bound:[frameWidth - 25,2,16,16],image:"icon/dynpro/tabContent2.png",hint:"Mode Table",click:[this,"doBtnClick"], name:"grid"});
							this.fr2.grid = new saiGrid(this.fr2,{bound:[5,30,this.fr2.getClientWidth() - 30,this.fr2.getClientHeight() - 50],colCount:2,colTitle:["Group By","Persen"],visible:systemAPI.browser.msie, readOnly:true, dblClick:[this,"doGridClick"],colWidth:[[1,0],[100,200]], colFormat:[[1],[cfNilai]]});  							
                            this.fr2.chart = new flashChart(this.fr2,{bound:[5,30,this.fr2.getClientWidth() - 30,this.fr2.getClientHeight() - 50],objectReady:[this,"doObjectReady"],title:"Bisnis Area",visible:!systemAPI.browser.msie});  
							this.fr2.data = data.result[1];
							this.fr2.sql = this.sql.get(1);																									
							this.fr1.sibling = this.fr2;
							
							this.fr6 = new panel(this.tab.childPage[1],{bound:[10,10,frameWidth,frameHeight],caption:"Perbandingan Nilai Buku yg tlh terinventaris"});
							this.fr7 = new panel(this.tab.childPage[1],{bound:[this.fr6.left+this.fr6.width + 15,10,frameWidth,frameHeight],caption:"Nilai Buku yg telah terinventarisasi "});							
							var frameWidth = this.width / 2 - 30;						
							this.fr6.bGraph = new imageButton(this.fr6,{bound:[frameWidth - 50,2,16,16],image:"icon/dynpro/graph16.png",hint:"Mode Graphic",click:[this,"doBtnClick"], name:"graph"});
							this.fr6.bGrid = new imageButton(this.fr6,{bound:[frameWidth - 25,2,16,16],image:"icon/dynpro/tabContent2.png",hint:"Mode Table",click:[this,"doBtnClick"], name:"grid"});
							this.fr6.bXls = new imageButton(this.fr6,{bound:[frameWidth - 75,2,18,16],image:"icon/dynpro/excel2.png",hint:"Save to excel",click:[this,"doBtnClick"], name:"xls"});
							this.fr6.grid = new saiGrid(this.fr6,{bound:[5,30,this.fr6.getClientWidth() - 30,this.fr6.getClientHeight() - 50],colCount:3,colTitle:["Group By","Nilai Buku SAP","Nilai Buku Lap."], readOnly:true,visible:false, dblClick:[this,"doGridClick"],colWidth:[[1,0],[100,200]], colFormat:[[1,2],[cfNilai, cfNilai]]});		         	                        
							this.fr6.chart = new flashChart(this.fr6,{bound:[5,30,this.fr6.getClientWidth() - 30,this.fr6.getClientHeight() - 50],objectReady:[this,"doObjectReady"],title:"Perbandingan Nilai Buku yg tlh terinventaris"});		        				
							this.fr6.data = this.dataProvider.result[2];
							this.fr6.chart.clicked = 0;
							this.fr6.sql = this.sql.get(2);
							this.fr7.bGraph = new imageButton(this.fr7,{bound:[frameWidth - 50,2,16,16],image:"icon/dynpro/graph16.png",hint:"Mode Graphic",click:[this,"doBtnClick"], name:"graph"});
							this.fr7.bGrid = new imageButton(this.fr7,{bound:[frameWidth - 25,2,16,16],image:"icon/dynpro/tabContent2.png",hint:"Mode Table",click:[this,"doBtnClick"], name:"grid"});
							this.fr7.grid = new saiGrid(this.fr7,{bound:[5,30,this.fr7.getClientWidth() - 30,this.fr7.getClientHeight() - 50],colCount:2,colTitle:["Group By","Nilai"], readOnly:true,visible:false, dblClick:[this,"doGridClick"],colWidth:[[1,0],[100,200]], colFormat:[[1],[cfNilai]]});  
							this.fr7.chart = new flashChart(this.fr7,{bound:[5,30,this.fr7.getClientWidth() - 30,this.fr7.getClientHeight() - 50],objectReady:[this,"doObjectReady"],title:"Nilai Buku yg telah terinventaris"});		        
							this.fr7.data = this.dataProvider.result[3];
							this.fr7.sql = this.sql.get(3);																			
							this.fr6.sibling = this.fr7;
															
							this.fr10 = new panel(this.tab.childPage[2],{bound:[10,10,this.width - 30,this.height - 70],caption:"Monitoring"});							
													
							var frameWidth = this.width - 30;						
							var frameWidth2 = this.width / 2 - 30;						
							this.fr10.bGraph = new imageButton(this.fr10,{bound:[frameWidth - 50,2,16,16],image:"icon/dynpro/graph16.png",hint:"Mode Graphic",click:[this,"doBtnClick"], name:"graph"});
							this.fr10.bGrid = new imageButton(this.fr10,{bound:[frameWidth - 25,2,16,16],image:"icon/dynpro/tabContent2.png",hint:"Mode Table",click:[this,"doBtnClick"], name:"grid"});
							this.fr10.bXls = new imageButton(this.fr10,{bound:[this.fr10.width - 75,2,18,16],image:"icon/dynpro/excel2.png",hint:"Save to excel",click:[this,"doBtnClick"], name:"xls"});
							
							this.fr10.grid = new saiGrid(this.fr10,{bound:[5,30,frameWidth2,this.fr10.getClientHeight() - 50],colCount:5,colTitle:["Group By","Inventarisai","Rekonsiliasi","BA","Dari"], readOnly:true,visible:false, dblClick:[this,"doGridClick"],colWidth:[[4,3,2,1,0],[100,100,100,100,200]], colFormat:[[1,2,3,4],[cfNilai, cfNilai, cfNilai, cfNilai]]});
							this.fr10.grid2 = new saiGrid(this.fr10,{bound:[frameWidth2 + 20,30,frameWidth2,this.fr10.getClientHeight() - 50],colCount:4,colTitle:["Group By","Inventarisai(%)","Rekonsiliasi(%)","BA(%)"], readOnly:true,visible:false, dblClick:[this,"doGridClick"],colWidth:[[3,2,1,0],[100,100,100,200]], colFormat:[[1,2,3],[cfNilai, cfNilai, cfNilai]]});
							
							this.fr10.chart = new flashChart(this.fr10,{bound:[5,30,this.fr10.getClientWidth() - 30,this.fr10.getClientHeight() - 50],objectReady:[this,"doObjectReady"],title:"Progress Inventarisasi"});		        				
							this.fr10.data = this.dataProvider.result[4];
							this.fr10.sql = this.sql.get(4);												
							
							this.fr11 = new panel(this.tab.childPage[3],{bound:[10,10,this.width - 30,this.height - 70],caption:"Schedule Monitoring (S-CURVE)"});													
							var frameWidth = this.width / 2 - 30;						
							this.fr11.bGraph = new imageButton(this.fr11,{bound:[this.fr11.width - 50,2,16,16],image:"icon/dynpro/graph16.png",hint:"Mode Graphic",click:[this,"doBtnClick"], name:"graph"});
							this.fr11.bGrid = new imageButton(this.fr11,{bound:[this.fr11.width - 25,2,16,16],image:"icon/dynpro/tabContent2.png",hint:"Rincian Proses",click:[this,"doBtnClick"], name:"grid"});
							this.fr11.bXls = new imageButton(this.fr11,{bound:[this.fr11.width - 75,2,18,16],image:"icon/dynpro/excel2.png",hint:"Save to excel",click:[this,"doBtnClick"], name:"xls"});
							this.fr11.grid = new saiGrid(this.fr11,{bound:[10,30,frameWidth - 290,this.fr11.getClientHeight() - 50],colCount:5,colTitle:["Tgl Mulai","Tgl Akhir","Week","Rencana","Progress"], readOnly:true,visible:true, dblClick:[this,"doGridClick"],colWidth:[[4,3,2,1,0],[50,50,50,80,80]], colFormat:[[3,4],[cfNilai, cfNilai]]});
							this.fr11.chart = new flashChart(this.fr11,{bound:[frameWidth - 250 ,30,frameWidth + 240 ,this.fr11.getClientHeight() - 50],objectReady:[this,"doObjectReady"],title:"Progress Inventarisasi"});							
							frameWidth = this.width / 3 - 20;						
							this.fr11.p1 = new panel(this.fr11,{caption:"Hasil KKIL",bound:[10,30,frameWidth,this.fr11.getClientHeight() - 50],colCount:5,colTitle:["Tgl Mulai","Tgl Akhir","Week","Selesai","Dari"], readOnly:true,visible:false, dblClick:[this,"doGridClick"],colWidth:[[4,3,2,1,0],[50,50,50,80,80]], colFormat:[[3,4],[cfNilai, cfNilai]]});
							this.fr11.p2 = new panel(this.fr11,{caption:"Hasil KKP",bound:[frameWidth + 20,30,frameWidth,this.fr11.getClientHeight() - 50],colCount:5,colTitle:["Tgl Mulai","Tgl Akhir","Week","Selesai","Dari"], readOnly:true,visible:false, dblClick:[this,"doGridClick"],colWidth:[[4,3,2,1,0],[50,50,50,80,80]], colFormat:[[3,4],[cfNilai, cfNilai]]});
							this.fr11.p3 = new panel(this.fr11,{caption:"Hasil BA",bound:[(frameWidth * 2) + 30,30,frameWidth,this.fr11.getClientHeight() - 50],colCount:5,colTitle:["Tgl Mulai","Tgl Akhir","Week","Selesai","Dari"], readOnly:true,visible:false, dblClick:[this,"doGridClick"],colWidth:[[4,3,2,1,0],[50,50,50,80,80]], colFormat:[[3,4],[cfNilai, cfNilai]]});							
							
							this.fr11.grid1 = new saiGrid(this.fr11.p1,{bound:[0,30,this.fr11.p1.width-1,this.fr11.p1.height-30],colCount:5,colTitle:["Tgl Mulai","Tgl Akhir","Week","Selesai","Dari"], readOnly:true,visible:true, dblClick:[this,"doGridClick"],colWidth:[[4,3,2,1,0],[50,50,50,80,80]], colFormat:[[3,4],[cfNilai, cfNilai]]});
							this.fr11.grid2 = new saiGrid(this.fr11.p2,{bound:[0,30,this.fr11.p2.width-1,this.fr11.p2.height-30],colCount:5,colTitle:["Tgl Mulai","Tgl Akhir","Week","Selesai","Dari"], readOnly:true,visible:true, dblClick:[this,"doGridClick"],colWidth:[[4,3,2,1,0],[50,50,50,80,80]], colFormat:[[3,4],[cfNilai, cfNilai]]});
							this.fr11.grid3 = new saiGrid(this.fr11.p3,{bound:[0,30,this.fr11.p3.width-1,this.fr11.p3.height-30],colCount:5,colTitle:["Tgl Mulai","Tgl Akhir","Week","Selesai","Dari"], readOnly:true,visible:true, dblClick:[this,"doGridClick"],colWidth:[[4,3,2,1,0],[50,50,50,80,80]], colFormat:[[3,4],[cfNilai, cfNilai]]});							
							this.fr11.data = this.dataProvider.result[5];
							this.fr11.data2 = this.dataProvider.result[6];
							this.fr11.sql = this.sql.get(5);
							if (systemAPI.browser.msie) {
								//this.timer.setEnabled(true);
							}
							this.setData(this.fr1.grid,this.fr1.data);
							this.setData(this.fr2.grid,this.fr2.data);
							this.setData(this.fr6.grid,this.fr6.data);
							this.setData(this.fr7.grid,this.fr7.data);
							this.setData(this.fr10.grid,this.fr10.data,this.fr10.grid2);
							this.setData(this.fr11.grid,this.fr11.data);
                       }else throw result;
    	           break;
               }
            }catch(e){
                systemAPI.alert(this+"$request()",e+"<br>"+result);
            }
       }
    },
	setData: function(grid, data, grid2){
		grid.clear();
		if (grid == this.fr1.grid || grid == this.fr6.grid){			
			for (var i in data.rs.rows){
				grid.appendData([data.rs.rows[i].nama, floatToNilai(data.rs.rows[i].totsap), floatToNilai(data.rs.rows[i].totlap)]);
			}			
		}
		if (grid == this.fr10.grid){			
			var line;
			grid2.clear();
			var tot = [0,0,0,0]
			for (var i in data.rs.rows){
				line = data.rs.rows[i];
				grid.appendData([line.nama, floatToNilai(line.totsap), floatToNilai(line.totlap), floatToNilai(line.totba), floatToNilai(line.totdist)]);
				grid2.appendData([line.nama, floatToNilai(Math.round(line.totsap / line.totdist * 100)), floatToNilai(Math.round(line.totlap / line.totdist * 100)), floatToNilai(Math.round(line.totba / line.totdist * 100))]);
				tot[0] += parseFloat(line.totsap);
				tot[1] += parseFloat(line.totlap);
				tot[2] += parseFloat(line.totba);
				tot[3] += parseFloat(line.totdist);
			}		
			grid.appendData(["Total", floatToNilai(tot[0]), floatToNilai(tot[1]), floatToNilai(tot[2]), floatToNilai(tot[3])]);
			grid2.appendData(["Total", floatToNilai(Math.round(tot[0] / tot[3] * 100)), floatToNilai(Math.round(tot[1] / tot[3] * 100)), floatToNilai(Math.round(tot[2] / tot[3] * 100))]);				
			grid.rows.get(grid.rows.getLength() - 1).setColor("#ffff00");
			grid2.rows.get(grid2.rows.getLength() - 1).setColor("#ffff00");
		}
		if (grid == this.fr2.grid || grid == this.fr7.grid){
			for (var i in data.rs.rows){
				grid.appendData([data.rs.rows[i].nama, floatToNilai(data.rs.rows[i].tot)]);
			}				
		}
		
		if (grid == this.fr11.grid){
			for (var i in data.rs.rows){//floatToNilai(data.rs.rows[i].rencana), floatToNilai(data.rs.rows[i].prog2),
				grid.appendData([data.rs.rows[i].tgl_mulai,data.rs.rows[i].tgl_akhir,data.rs.rows[i].w,  floatToNilai(data.rs.rows[i].persen), floatToNilai(data.rs.rows[i].prog)]);
			}
			data = this.fr11.data2;
			var grid1 = this.fr11.grid1;
			var grid2 = this.fr11.grid2;
			var grid3 = this.fr11.grid3;
			grid1.clear(),grid2.clear(),grid3.clear();
			var line;
			for (var i in data.rs.rows){
				line = data.rs.rows[i];
				if (line.proses == "KKIL") grid = grid1;
				if (line.proses == "KKP") grid = grid2;
				if (line.proses == "BA") grid = grid3;
				grid.appendData([line.tgl_mulai,line.tgl_akhir,line.w,  floatToNilai(line.prog2), floatToNilai(line.rencana)]);
			}
		}
	},
    doTabChange: function(sender, page){
        this.count = 0;
		if (page == 1 && this.fr6.chart === undefined){																	
		}
		if (page == 2 && this.fr10.chart === undefined){			
		}		
    },
	doObjectReady: function(sender){
	   try{	    					    			
			this.getChart(sender.owner.data, sender);
        }catch(e){
           // alert("Object ready :" + e);
        }
    },        
	getChart: function(data,swf,autoRefresh){
		try{			
			if (data === undefined) return;
			if (data.rs === undefined) return;
			
			if (swf == this.fr1.chart || swf == this.fr6.chart){
				var chart = {
				  "bg_colour":"#edf5f8",
				  "y_legend":{
					"text": (this.tab.activePage == this.tab.childPage[1].resourceId ? "Nilai" :"Jumlah"),"style": "{color: #736AFF; font-size: 12px;}"
				  },
				  "elements":[],
				  "x_axis":{
					"stroke": 1,"tick_height": 10,"colour":"#d000d0","grid_colour": "#00ff00","labels":{"labels":[],"rotate": 45}
				   },
				  "y_axis":{
					"stroke":4,"tick_length": 3,"colour":"#d000d0","grid_colour": "#00ff00","offset":0,"max":20
				  },
				  "tooltip":{
					"text": "Global Tooltip<br>val=#val#, top=#top#"
				  }
				};  
				var line,temp="", maxValue = -999999999,minValue = 999999999;
				var r = Math.floor(Math.random()*256),g = Math.floor(Math.random()*256),b = Math.floor(Math.random()*256);
				var sapColor = (r+256 * g + 65536 * b).toString(16);
				r = Math.floor(Math.random()*256),g = Math.floor(Math.random()*256),b = Math.floor(Math.random()*256);
				var veatColor = (r+256 * g + 65536 * b).toString(16);
				var sap = {"type":"bar","alpha":     0.8,"colour":    "#ff9900",
					  "tip":       "SAP AM (#val#)",
					  "text":      "SAP AM",
					  "font-size--": 10,
					  "values" :   [],
					  "linkCtrl": swf.resourceId.toString(),
					  "on-click": "system.getResource("+this.resourceId+").doChartClick",
					  "on-show":	{"type": ""}
					};
				var veat = {"type":"bar","alpha":     0.8,"colour":    "#0000ff",
					  "tip":       "Hasil Lapangan (#val#) ",
					  "text":      "INV.LAP",
					  "font-size--": 10,
					  "values" :   [],
					  "linkCtrl": swf.resourceId.toString(),
					  "on-click": "system.getResource("+this.resourceId+").doChartClick",
					  "on-show":	{"type":(!systemAPI.browser.msie ? "grow-up":"") }
					};
				swf.labels = [];
				this.dataDivisi = new arrayList();
				if (data.rs.rows[0]!==undefined)
				{
					for (var i in data.rs.rows){
						line = data.rs.rows[i];  						
						sap.values.push(Math.round(line.totsap));						
						veat.values.push( Math.round(line.totlap));												
						chart.x_axis.labels.labels.push(line.nama);
						swf.labels.push(line.nama);
						if (parseFloat(line.totsap) > maxValue ) maxValue = parseFloat(line.totsap);
						if (parseFloat(line.totsap) < minValue ) minValue = parseFloat(line.totsap);						
						if (parseFloat(line.totlap) > maxValue ) maxValue = parseFloat(line.totlap);
						if (parseFloat(line.totlap) < minValue ) minValue = parseFloat(line.totlap);						
						this.dataDivisi.add(line.nama);
					}									
				}else{
					var line,temp="", maxValue = 0,minValue = 0;			
				}    			
				chart.elements.push(sap);
				chart.elements.push(veat);
			}else if (swf == this.fr2.chart || swf == this.fr7.chart){
				var chart = {
				  "bg_colour":"#edf5f8",
				  "y_legend":{
					"text": (this.tab.activePage == this.tab.childPage[1].resourceId ? "Nilai " :"Persen"),"style": "{color: #736AFF; font-size: 12px;}"
				  },
				  "elements":[],
				  "x_axis":{
					"stroke": 1,"tick_height": 10,"colour":"#d000d0","grid_colour": "#00ff00","labels":{"labels":["Divisi"]}
				   },
				  "y_axis":{
					"stroke":4,"tick_length": 3,"colour":"#d000d0","grid_colour": "#00ff00","offset":0,"max":20,"steps": 10
				  },
				  "tooltip":{
					"text": "Global Tooltip<br>val=#val#, top=#top#"
				  }
				};  
				 var line,temp="", maxValue = -999999999,minValue = 999999999;
				 this.dataDivisi = new arrayList();
				 for (var i in data.rs.rows){
					line = data.rs.rows[i];
					var r = Math.floor(Math.random()*256),g = Math.floor(Math.random()*256),b = Math.floor(Math.random()*256);
					color = (r+256 * g + 65536 * b).toString(16);
					temp = {
						"type":"bar_glass","alpha":     0.5,"colour":    "#"+ color,
						"tip":       line.nama+ "(#val#)",
						"text--":      line.nama,
						"font-size--": 10,
						"linkCtrl": swf.resourceId.toString(),
						"on-click": "system.getResource("+this.resourceId+").doChartClick",
						"values" :   [Math.round(line.tot)],
						"on-show":	{"type": (!systemAPI.browser.msie ? "grow-up":""), "cascade":0.9}
					};
					if (parseFloat(line.tot) > maxValue ) maxValue = parseFloat(line.tot);
					if (parseFloat(line.tot) < minValue ) minValue = parseFloat(line.tot);
					chart.elements.push(temp);
					this.dataDivisi.add(line.nama);				
				 }			
			}else if (swf == this.fr10.chart){
				var chart = {
				  "bg_colour":"#edf5f8",
				  "y_legend":{
					"text": "Persen","style": "{color: #736AFF; font-size: 12px;}"
				  },
				  "elements":[],
				  "x_axis":{
					"stroke": 1,"tick_height": 10,"colour":"#d000d0","grid_colour": "#00ff00","labels":{"labels":[],"rotate": 45}
				   },
				  "y_axis":{
					"stroke":4,"tick_length": 3,"colour":"#d000d0","grid_colour": "#00ff00","offset":0,"max":20, "steps":10
				  },
				  "tooltip":{
					"text": "Global Tooltip<br>val=#val#, top=#top#"
				  }
				};  
				var line,temp="", maxValue = -999999999,minValue = 999999999;
				var r = Math.floor(Math.random()*256),g = Math.floor(Math.random()*256),b = Math.floor(Math.random()*256);
				var sapColor = (r+256 * g + 65536 * b).toString(16);
				r = Math.floor(Math.random()*256),g = Math.floor(Math.random()*256),b = Math.floor(Math.random()*256);
				var veatColor = (r+256 * g + 65536 * b).toString(16);
				var sap = {"type":"bar","alpha":     0.8,"colour":    "#0000ff",
					  "tip":       "Inventarisasi Lapangan (#val#)",
					  "text":      "INV. LAP",
					  "font-size--": 10,
					  "values" :   [],
					  "linkCtrl": swf.resourceId.toString(),
					  "on-click": "system.getResource("+this.resourceId+").doChartClick",
					  "on-show":	{"type": (!systemAPI.browser.msie ? "grow-up":"")}
					};
				var veat = {"type":"bar","alpha":     0.8,"colour":    "#379bc5",
					  "tip":       "Rekonsiliasi (#val#) ",
					  "text":      "REKON",
					  "font-size--": 10,
					  "values" :   [],
					  "linkCtrl": swf.resourceId.toString(),
					  "on-click": "system.getResource("+this.resourceId+").doChartClick",
					  "on-show":	{"type": (!systemAPI.browser.msie ? "grow-up":"")}
					};
				var ba = {"type":"bar","alpha":     0.8,"colour":    "#ff9900",
					  "tip":       "BA (#val#) ",
					  "text":      "BA",
					  "font-size--": 10,
					  "values" :   [],
					  "linkCtrl": swf.resourceId.toString(),
					  "on-click": "system.getResource("+this.resourceId+").doChartClick",
					  "on-show":	{"type": (!systemAPI.browser.msie ? "grow-up":"")}
					};
				swf.labels = [];
				if (data.rs.rows[0]!==undefined)
				{		
					this.dataDivisi = new arrayList();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];  						
						sap.values.push(Math.round(line.totsap / line.totdist * 100));
						veat.values.push( Math.round(line.totlap / line.totdist * 100));
						ba.values.push( Math.round(line.totba / line.totdist * 100));
						chart.x_axis.labels.labels.push(line.nama);
						swf.labels.push(line.nama);
						if (parseFloat(line.totsap)/ line.totdist * 100 > maxValue ) maxValue = parseFloat(line.totsap)/ line.totdist * 100;
						if (parseFloat(line.totsap)/ line.totdist * 100 < minValue ) minValue = parseFloat(line.totsap)/ line.totdist * 100;
						if (parseFloat(line.totlap)/ line.totdist * 100 > maxValue ) maxValue = parseFloat(line.totlap)/ line.totdist * 100;
						if (parseFloat(line.totlap)/ line.totdist * 100 < minValue ) minValue = parseFloat(line.totlap)/ line.totdist * 100;
						if (parseFloat(line.totba)/ line.totdist * 100 > maxValue ) maxValue = parseFloat(line.totba)/ line.totdist * 100;
						if (parseFloat(line.totba)/ line.totdist * 100 < minValue ) minValue = parseFloat(line.totba)/ line.totdist * 100;
						this.dataDivisi.add(line.nama);
					}									
				}else{
					var line,temp="", maxValue = 0,minValue = 0;			
				}    			
				chart.elements.push(sap);
				chart.elements.push(veat);
				chart.elements.push(ba);
			}else if (swf == this.fr11.chart){
				var chart = {
				  "title": {
					"text": "PROGRESS VEAT " + (this.pFilter.area.getText() == "" ? "":"\n LOKASI "+this.pFilter.area.rightLabelCaption)
				  },
				  "bg_colour":"#edf5f8",
				  "y_legend":{
					"text": ("Persen"),"style": "{color: #736AFF; font-size: 12px;}"
				  },
				  "elements":[],
				  "x_axis":{
					"stroke": 1,"tick_height": 10,"colour":"#d000d0","grid_colour": "#00ff00","labels":{"labels":[],"rotate": 45}
				   },
				  "y_axis":{
					"stroke":4,"tick_length": 3,"colour":"#d000d0","grid_colour": "#00ff00","offset":0,"max":20, "steps": 10
				  },
				  "tooltip":{
					"text": "Global Tooltip<br>val=#val#, top=#top#"
				  }
				};  
				var line,temp="", maxValue = -999999999,minValue = 999999999;
				var r = Math.floor(Math.random()*256),g = Math.floor(Math.random()*256),b = Math.floor(Math.random()*256);
				var sapColor = (r+256 * g + 65536 * b).toString(16);
				r = Math.floor(Math.random()*256),g = Math.floor(Math.random()*256),b = Math.floor(Math.random()*256);
				var veatColor = (r+256 * g + 65536 * b).toString(16);
				var sap = {"type":"line","alpha":     0.8,"colour":    "#ff9900",
					  "tip":       "Rencana (#val#)",
					  "text":      "Rencana",
					  "font-size--": 10,
					  "values" :   [],
					  "dot-style": { "type": "anchor", "dot-size": 4, "halo-size": 2, "colour": "#ff9900", "rotation": 45, "sides": 4 },
					  "linkCtrl": swf.resourceId.toString(),
					  "on-click": "system.getResource("+this.resourceId+").doChartClick",
					  "on-show":	{"type": "grow-up"}
					};
				var veat = {"type":"line","alpha":     0.8,"colour":    "#0000ff",
					  "tip":       "Progress (#val#) ",
					  "text":      "Progress",
					  "font-size--": 10,
					  "values" :   [],
					  "linkCtrl": swf.resourceId.toString(),
					  "dot-style": { "type": "star", "dot-size": 4, "halo-size": 1, "colour": "#0000ff" },
					  "on-click": "system.getResource("+this.resourceId+").doChartClick",
					  "on-show":	{"type": "grow-up"}
					};
				swf.labels = [];
				this.dataDivisi = new arrayList();
				if (data.rs.rows[0]!==undefined)
				{
					for (var i in data.rs.rows){
						line = data.rs.rows[i];  						
						sap.values.push({"value":Math.round(line.persen),"type":"anchor","tip":"Rencana :"+line.w +" ( #val#% )"});
						var d1 = line.tgl_mulai;
						d1 = new Date().strToDate(d1);			
						if (d1 < new Date()) veat.values.push( {"value":Math.round(line.prog),"type":"star","tip":"Progress :" + line.w +" ( #val#% )"});					
						chart.x_axis.labels.labels.push(line.w);
						swf.labels.push(line.nama);
						if (parseFloat(line.persen) > maxValue ) maxValue = parseFloat(line.persen);
						if (parseFloat(line.persen) < minValue ) minValue = parseFloat(line.persen);						
						if (parseFloat(line.prog) > maxValue ) maxValue = parseFloat(line.prog);
						if (parseFloat(line.prog) < minValue ) minValue = parseFloat(line.prog);						
						this.dataDivisi.add(line.nama);
					}									
				}else{
					var line,temp="", maxValue = 0,minValue = 0;			
				}    			
				chart.elements.push(sap);
				chart.elements.push(veat);
			}
			chart.y_axis.max = maxValue + 10;		
			swf.setChartData(chart,autoRefresh);		
		}catch(e){
			alert(e);
		}
	},    
	doBtnClick: function(sender){
		try{
			if (sender == this.fr1.bXls || sender == this.fr6.bXls){				
				var panel = sender.owner;
				this.xlsChart.series = new server_util_arrayList();		
				this.xlsChart.setFilename("SAP-KKIL.xls");
				var data = [], series = new arrayMap(), colTitle = [];
				for (var i=0; i < panel.grid.getRowCount(); i++){
					for (var c=0; c < panel.grid.getColCount(); c++){
						colTitle[c] = panel.grid.columns.get(c).title;
						if (data[c] === undefined) {
							data[c] = [];
							if (c > 0){
								var col = this.xlsChart.indexToColumn(c);
								var colCat = this.xlsChart.indexToColumn(0);
								var max = panel.grid.getRowCount()+1;								
								series.set(c, {title: panel.grid.columns.get(c).title, categories:"$"+colCat+"$2:$"+colCat+max, values:"$"+col+"$2:$"+col+"$"+max });
							}
						}
						data[c][data[c].length] = c > 0 ? parseFloat(nilaiToFloat(panel.grid.cells(c, i))) : panel.grid.cells(c, i);									
					}					
				}				
				this.xlsChart.setData(data);
				this.xlsChart.setColTitle(colTitle);
				this.xlsChart.setChartType("column");
				var serie;
				for (var i in series.objList){
					serie = series.get(i);
					this.xlsChart.addSeries(serie.title,serie.categories,serie.values);
				}							
				this.xlsChart.setTitle("Perbandingan Data SAP dgn KKIL");
				this.xlsChart.setXTitle("Divisi");
				this.xlsChart.setYTitle("Jumlah NKA");
				//window.open( this.xlsChart.getChart() );
				downloadFile(this.xlsChart.getChart() );
			}else if (sender == this.fr10.bXls){
				var panel = sender.owner;
				this.xlsChart.series = new server_util_arrayList();		
				this.xlsChart.setFilename("monitoring.xls");
				var data = [], series = new arrayMap(), colTitle = [];
				for (var i=0; i < panel.grid2.getRowCount() - 1; i++){
					for (var c=0; c < panel.grid2.getColCount(); c++){
						colTitle[c] = panel.grid2.columns.get(c).title;
						if (data[c] === undefined) {
							data[c] = [];
							if (c > 0 && c != 4){
								var col = this.xlsChart.indexToColumn(c);
								var colCat = this.xlsChart.indexToColumn(0);
								var max = panel.grid2.getRowCount()+1;								
								series.set(c, {title: panel.grid2.columns.get(c).title, categories:"$"+colCat+"$2:$"+colCat+max, values:"$"+col+"$2:$"+col+"$"+max });
							}
						}
						data[c][data[c].length] = c > 0 ? parseFloat(nilaiToFloat(panel.grid2.cells(c, i))) : panel.grid2.cells(c, i);									
					}					
				}				
				this.xlsChart.setData(data);
				this.xlsChart.setColTitle(colTitle);
				this.xlsChart.setChartType("column");
				var serie;
				for (var i in series.objList){
					serie = series.get(i);
					this.xlsChart.addSeries(serie.title,serie.categories,serie.values);
				}							
				this.xlsChart.setTitle("Data Hasil Inventarisasi");
				this.xlsChart.setXTitle("Divisi");
				this.xlsChart.setYTitle("Persen");
				//window.open( this.xlsChart.getChart() );
				downloadFile(this.xlsChart.getChart() );
			}else if (sender == this.fr11.bXls){				
				this.xlsChart.series = new server_util_arrayList();		
				this.xlsChart.setFilename("KurvaS.xls");
				var data = [], series = new arrayMap(), colTitle = [];
				for (var i=0; i < this.fr11.grid.getRowCount(); i++){
					for (var c=0; c < this.fr11.grid.getColCount(); c++){
						colTitle[c] = this.fr11.grid.columns.get(c).title;
						if (data[c] === undefined) {
							data[c] = [];
							if (c > 2){
								var col = this.xlsChart.indexToColumn(c);
								var colCat = this.xlsChart.indexToColumn(2);
								var max = this.fr11.grid.getRowCount()+1;
								series.set(c, {title: this.fr11.grid.columns.get(c).title, categories:"$"+colCat+"$2:$"+colCat+max, values:"$"+col+"$2:$"+col+"$"+max });
							}
						}
						if (c == 4){
							var d1 = this.fr11.grid.cells(0,i);							
							d1 = new Date().strToDate(d1);										
							if (d1 < new Date()) data[c][data[c].length] = c > 2 ? parseFloat(nilaiToFloat(this.fr11.grid.cells(c, i))) : this.fr11.grid.cells(c, i);
							else data[c][data[c].length] = "";									
						}else  data[c][data[c].length] = c > 2 ? parseFloat(nilaiToFloat(this.fr11.grid.cells(c, i))) : this.fr11.grid.cells(c, i);									
					}					
				}				
				this.xlsChart.setColTitle(colTitle);
				this.xlsChart.setData(data);
				this.xlsChart.setChartType("line");
				var serie;
				for (var i in series.objList){
					serie = series.get(i);
					this.xlsChart.addSeries(serie.title,serie.categories,serie.values);
				}							
				this.xlsChart.setTitle("PROGRESS VEAT");
				this.xlsChart.setXTitle("Minggu ke-n");
				this.xlsChart.setYTitle("Jumlah NKA");
				//window.open( this.xlsChart.getChart() );
				downloadFile(this.xlsChart.getChart() );
			}else if (sender == this.fr11.bGrid){
				sender.owner.p1.show();
				sender.owner.p2.show();
				sender.owner.p3.show();
				sender.owner.grid.hide();
				sender.owner.chart.hide();
			}else if (sender == this.fr11.bGraph){
				sender.owner.p1.hide();
				sender.owner.p2.hide();
				sender.owner.p3.hide();
				sender.owner.grid.show();
				sender.owner.chart.show();
			}else if (sender.name == "graph"){
				sender.owner.grid.hide();
				sender.owner.chart.show();
				if (sender.owner.grid2)sender.owner.grid2.hide();
			}else{
				sender.owner.grid.show();
				if (sender.owner.grid2)sender.owner.grid2.show();
				sender.owner.chart.hide();
			}
			this.firstLoad = false;
		}catch(e){
			alert(e);
		}
	},
	doChartClick: function(sender,index,title){		
		try{
			eval("sender="+sender);			
			this.doGridClick(sender, title, index);
		}catch(e){
			alert(e);
		}
	},
	doGridClick: function(sender, col, row){
		try{			
			var filter = (sender instanceof saiGrid ? sender.cells(0,row) : this.dataDivisi.get(row));//col == title
			
			if (sender instanceof flashChart){
				if (sender.clicked > 0) { filter = " "; sender.clicked = -1;}
				var sql = new server_util_arrayList();				
				if (this.tab.activePage == this.tab.childPage[0].resourceId){
					sql.add("select nama, count(no_gabung) as totsap, sum(status) as totlap from "+
						" (select distinct a.no_gabung, case when '"+filter+"' = ' ' then  b.nama else 'Kantor Divisi' end as nama, case when k.no_gabung is null then 0 else 1 end as status from amu_asset a "+ 
						" inner join amu_lokasi b on b.kode_lokfa = a.kode_lokfa and b.kode_lokasi = a.kode_lokasi and b.kode_induk = '00' "+
						" inner join amu_bagiklp_d bg on bg.kode_klpfa = a.kode_klpfa and bg.periode = a.periode and bg.jenis_proc = 'FISIK' " +
						" left outer join amu_kkl_d k on k.no_gabung = a.no_gabung and k.periode = a.periode "+
						" where a.kode_lokasi = '"+this.app._lokasi+"' and b.nama like '"+ trim(filter) +"%' "+
						"union "+
						"select distinct a.no_gabung, case when '"+filter+"' = ' ' then c.nama else case when substr(a.kode_lokfa,1,3) = 'T50' then 'Kantor Divisi' else  b.nama end end as nama, case when k.no_gabung is null then 0 else 1 end as status from amu_asset a "+ 
						" inner join amu_lokasi b on b.kode_lokfa = a.kode_lokfa and b.kode_lokasi = a.kode_lokasi  "+
						" inner join amu_lokasi c on c.kode_lokfa = b.kode_induk and c.kode_lokasi = a.kode_lokasi and c.kode_induk = '00' "+
						" inner join amu_bagiklp_d bg on bg.kode_klpfa = a.kode_klpfa and bg.periode = a.periode and bg.jenis_proc = 'FISIK' " +
						" left outer join amu_kkl_d k on k.no_gabung = a.no_gabung and k.periode = a.periode "+
						" where a.kode_lokasi = '"+this.app._lokasi+"' and c.nama like '"+ trim(filter) +"%'"+
						"union "+
						"select distinct a.no_gabung, case when '"+filter+"' = ' ' then d.nama else case when substr(a.kode_lokfa,1,3) = 'T50' then 'Kantor Divisi' else  c.nama end end as nama, case when k.no_gabung is null then 0 else 1 end as status from amu_asset a "+ 
						" inner join amu_lokasi b on b.kode_lokfa = a.kode_lokfa and b.kode_lokasi = a.kode_lokasi "+
						" inner join amu_lokasi c on c.kode_lokfa = b.kode_induk and c.kode_lokasi = a.kode_lokasi "+
						" inner join amu_lokasi d on d.kode_lokfa = c.kode_induk and d.kode_lokasi = a.kode_lokasi and d.kode_induk = '00' "+
						" inner join amu_bagiklp_d bg on bg.kode_klpfa = a.kode_klpfa and bg.periode = a.periode and bg.jenis_proc = 'FISIK' " +
						" left outer join amu_kkl_d k on k.no_gabung = a.no_gabung and k.periode = a.periode "+
						" where a.kode_lokasi = '"+this.app._lokasi+"' and d.nama like '"+ trim(filter) +"%' ) a group by nama order by nama ");	
					
					sql.add("select nama,  sum(status) / count(no_gabung) * 100 as tot from "+
						" (select distinct a.no_gabung, case when '"+filter+"' = ' ' then b.nama else 'Kantor Divisi' end as nama, case when k.no_gabung is null then 0 else 1 end as status from amu_asset a "+ 
						" inner join amu_lokasi b on b.kode_lokfa = a.kode_lokfa and b.kode_lokasi = a.kode_lokasi and b.kode_induk = '00' "+
						" inner join amu_bagiklp_d bg on bg.kode_klpfa = a.kode_klpfa and bg.periode = a.periode and bg.jenis_proc = 'FISIK' " +
						" left outer join amu_kkl_d k on k.no_gabung = a.no_gabung and k.periode = a.periode "+
						" where a.kode_lokasi = '"+this.app._lokasi+"' and b.nama like '"+ trim(filter) +"%' "+
						"union "+
						"select distinct a.no_gabung, case when '"+filter+"' = ' ' then c.nama else case when substr(a.kode_lokfa,1,3) = 'T50' then 'Kantor Divisi' else  b.nama end end as nama, case when k.no_gabung is null then 0 else 1 end as status from amu_asset a "+ 
						" inner join amu_lokasi b on b.kode_lokfa = a.kode_lokfa and b.kode_lokasi = a.kode_lokasi  "+
						" inner join amu_lokasi c on c.kode_lokfa = b.kode_induk and c.kode_lokasi = a.kode_lokasi and c.kode_induk = '00' "+
						" inner join amu_bagiklp_d bg on bg.kode_klpfa = a.kode_klpfa and bg.periode = a.periode and bg.jenis_proc = 'FISIK' " +
						" left outer join amu_kkl_d k on k.no_gabung = a.no_gabung and k.periode = a.periode "+
						" where a.kode_lokasi = '"+this.app._lokasi+"' and c.nama like '"+ trim(filter) +"%' "+
						"union "+
						"select distinct a.no_gabung, case when '"+filter+"' = ' ' then d.nama else case when substr(a.kode_lokfa,1,3) = 'T50' then 'Kantor Divisi' else  c.nama end end as nama, case when k.no_gabung is null then 0 else 1 end as status from amu_asset a "+ 
						" inner join amu_lokasi b on b.kode_lokfa = a.kode_lokfa and b.kode_lokasi = a.kode_lokasi "+
						" inner join amu_lokasi c on c.kode_lokfa = b.kode_induk and c.kode_lokasi = a.kode_lokasi "+
						" inner join amu_lokasi d on d.kode_lokfa = c.kode_induk and d.kode_lokasi = a.kode_lokasi and d.kode_induk = '00' "+
						" inner join amu_bagiklp_d bg on bg.kode_klpfa = a.kode_klpfa and bg.periode = a.periode and bg.jenis_proc = 'FISIK' " +
						" left outer join amu_kkl_d k on k.no_gabung = a.no_gabung and k.periode = a.periode "+
						" where a.kode_lokasi = '"+this.app._lokasi+"' and d.nama like '"+ trim(filter) +"%' ) a group by nama order by nama ");	
				}else if (this.tab.activePage == this.tab.childPage[1].resourceId){
					sql.add("select nama,  sum(nilai_buku) as totsap, sum(status) as totlap from ("+
					" select distinct a.no_gabung, case when '"+filter+"' = ' ' then b.nama else 'Kantor Divisi' end as nama, a.nilai_buku,case when k.no_gabung is null then 0 else a.nilai_buku end as status from amu_asset a "+ 
					" inner join amu_lokasi b on b.kode_lokfa = a.kode_lokfa and b.kode_lokasi = a.kode_lokasi and b.kode_induk = '00' "+
					" inner join amu_bagiklp_d bg on bg.kode_klpfa = a.kode_klpfa and bg.periode = a.periode and bg.jenis_proc = 'FISIK' " +
					" left outer join amu_kkl_d k on k.no_gabung = a.no_gabung and k.periode = a.periode "+
					" where a.kode_lokasi = '"+this.app._lokasi+"' and b.nama like '"+ trim(filter) +"%' "+
					"union "+
					"select distinct a.no_gabung, case when '"+filter+"' = ' ' then c.nama else case when substr(a.kode_lokfa,1,3) = 'T50' then 'Kantor Divisi' else  b.nama end  end as nama, a.nilai_buku, case when k.no_gabung is null then 0 else a.nilai_buku end as status from amu_asset a "+ 
					" inner join amu_lokasi b on b.kode_lokfa = a.kode_lokfa and b.kode_lokasi = a.kode_lokasi  "+
					" inner join amu_lokasi c on c.kode_lokfa = b.kode_induk and c.kode_lokasi = a.kode_lokasi and c.kode_induk = '00' "+
					" inner join amu_bagiklp_d bg on bg.kode_klpfa = a.kode_klpfa and bg.periode = a.periode and bg.jenis_proc = 'FISIK' " +
					" left outer join amu_kkl_d k on k.no_gabung = a.no_gabung and k.periode = a.periode "+
					" where a.kode_lokasi = '"+this.app._lokasi+"' and c.nama like '"+ trim(filter) +"%'  "+
					"union "+
					"select distinct a.no_gabung, case when '"+filter +"' = ' ' then d.nama else case when substr(a.kode_lokfa,1,3) = 'T50' then 'Kantor Divisi' else  b.nama end end as nama, a.nilai_buku, case when k.no_gabung is null then 0 else a.nilai_buku end as status from amu_asset a "+ 
					" inner join amu_lokasi b on b.kode_lokfa = a.kode_lokfa and b.kode_lokasi = a.kode_lokasi "+
					" inner join amu_lokasi c on c.kode_lokfa = b.kode_induk and c.kode_lokasi = a.kode_lokasi "+
					" inner join amu_lokasi d on d.kode_lokfa = c.kode_induk and d.kode_lokasi = a.kode_lokasi and d.kode_induk = '00' "+
					" inner join amu_bagiklp_d bg on bg.kode_klpfa = a.kode_klpfa and bg.periode = a.periode and bg.jenis_proc = 'FISIK' " +
					" left outer join amu_kkl_d k on k.no_gabung = a.no_gabung and k.periode = a.periode "+
					" where a.kode_lokasi = '"+this.app._lokasi+"' and d.nama like '"+ trim(filter) +"%'  ) a group by nama order by nama ");
					
					sql.add("select nama,  sum(status) as tot from ("+
					" select distinct a.no_gabung, case when '"+filter +"' = ' ' then b.nama else 'Kantor Divisi' end as nama, a.nilai_buku,case when k.no_gabung is null then 0 else a.nilai_buku end as status from amu_asset a "+ 
					" inner join amu_lokasi b on b.kode_lokfa = a.kode_lokfa and b.kode_lokasi = a.kode_lokasi and b.kode_induk = '00' "+
					" inner join amu_bagiklp_d bg on bg.kode_klpfa = a.kode_klpfa and bg.periode = a.periode and bg.jenis_proc = 'FISIK' " +
					" left outer join amu_kkl_d k on k.no_gabung = a.no_gabung and k.periode = a.periode "+
					" where a.kode_lokasi = '"+this.app._lokasi+"' and b.nama like '"+ trim(filter) +"%' "+
					"union "+
					"select distinct a.no_gabung, case when '"+filter +"' = ' ' then c.nama else case when substr(a.kode_lokfa,1,3) = 'T50' then 'Kantor Divisi' else  b.nama end end as nama, a.nilai_buku, case when k.no_gabung is null then 0 else a.nilai_buku end as status from amu_asset a "+ 
					" inner join amu_lokasi b on b.kode_lokfa = a.kode_lokfa and b.kode_lokasi = a.kode_lokasi  "+
					" inner join amu_lokasi c on c.kode_lokfa = b.kode_induk and c.kode_lokasi = a.kode_lokasi and c.kode_induk = '00' "+
					" inner join amu_bagiklp_d bg on bg.kode_klpfa = a.kode_klpfa and bg.periode = a.periode and bg.jenis_proc = 'FISIK' " +
					" left outer join amu_kkl_d k on k.no_gabung = a.no_gabung and k.periode = a.periode "+
					" where a.kode_lokasi = '"+this.app._lokasi+"' and c.nama like '"+ trim(filter)+"%' "+
					"union "+
					"select distinct a.no_gabung, case when '"+filter +"' = ' ' then  d.nama else case when substr(a.kode_lokfa,1,3) = 'T50' then 'Kantor Divisi' else c.nama end end as nama, a.nilai_buku, case when k.no_gabung is null then 0 else a.nilai_buku end as status from amu_asset a "+ 
					" inner join amu_lokasi b on b.kode_lokfa = a.kode_lokfa and b.kode_lokasi = a.kode_lokasi "+
					" inner join amu_lokasi c on c.kode_lokfa = b.kode_induk and c.kode_lokasi = a.kode_lokasi "+
					" inner join amu_lokasi d on d.kode_lokfa = c.kode_induk and d.kode_lokasi = a.kode_lokasi and d.kode_induk = '00' "+
					" inner join amu_bagiklp_d bg on bg.kode_klpfa = a.kode_klpfa and bg.periode = a.periode and bg.jenis_proc = 'FISIK' " +
					" left outer join amu_kkl_d k on k.no_gabung = a.no_gabung and k.periode = a.periode "+
					" where a.kode_lokasi = '"+this.app._lokasi+"' and d.nama like '"+trim(filter)+"%' ) a group by nama order by nama ");	
					
				}else return;
				var data = this.dbLib.getMultiDataProvider(sql, true);							
				sender.owner.data = data.result[0];
				sender.owner.sibling.data  = data.result[1];
				this.getChart(sender.owner.data, sender);
				this.setData(sender.owner.grid,sender.owner.data);
				
				this.getChart(sender.owner.sibling.data, sender.owner.sibling.chart);
				this.setData(sender.owner.sibling.grid, sender.owner.sibling.data);
				
				sender.clicked++;								
				return;
			}
			if (this.trail1 === undefined){
				this.trail1 = new app_assetsap_dashboardfTrail1(this.owner,undefined, this);
				this.trail1.maximize();			
			}					
			
			var sqlBase = "select a.kode_lokasi, e.nama as nmdivisi, a.no_fa, a.no_sn, a.nama, a.kode_klpfa, a.kode_lokfa, a.kode_klpakun, date_format(a.tgl_perolehan,'%d-%m-%Y') as tgl_perolehan, a.nilai, a.nilai_ap, a.nilai_buku, a.nama2 as alamat, a.jml_fisik  from amu_asset a "+
				" inner join amu_klp b on b.kode_klpfa = a.kode_klpfa and b.kode_lokasi = a.kode_lokasi"+
				" inner join amu_lokasi c on c.kode_lokfa = a.kode_lokfa and c.kode_lokasi = a.kode_lokasi "+
				" inner join amu_lokasi d on d.kode_lokfa = c.kode_induk and d.kode_lokasi = a.kode_lokasi "+
				" inner join amu_lokasi e on e.kode_lokfa = d.kode_induk and e.kode_lokasi = a.kode_lokasi and e.kode_induk = '00' "+
				" inner join amu_bagiklp_d bg on bg.kode_klpfa = a.kode_klpfa and bg.periode = a.periode and bg.jenis_proc = 'FISIK' " +
				" union "+
				" select a.kode_lokasi, d.nama as nmdivisi, a.no_fa, a.no_sn, a.nama, a.kode_klpfa, a.kode_lokfa, a.kode_klpakun, date_format(a.tgl_perolehan,'%d-%m-%Y') as tgl_perolehan, a.nilai, a.nilai_ap, a.nilai_buku, a.nama2 as alamat, a.jml_fisik  from amu_asset a "+
				" inner join amu_klp b on b.kode_klpfa = a.kode_klpfa and b.kode_lokasi = a.kode_lokasi"+
				" inner join amu_lokasi c on c.kode_lokfa = a.kode_lokfa and c.kode_lokasi = a.kode_lokasi "+
				" inner join amu_lokasi d on d.kode_lokfa = c.kode_induk and d.kode_lokasi = a.kode_lokasi and d.kode_induk = '00' "+				
				" inner join amu_bagiklp_d bg on bg.kode_klpfa = a.kode_klpfa and bg.periode = a.periode and bg.jenis_proc = 'FISIK' " +
				"union "+
				" select a.kode_lokasi, c.nama as nmdivisi, a.no_fa, a.no_sn, a.nama, a.kode_klpfa, a.kode_lokfa, a.kode_klpakun, date_format(a.tgl_perolehan,'%d-%m-%Y') as tgl_perolehan, a.nilai, a.nilai_ap, a.nilai_buku, a.nama2 as alamat, a.jml_fisik  from amu_asset a "+
				" inner join amu_klp b on b.kode_klpfa = a.kode_klpfa and b.kode_lokasi = a.kode_lokasi"+
				" inner join amu_lokasi c on c.kode_lokfa = a.kode_lokfa and c.kode_lokasi = a.kode_lokasi and c.kode_induk = '00' "+
				" inner join amu_bagiklp_d bg on bg.kode_klpfa = a.kode_klpfa and bg.periode = a.periode and bg.jenis_proc = 'FISIK' ";
			switch(sender){
				case this.fr1.grid: 
				case this.fr6.grid:					
				case this.fr1.chart: 
				case this.fr6.chart:															
					this.trail1.setSQL("select * from ("+
						sqlBase + " ) a "+
						"where kode_lokasi = '"+this.app._lokasi+"' and nmdivisi = '"+filter+"' "+this.filter,
						"select count(*) from ("+
						sqlBase + " ) a "+
						"where a.kode_lokasi = '"+this.app._lokasi+"' and nmdivisi = '"+filter+"' "+this.filter);
					this.trail1.setPanelCaption("Divisi "+filter+" ");
				break;
				case this.fr2.grid:
				case this.fr7.grid:
				case this.fr2.chart:
				case this.fr7.chart:					
					this.trail1.setSQL("select * from ("+
						sqlBase + " ) a "+
						"where kode_lokasi = '"+this.app._lokasi+"' and nmdivisi = '"+filter+"' "+this.filter,
						"select count(*) from ("+
						sqlBase + " ) a "+
						"where a.kode_lokasi = '"+this.app._lokasi+"' and nmdivisi = '"+filter+"' "+this.filter);
					this.trail1.setPanelCaption("Divisi "+filter+" ");
				break;
				case this.fr10.grid:				
					this.trail1.setSQL("select * from ("+
						sqlBase + " ) a "+
						"where kode_lokasi = '"+this.app._lokasi+"' and nmdivisi = '"+filter+"' "+this.filter,
						"select count(*) from ("+
						sqlBase + ") a "+
						"where a.kode_lokasi = '"+this.app._lokasi+"' and nmdivisi = '"+filter+"' "+this.filter);
					this.trail1.setPanelCaption("Divisi "+filter+" ");
				break;				
			}
			this.block(true);
			this.trail1.show();
		}catch(e){
			alert(e);
		}
	},
	doTimer: function(sender){
		this.timer.setEnabled(false);
		if (this.tab.activePage == 0){
			this.getChart(this.fr1.chart.data, this.fr1.chart);			
			this.getChart(this.fr2.chart.data, this.fr12.chart);			
			this.fr1.chart.refresh();
			this.fr2.chart.refresh();			
		}
		if (this.tab.activePage == 1){
			this.getChart(this.fr6.chart.data, this.fr6.chart);
			this.getChart(this.fr7.chart.data, this.fr7.chart);			
			this.fr6.chart.refresh();
			this.fr7.chart.refresh();			
		}
		if (this.tab.activePage == 2){
			this.getChart(this.fr10.chart.data, this.fr10.chart);			
			this.fr10.chart.refresh();			
		}
		
	}
});

window.app_assetsap_dashboardfTrail1 = function(owner,options,callObj)
{
    if (owner)
    {
		try{
	        window.app_assetsap_dashboardfTrail1.prototype.parent.constructor.call(this, owner,options);        
            this.className = "app_assetsap_dashboardfTrail1";			
            this.setCaption("Dashboard");
			this.setColor("");
			this.callObj = callObj;
			this.maximize();			
			this.onClose.set(this,"doClose");						
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			this.tab = new panel(this,{bound:[50,30,this.width - 100, this.height - 50], caption:""});				
			this.grid = new saiGrid(this.tab,{bound:[1,20,this.tab.width - 2,this.tab.height - 50],colCount:12,readOnly:true,dblClick:[this,"doGridDoubleClick"],
				colTitle:["No Asset","No SN","Deskripsi Asset","Deskripsi Alamat","Kelompok","Area","APC","Cap Date","Nilai Perolehan","Akumulasi Penyusutan","Nilai Buku","Quantity SAP"],
				colWidth:[[11,10,9,8,7,6,5,4,3,2,1,0],[100,100,100,100,100,100,100,100,250,250,60,120]], colFormat:[[8,9,10,11],[cfNilai,cfNilai, cfNilai, cfNilai]],rowSelect:true});            
			this.sgn = new sgNavigator(this.tab,{bound:[1,this.tab.height - 25,this.tab.width - 2,25],buttonStyle:1,grid:this.grid,pager:[this,"doPager"]});
			this.rowPerPage = 20;
			this.bClose = new imageButton(this.tab,{bound:[this.tab.width - 60,1,45,16],image:"icon/dynpro/pnlclose.png",click:[this,"doClick"]});			
		}catch(e){
			this.app.alert(e,"");
		}
    }
};
window.app_assetsap_dashboardfTrail1.extend(window.childForm);
window.app_assetsap_dashboardfTrail1.implement({    
	doClose: function(sender){        	
		if (this.trail2 !== undefined) this.trail2.close();
    },	
	doClick: function(sender){
		this.hide();
		this.callObj.unblock();
	},
	doPager: function(sender,page){
		this.dbLib.getDataProviderPageA(this.sql,page,this.rowPerPage);
		this.page = page;
	},
	setSQL: function(sql,sqlCount){
		this.sql = sql;				
		this.sgn.setTotalPage(this.dbLib.getRowCount(sqlCount, this.rowPerPage));
		this.sgn.rearrange();
		this.sgn.activePage = 0;	
		this.sgn.setButtonStyle(4);			
		this.dbLib.getDataProviderPageA(this.sql,1,this.rowPerPage);		
		this.page = 1;
	},	
	setPanelCaption: function(data){
		this.tab.setCaption(data);
	},
	doRequestReady: function(sender, methodName, result){
		try{			
			if (sender == this.dbLib && methodName == "getDataProviderPage"){
				result = JSON.parse(result);
				if (typeof result != "string"){
					var line;
					this.grid.clear();
					for (var i in result.rs.rows){
						line = result.rs.rows[i];						
						this.grid.appendData([line.no_fa, line.no_sn,line.nama,line.alamat,line.kode_klpfa, line.kode_lokfa, line.kode_klpakun, line.tgl_perolehan, floatToNilai(line.nilai), floatToNilai(line.nilai_ap), floatToNilai(line.nilai_buku),  line.jml_fisik]);
					}
					this.grid.setNoUrut((this.page - 1) * this.rowPerPage);
				}else system.alert(result);
			}
		}catch(e){
			alert(result);
		}
	},
	doGridDoubleClick: function(sender, col, row){
		if (this.trail2 === undefined){
			this.trail2 = new app_assetsap_dashboardfTrail2(this.owner,undefined, this);			
		}
		this.block(true);
		this.trail2.setValue(this.grid.cells(0,row) +this.grid.cells(1,row));
		this.trail2.setPanelCaption("Detail Asset "+ this.grid.cells(0,row)+" "+this.grid.cells(2,row));
		this.trail2.show();
	}
});

window.app_assetsap_dashboardfTrail2 = function(owner,options, callObj)
{
    if (owner)
    {
		try{
	        window.app_assetsap_dashboardfTrail2.prototype.parent.constructor.call(this, owner,options);        
            this.className = "app_assetsap_dashboardfTrail2";
            this.setCaption("Dashboard");
			this.callObj = callObj;
			this.setColor("");
			this.maximize();
			this.onClose.set(this,"doClose");						
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			this.tab = new panel(this,{bound:[this.width / 2 - 300 ,30,600, this.height - 50], caption:""});
			this.ed_fa = new saiLabelEdit(this.tab,{bound:[20,1,200,20],caption:"No Asset",readOnly:true});
			this.ed_sn = new saiLabelEdit(this.tab,{bound:[20,3,200,20],caption:"No SN",readOnly:true});
			this.ed_nama = new saiLabelEdit(this.tab,{bound:[20,2,500,20],caption:"Deskripsi Asset",readOnly:true});
			this.ed_group = new saiLabelEdit(this.tab,{bound:[20,3,500,20],caption:"Kelompok",readOnly:true});
			this.ed_area = new saiLabelEdit(this.tab,{bound:[20,4,500,20],caption:"Area",readOnly:true});
			this.ed_jenis = new saiLabelEdit(this.tab,{bound:[20,6,500,20],caption:"APC",readOnly:true});
			this.ed_date = new saiLabelEdit(this.tab,{bound:[20,5,200,20],caption:"Cap. Date",readOnly:true});
			this.ed_nilai = new saiLabelEdit(this.tab,{bound:[20,6,200,20],caption:"Nilai Perolehan",readOnly:true,tipeText:ttNilai});
			this.ed_ap = new saiLabelEdit(this.tab,{bound:[20,7,200,20],caption:"Akumulasi Penyusutan",readOnly:true,tipeText:ttNilai});
			this.ed_buku = new saiLabelEdit(this.tab,{bound:[20,8,200,20],caption:"Nilai Buku",readOnly:true,tipeText:ttNilai});			
			this.ed_alamat = new saiLabelEdit(this.tab,{bound:[20,9,500,20],caption:"Alamat",readOnly:true});			
			this.ed_jml = new saiLabelEdit(this.tab,{bound:[20,6,200,20],caption:"Quantity SAP",readOnly:true});			
				
			this.tab.rearrangeChild(30,23);
			this.bClose = new imageButton(this.tab,{bound:[this.tab.width - 60,1,45,16],image:"icon/dynpro/pnlclose.png",click:[this,"doClick"]});			
		}catch(e){
			this.app.alert(e,"");
		}
    }
};
window.app_assetsap_dashboardfTrail2.extend(window.childForm);
window.app_assetsap_dashboardfTrail2.implement({    
	doClick: function(sender){
		this.hide();
		this.callObj.unblock();
	},
	setValue: function(value){
		try {			
			var data = this.dbLib.getDataProvider("select a.no_fa, a.no_sn, a.nama, a.kode_klpfa, a.kode_lokfa, a.kode_klpakun, a.tgl_perolehan, a.nilai, a.nilai_ap, a.nilai_buku, a.nama2 as alamat, a.jml_fisik" +
			" from amu_asset a inner join amu_klp b on b.kode_klpfa = a.kode_klpfa and b.kode_lokasi = a.kode_lokasi" +
			"	inner join amu_lokasi c on c.kode_lokfa = a.kode_lokfa and c.kode_lokasi = a.kode_lokasi " +						
			" where a.no_gabung = '" +value +"' ", true);
			if (typeof data != "string") {
				value = data.rs.rows[0];
				if (value !== undefined) {
					this.ed_fa.setText(value.no_fa);
					this.ed_sn.setText(value.no_sn);
					this.ed_nama.setText(value.nama);
					this.ed_group.setText(value.kode_klpfa);
					this.ed_area.setText(value.kode_lokfa);
					this.ed_jenis.setText(value.kode_klpakun);
					this.ed_date.setText(value.tgl_perolehan);
					this.ed_nilai.setText(floatToNilai(parseFloat(value.nilai)));
					this.ed_ap.setText(floatToNilai(parseFloat(value.nilai_ap)));
					this.ed_buku.setText(floatToNilai(value.nilai_buku));
					this.ed_alamat.setText(value.alamat);
					this.ed_jml.setText(value.jml_fisik);					
				}else{
					this.ed_fa.clear();
					this.ed_sn.clear();
					this.ed_nama.clear();
					this.ed_group.clear();
					this.ed_area.clear();
					this.ed_jenis.clear();
					this.ed_date.clear();
					this.ed_nilai.clear();
					this.ed_ap.clear();
					this.ed_buku.clear();
					this.ed_alamat.clear();
					this.ed_jml.clear();					
				}
			}else{
				this.ed_fa.clear();
				this.ed_sn.clear();
				this.ed_nama.clear();
				this.ed_group.clear();
				this.ed_area.clear();
				this.ed_jenis.clear();
				this.ed_date.clear();
				this.ed_nilai.clear();
				this.ed_ap.clear();
				this.ed_buku.clear();
				this.ed_alamat.clear();
				this.ed_jml.clear();				
			}
		}catch(e){
			alert(e);
		}
	},
	setPanelCaption: function(data){
		this.tab.setCaption(data);
	}
	
});
/*						
						*/
